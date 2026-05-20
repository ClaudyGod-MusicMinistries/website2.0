import { cn } from '@/utils/cn';
import type { HTMLAttributes } from 'react';

interface DividerProps extends HTMLAttributes<HTMLDivElement> {
  orientation?: 'horizontal' | 'vertical';
  variant?: 'default' | 'gold' | 'muted';
  label?: string;
}

export function Divider({
  orientation = 'horizontal',
  variant = 'default',
  label,
  className,
  ...props
}: DividerProps) {
  const colorClass = {
    default: 'border-surface-border',
    gold:    'border-gold-500/40',
    muted:   'border-surface-divider',
  }[variant];

  if (label) {
    return (
      <div className={cn('flex items-center gap-4', className)} role="separator" {...props}>
        <span className={cn('flex-1 border-t', colorClass)} />
        <span className="text-xs font-worksans text-neutral-500 tracking-wider uppercase">
          {label}
        </span>
        <span className={cn('flex-1 border-t', colorClass)} />
      </div>
    );
  }

  if (orientation === 'vertical') {
    return (
      <div
        role="separator"
        aria-orientation="vertical"
        className={cn('inline-block h-full w-px border-l', colorClass, className)}
        {...props}
      />
    );
  }

  return (
    <div
      role="separator"
      className={cn('w-full border-t', colorClass, className)}
      {...props}
    />
  );
}

// Gold accent bar — decorative underline for section headings
export function GoldBar({ className }: { className?: string }) {
  return (
    <div className={cn('h-px w-16 bg-gradient-gold rounded-full', className)} />
  );
}
