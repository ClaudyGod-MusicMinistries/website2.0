'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { Check, ChevronDown, Loader2, Search, X } from 'lucide-react';
import { useRegions } from '@/hooks/useRegions';
import { cn } from '@/lib/utils/cn';
import { controlClass, FormError, FormHint } from '@/components/ui/FormField';

interface RegionSelectProps {
  countryName?: string;
  value?: string;
  onChange: (name: string) => void;
  onBlur?: () => void;
  error?: string;
}

export function RegionSelect({ countryName, value, onChange, onBlur, error }: RegionSelectProps) {
  const { regions, isLoading, isUnavailable } = useRegions(countryName);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const rootRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const previousCountry = useRef(countryName);
  const filtered = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase();
    if (!normalized) return regions;
    return regions.filter(
      ({ name, code }) =>
        name.toLocaleLowerCase().includes(normalized) ||
        code.toLocaleLowerCase().includes(normalized)
    );
  }, [query, regions]);

  useEffect(() => {
    if (previousCountry.current && previousCountry.current !== countryName) onChange('');
    previousCountry.current = countryName;
  }, [countryName, onChange]);

  useEffect(() => {
    if (!open) return;
    searchRef.current?.focus();
    const close = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, [open]);

  const choose = (name: string) => {
    onChange(name);
    onBlur?.();
    setOpen(false);
    setQuery('');
  };

  if (!countryName) {
    return (
      <div>
        <button
          type="button"
          disabled
          className="flex h-12 w-full items-center rounded-lg border border-neutral-200 bg-neutral-100 px-3.5 text-left text-sm text-neutral-400"
        >
          Select a country first
        </button>
        <FormError message={error} />
      </div>
    );
  }

  if (isUnavailable && !isLoading) {
    return (
      <div>
        <input
          value={value ?? ''}
          onChange={(event) => onChange(event.target.value)}
          onBlur={onBlur}
          autoComplete="address-level1"
          className={controlClass(error)}
          placeholder="Enter state, province or region"
        />
        <FormHint>Enter the region manually for this country.</FormHint>
        <FormError message={error} />
      </div>
    );
  }

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        disabled={isLoading}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen(true)}
        className={cn(
          'flex h-12 w-full items-center gap-3 rounded-lg border bg-white px-3.5 text-left text-sm transition',
          'hover:border-neutral-400 focus:border-purple-600 focus:outline-none focus:ring-4 focus:ring-purple-600/10',
          error ? 'border-red-300 bg-red-50/20' : 'border-neutral-300',
          isLoading && 'cursor-wait bg-neutral-50 text-neutral-400'
        )}
      >
        {isLoading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" /> Loading regions…
          </>
        ) : (
          <>
            <span className={cn('flex-1', value ? 'text-neutral-900' : 'text-neutral-400')}>
              {value || 'Select state, province or region'}
            </span>
            <ChevronDown className="h-4 w-4 text-neutral-400" />
          </>
        )}
      </button>

      {open && !isLoading && (
        <div className="fixed inset-0 z-modal flex items-end bg-neutral-950/45 backdrop-blur-[2px] sm:absolute sm:inset-auto sm:left-0 sm:right-0 sm:top-[calc(100%+0.5rem)] sm:z-popover sm:block sm:bg-transparent sm:backdrop-blur-none">
          <div className="flex max-h-[82dvh] w-full flex-col overflow-hidden rounded-t-2xl border border-neutral-200 bg-white shadow-card-light-lg sm:max-h-none sm:rounded-xl">
            <div className="flex items-center justify-between border-b border-neutral-100 px-5 py-4 sm:hidden">
              <div>
                <p className="text-sm font-semibold text-neutral-950">Choose a region</p>
                <p className="mt-0.5 text-xs text-neutral-500">{countryName}</p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-full bg-neutral-100 p-2"
                aria-label="Close region picker"
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
                  placeholder="Search state, province or region"
                  className="min-w-0 flex-1 bg-transparent text-sm text-neutral-900 outline-none"
                />
              </div>
            </div>
            <ul role="listbox" className="max-h-[58dvh] overflow-y-auto px-2 pb-3 sm:max-h-72">
              {filtered.map((region) => (
                <li key={region.code} role="option" aria-selected={region.name === value}>
                  <button
                    type="button"
                    onClick={() => choose(region.name)}
                    className={cn(
                      'flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left hover:bg-purple-50',
                      region.name === value && 'bg-purple-50'
                    )}
                  >
                    <span className="flex-1 text-sm font-medium text-neutral-800">
                      {region.name}
                    </span>
                    {region.name === value && <Check className="h-4 w-4 text-purple-600" />}
                  </button>
                </li>
              ))}
              {!filtered.length && (
                <li className="p-8 text-center text-sm text-neutral-500">
                  No region matches “{query}”.
                </li>
              )}
            </ul>
          </div>
        </div>
      )}
      <FormError message={error} />
    </div>
  );
}
