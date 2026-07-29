import type { InputHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils/cn';

export const formControlClass =
  'h-12 w-full rounded-lg border border-neutral-300 bg-white px-3.5 font-sans text-sm text-neutral-950 outline-none transition placeholder:text-neutral-400 hover:border-neutral-400 focus:border-purple-600 focus:ring-4 focus:ring-purple-600/10 disabled:cursor-not-allowed disabled:bg-neutral-100 disabled:text-neutral-500';

export const formTextareaClass = cn(
  formControlClass,
  'h-auto min-h-32 resize-y py-3.5 leading-relaxed'
);

export const darkFormControlClass =
  'h-12 w-full rounded-lg border border-white/10 bg-white/[0.04] px-3.5 font-sans text-sm text-white outline-none transition placeholder:text-neutral-500 hover:border-white/20 focus:border-purple-400 focus:bg-white/[0.06] focus:ring-4 focus:ring-purple-500/10 disabled:cursor-not-allowed disabled:opacity-50';

export function controlClass(error?: unknown, className?: string) {
  return cn(formControlClass, Boolean(error) && 'border-red-400 bg-red-50/30', className);
}

export function textareaClass(error?: unknown, className?: string) {
  return cn(formTextareaClass, Boolean(error) && 'border-red-400 bg-red-50/30', className);
}

export function FormField({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={className}>{children}</div>;
}

export function FormGrid({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn('grid grid-cols-1 gap-5 sm:grid-cols-2', className)}>{children}</div>;
}

export function FormLabel({
  children,
  optional,
  htmlFor,
}: {
  children: ReactNode;
  optional?: boolean;
  htmlFor?: string;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="mb-2 flex items-center justify-between font-sans text-xs font-medium tracking-[0.02em] text-neutral-600"
    >
      <span>{children}</span>
      {optional && <span className="font-normal text-neutral-400">Optional</span>}
    </label>
  );
}

export function FormHint({ children }: { children: ReactNode }) {
  return <p className="mt-2 font-sans text-xs leading-5 text-neutral-500">{children}</p>;
}

export function FormError({ message }: { message?: string }) {
  return message ? (
    <p role="alert" className="mt-2 font-sans text-xs leading-5 text-red-600">
      {message}
    </p>
  ) : null;
}

export function FormCheckbox({
  id,
  children,
  error,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & { children: ReactNode; error?: string }) {
  return (
    <FormField>
      <label
        htmlFor={id}
        className={cn(
          'flex cursor-pointer gap-3 rounded-lg border p-4 transition',
          error
            ? 'border-red-300 bg-red-50/40'
            : 'border-neutral-200 bg-neutral-50 hover:border-neutral-300'
        )}
      >
        <input
          id={id}
          type="checkbox"
          className="mt-0.5 h-4 w-4 shrink-0 accent-purple-600"
          {...props}
        />
        <span className="font-sans text-sm leading-6 text-neutral-600">{children}</span>
      </label>
      <FormError message={error} />
    </FormField>
  );
}
