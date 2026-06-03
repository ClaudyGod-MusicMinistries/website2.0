'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { ChevronDown, Search } from 'lucide-react';
import { cn } from '@/utils/cn';

/* ── Country data ─────────────────────────────────────────── */
export interface DialCountry {
  code: string;  // ISO 3166-1 alpha-2
  name: string;
  dial: string;  // e.g. "+234"
}

// Nigeria first (primary market), then alphabetical
export const DIAL_COUNTRIES: DialCountry[] = [
  { code: 'NG', name: 'Nigeria',               dial: '+234' },
  { code: 'US', name: 'United States',         dial: '+1'   },
  { code: 'GB', name: 'United Kingdom',        dial: '+44'  },
  { code: 'CA', name: 'Canada',                dial: '+1'   },
  { code: 'AU', name: 'Australia',             dial: '+61'  },
  { code: 'ZA', name: 'South Africa',          dial: '+27'  },
  { code: 'AE', name: 'United Arab Emirates',  dial: '+971' },
  { code: 'BJ', name: 'Benin',                 dial: '+229' },
  { code: 'BR', name: 'Brazil',                dial: '+55'  },
  { code: 'CM', name: 'Cameroon',              dial: '+237' },
  { code: 'CN', name: 'China',                 dial: '+86'  },
  { code: 'CI', name: "Côte d'Ivoire",         dial: '+225' },
  { code: 'DE', name: 'Germany',               dial: '+49'  },
  { code: 'DK', name: 'Denmark',               dial: '+45'  },
  { code: 'EG', name: 'Egypt',                 dial: '+20'  },
  { code: 'ES', name: 'Spain',                 dial: '+34'  },
  { code: 'ET', name: 'Ethiopia',              dial: '+251' },
  { code: 'FR', name: 'France',                dial: '+33'  },
  { code: 'GH', name: 'Ghana',                 dial: '+233' },
  { code: 'IE', name: 'Ireland',               dial: '+353' },
  { code: 'IN', name: 'India',                 dial: '+91'  },
  { code: 'IT', name: 'Italy',                 dial: '+39'  },
  { code: 'JP', name: 'Japan',                 dial: '+81'  },
  { code: 'KE', name: 'Kenya',                 dial: '+254' },
  { code: 'LR', name: 'Liberia',               dial: '+231' },
  { code: 'MX', name: 'Mexico',                dial: '+52'  },
  { code: 'NL', name: 'Netherlands',           dial: '+31'  },
  { code: 'NO', name: 'Norway',                dial: '+47'  },
  { code: 'NZ', name: 'New Zealand',           dial: '+64'  },
  { code: 'RW', name: 'Rwanda',                dial: '+250' },
  { code: 'SA', name: 'Saudi Arabia',          dial: '+966' },
  { code: 'SE', name: 'Sweden',                dial: '+46'  },
  { code: 'SG', name: 'Singapore',             dial: '+65'  },
  { code: 'SL', name: 'Sierra Leone',          dial: '+232' },
  { code: 'SN', name: 'Senegal',               dial: '+221' },
  { code: 'TZ', name: 'Tanzania',              dial: '+255' },
  { code: 'UG', name: 'Uganda',                dial: '+256' },
  { code: 'ZM', name: 'Zambia',                dial: '+260' },
  { code: 'ZW', name: 'Zimbabwe',              dial: '+263' },
];

/* Converts ISO code → emoji flag (Regional Indicator Symbol trick) */
function emojiFlag(iso: string): string {
  return iso
    .toUpperCase()
    .replace(/./g, (c) => String.fromCodePoint(c.charCodeAt(0) + 127397));
}

/* ── Component ─────────────────────────────────────────────── */
export interface PhoneInputProps {
  value:        string;
  onChange:     (value: string) => void;
  onBlur?:      () => void;
  error?:       string;
  placeholder?: string;
  required?:    boolean;
  inputClass?:  string;
}

export function PhoneInput({
  value,
  onChange,
  onBlur,
  error,
  placeholder = '800 000 0000',
  inputClass,
}: PhoneInputProps) {
  const [country,  setCountry]  = useState<DialCountry>(DIAL_COUNTRIES[0]);
  const [local,    setLocal]    = useState('');
  const [open,     setOpen]     = useState(false);
  const [search,   setSearch]   = useState('');

  const wrapRef   = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const inputRef  = useRef<HTMLInputElement>(null);

  /* Emit combined E.164-ish value upward */
  useEffect(() => {
    const digits = local.replace(/[^\d]/g, '');
    onChange(digits ? `${country.dial}${digits}` : '');
  // onChange ref is stable from Controller — safe to omit from deps
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [country, local]);

  /* Close on outside click */
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
        setSearch('');
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  /* Auto-focus search when dropdown opens */
  useEffect(() => {
    if (open) {
      const t = setTimeout(() => searchRef.current?.focus(), 40);
      return () => clearTimeout(t);
    }
  }, [open]);

  const pick = useCallback((c: DialCountry) => {
    setCountry(c);
    setOpen(false);
    setSearch('');
    setTimeout(() => inputRef.current?.focus(), 40);
  }, []);

  const filtered = DIAL_COUNTRIES.filter(({ name, dial, code }) => {
    const q = search.toLowerCase();
    return name.toLowerCase().includes(q) || dial.includes(q) || code.toLowerCase() === q;
  });

  return (
    <div ref={wrapRef} className="relative">

      {/* ── Input row ── */}
      <div className={cn(
        'flex h-12 border rounded-xl overflow-hidden transition-all duration-200',
        'bg-neutral-50 focus-within:bg-white',
        'focus-within:border-purple-500 focus-within:ring-2 focus-within:ring-purple-500/10',
        error ? 'border-red-300' : 'border-neutral-200',
        inputClass,
      )}>

        {/* Country trigger */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-haspopup="listbox"
          aria-label={`Country code: ${country.name} ${country.dial}`}
          className="flex items-center gap-1.5 pl-3 pr-2 border-r border-neutral-200 hover:bg-neutral-100 transition-colors focus:outline-none shrink-0"
        >
          <span className="text-xl leading-none select-none" aria-hidden>
            {emojiFlag(country.code)}
          </span>
          <span className="font-mono text-sm text-neutral-600 min-w-[2.6rem] text-left">
            {country.dial}
          </span>
          <ChevronDown
            className={cn(
              'h-3.5 w-3.5 text-neutral-400 transition-transform duration-200',
              open && 'rotate-180',
            )}
          />
        </button>

        {/* Local number */}
        <input
          ref={inputRef}
          type="tel"
          inputMode="tel"
          autoComplete="tel-national"
          value={local}
          onChange={(e) => setLocal(e.target.value)}
          onBlur={onBlur}
          placeholder={placeholder}
          className="flex-1 min-w-0 px-3 bg-transparent font-raleway text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none"
        />
      </div>

      {/* ── Dropdown ── */}
      {open && (
        <div
          role="dialog"
          aria-label="Select country code"
          className="absolute top-[calc(100%+6px)] left-0 z-[200] w-72 bg-white border border-neutral-200 rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.14)] overflow-hidden"
        >
          {/* Search bar */}
          <div className="p-2.5 border-b border-neutral-100">
            <div className="flex items-center gap-2 px-3 h-9 bg-neutral-50 border border-neutral-200 rounded-xl focus-within:border-purple-400 focus-within:bg-white transition-colors">
              <Search className="h-3.5 w-3.5 text-neutral-400 shrink-0" />
              <input
                ref={searchRef}
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Escape') { setOpen(false); setSearch(''); } }}
                placeholder="Search country or code…"
                className="flex-1 min-w-0 bg-transparent font-raleway text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none"
              />
            </div>
          </div>

          {/* Country list */}
          <ul
            role="listbox"
            aria-label="Countries"
            className="max-h-64 overflow-y-auto py-1 overscroll-contain"
          >
            {filtered.length === 0 ? (
              <li className="px-4 py-4 text-sm text-neutral-400 font-raleway text-center">
                No match for &ldquo;{search}&rdquo;
              </li>
            ) : (
              filtered.map((c) => {
                const selected = country.code === c.code && country.dial === c.dial;
                return (
                  <li
                    key={`${c.code}-${c.dial}`}
                    role="option"
                    aria-selected={selected}
                  >
                    <button
                      type="button"
                      onClick={() => pick(c)}
                      className={cn(
                        'w-full flex items-center gap-3 px-3 py-2.5 text-left transition-colors hover:bg-purple-50',
                        selected && 'bg-purple-50',
                      )}
                    >
                      <span className="text-xl leading-none select-none shrink-0" aria-hidden>
                        {emojiFlag(c.code)}
                      </span>
                      <span className="flex-1 min-w-0 font-raleway text-sm text-neutral-800 truncate">
                        {c.name}
                      </span>
                      <span className="font-mono text-xs text-neutral-400 shrink-0">
                        {c.dial}
                      </span>
                      {selected && (
                        <span className="w-1.5 h-1.5 rounded-full bg-purple-600 shrink-0" />
                      )}
                    </button>
                  </li>
                );
              })
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
