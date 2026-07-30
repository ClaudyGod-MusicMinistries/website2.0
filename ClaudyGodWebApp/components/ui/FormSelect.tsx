'use client';

import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { FormError } from '@/components/ui/FormField';

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
  return (
    <div>
      <div className="relative">
        <select
          value={value ?? ''}
          onChange={(event) => onChange(event.target.value)}
          onBlur={onBlur}
          aria-label={title}
          aria-invalid={Boolean(error)}
          className={cn(
            'h-12 w-full appearance-none rounded-lg border bg-white px-3.5 pr-12 text-sm outline-none transition',
            'hover:border-neutral-400 focus:border-purple-600 focus:ring-4 focus:ring-purple-600/10',
            value ? 'font-medium text-neutral-900' : 'text-neutral-400',
            error ? 'border-red-300 bg-red-50/20' : 'border-neutral-300'
          )}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((option) => (
            <option key={option} value={option} className="text-neutral-900">
              {option}
            </option>
          ))}
        </select>
        <span className="pointer-events-none absolute right-2.5 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-md bg-neutral-50 text-neutral-500">
          <ChevronDown className="h-4 w-4" />
        </span>
      </div>
      <FormError message={error} />
    </div>
  );
}
