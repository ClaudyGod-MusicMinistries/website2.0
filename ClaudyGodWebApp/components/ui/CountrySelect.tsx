'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { Check, ChevronDown, Search, X } from 'lucide-react';
import { useCountries } from '@/hooks/useCountries';
import { flagEmoji } from '@/lib/data/countries';
import { cn } from '@/lib/utils/cn';

interface CountrySelectProps {
  value?: string;
  onChange: (code: string) => void;
  onBlur?: () => void;
  error?: string;
}

export function CountrySelect({ value, onChange, onBlur, error }: CountrySelectProps) {
  const { countries, isLoading } = useCountries();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const rootRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const selected = countries.find((country) => country.code === value);
  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return countries;
    return countries.filter(
      ({ name, code, dialCode }) =>
        name.toLowerCase().includes(normalized) ||
        code.toLowerCase().includes(normalized) ||
        dialCode.includes(normalized)
    );
  }, [countries, query]);

  useEffect(() => {
    if (!open) return;
    searchRef.current?.focus();
    const close = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, [open]);

  useEffect(() => {
    document.body.style.overflow = open && window.innerWidth < 640 ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const choose = (code: string) => {
    onChange(code);
    onBlur?.();
    setOpen(false);
    setQuery('');
  };

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen(true)}
        className={cn(
          'flex h-14 w-full items-center gap-3 rounded-lg border bg-white px-4 text-left text-sm transition',
          'hover:border-neutral-400 focus:border-purple-600 focus:outline-none focus:ring-4 focus:ring-purple-600/10',
          error ? 'border-red-400' : 'border-neutral-300'
        )}
      >
        {selected ? (
          <>
            <span className="text-xl" aria-hidden>
              {flagEmoji(selected.code)}
            </span>
            <span className="flex-1 font-medium text-neutral-900">{selected.name}</span>
            <span className="hidden text-xs text-neutral-400 xs:block">{selected.code}</span>
          </>
        ) : (
          <span className="flex-1 text-neutral-400">Select event country</span>
        )}
        <ChevronDown className="h-4 w-4 text-neutral-400" />
      </button>

      {open && (
        <div className="fixed inset-0 z-modal flex items-end bg-neutral-950/45 backdrop-blur-[2px] sm:absolute sm:inset-auto sm:left-0 sm:right-0 sm:top-[calc(100%+0.5rem)] sm:z-popover sm:block sm:bg-transparent sm:backdrop-blur-none">
          <div className="flex max-h-[82dvh] w-full flex-col overflow-hidden rounded-t-2xl border border-neutral-200 bg-white shadow-card-light-lg sm:max-h-none sm:rounded-xl">
            <div className="flex items-center justify-between border-b border-neutral-100 px-5 py-4 sm:hidden">
              <div>
                <p className="font-display text-lg font-semibold text-neutral-950">
                  Choose a country
                </p>
                <p className="mt-0.5 text-xs text-neutral-500">
                  Search the complete international list
                </p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-full bg-neutral-100 p-2"
                aria-label="Close country picker"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="p-3">
              <div className="flex h-11 items-center gap-2 rounded-lg border border-neutral-200 bg-neutral-50 px-3 focus-within:border-purple-500 focus-within:bg-white">
                <Search className="h-4 w-4 text-neutral-400" />
                <input
                  ref={searchRef}
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search country or calling code"
                  className="min-w-0 flex-1 bg-transparent text-sm outline-none"
                />
              </div>
            </div>
            <ul
              role="listbox"
              className="max-h-[58dvh] overflow-y-auto overscroll-contain px-2 pb-3 sm:max-h-72"
            >
              {isLoading && countries.length === 0 && (
                <li className="p-6 text-center text-sm text-neutral-500">Loading countries…</li>
              )}
              {filtered.map((country) => (
                <li key={country.code} role="option" aria-selected={country.code === value}>
                  <button
                    type="button"
                    onClick={() => choose(country.code)}
                    className={cn(
                      'flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left hover:bg-purple-50',
                      country.code === value && 'bg-purple-50'
                    )}
                  >
                    <span className="text-xl" aria-hidden>
                      {flagEmoji(country.code)}
                    </span>
                    <span className="flex-1 text-sm font-medium text-neutral-800">
                      {country.name}
                    </span>
                    <span className="text-xs text-neutral-400">{country.dialCode}</span>
                    {country.code === value && <Check className="h-4 w-4 text-purple-600" />}
                  </button>
                </li>
              ))}
              {!filtered.length && (
                <li className="p-8 text-center text-sm text-neutral-500">
                  No country matches “{query}”.
                </li>
              )}
            </ul>
          </div>
        </div>
      )}
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  );
}
