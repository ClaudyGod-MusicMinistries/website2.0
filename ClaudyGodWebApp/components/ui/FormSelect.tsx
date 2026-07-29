'use client';

import { useEffect, useRef, useState } from 'react';
import { Check, ChevronDown, X } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

interface FormSelectProps {
  value?: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  options: string[];
  placeholder: string;
  title: string;
  error?: string;
}

export function FormSelect({
  value,
  onChange,
  onBlur,
  options,
  placeholder,
  title,
  error,
}: FormSelectProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const close = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', close);
    document.body.style.overflow = window.innerWidth < 640 ? 'hidden' : '';
    return () => {
      document.removeEventListener('mousedown', close);
      document.body.style.overflow = '';
    };
  }, [open]);

  const select = (option: string) => {
    onChange(option);
    onBlur?.();
    setOpen(false);
  };

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
        className={cn(
          'flex h-12 w-full items-center rounded-lg border bg-white px-3.5 text-left text-sm transition',
          'hover:border-neutral-400 focus:border-purple-600 focus:outline-none focus:ring-4 focus:ring-purple-600/10',
          error ? 'border-red-400' : 'border-neutral-300'
        )}
      >
        <span
          className={cn(
            'min-w-0 flex-1 truncate',
            value ? 'font-medium text-neutral-900' : 'text-neutral-400'
          )}
        >
          {value || placeholder}
        </span>
        <span className="ml-3 flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-neutral-50 text-neutral-500">
          <ChevronDown className={cn('h-4 w-4 transition-transform', open && 'rotate-180')} />
        </span>
      </button>

      {open && (
        <div className="fixed inset-0 z-modal flex items-end bg-neutral-950/40 backdrop-blur-[2px] sm:absolute sm:inset-auto sm:left-0 sm:right-0 sm:top-[calc(100%+0.5rem)] sm:z-popover sm:block sm:bg-transparent sm:backdrop-blur-none">
          <div className="w-full overflow-hidden rounded-t-2xl border border-neutral-200 bg-white shadow-card-light-lg sm:rounded-xl">
            <div className="flex items-center justify-between border-b border-neutral-100 px-5 py-4 sm:hidden">
              <p className="text-sm font-semibold text-neutral-900">{title}</p>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-full bg-neutral-100 p-2"
                aria-label="Close options"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <ul
              role="listbox"
              aria-label={title}
              className="max-h-[60dvh] overflow-y-auto p-2 sm:max-h-72"
            >
              {options.map((option) => (
                <li key={option} role="option" aria-selected={option === value}>
                  <button
                    type="button"
                    onClick={() => select(option)}
                    className={cn(
                      'flex w-full items-center rounded-lg px-3 py-3 text-left text-sm transition hover:bg-purple-50',
                      option === value && 'bg-purple-50 font-semibold text-purple-800'
                    )}
                  >
                    <span className="flex-1">{option}</span>
                    {option === value && <Check className="h-4 w-4 text-purple-600" />}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
      {error && (
        <p role="alert" className="mt-2 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}
