import { cva, type VariantProps } from 'class-variance-authority';
import { type HTMLAttributes } from 'react';
import { cn } from '@/utils/cn';

const badgeVariants = cva(
  'inline-flex items-center gap-1.5 font-worksans font-medium rounded-full border',
  {
    variants: {
      variant: {
        gold:    'bg-gold-500/15 text-gold-400 border-gold-500/30',
        white:   'bg-white/10 text-white border-white/20',
        success: 'bg-status-successBg text-status-success border-status-success/30',
        warning: 'bg-status-warningBg text-status-warning border-status-warning/30',
        error:   'bg-status-errorBg text-status-error border-status-error/30',
        info:    'bg-status-infoBg text-status-info border-status-info/30',
        muted:   'bg-surface-overlay text-neutral-400 border-surface-border',
        outline: 'bg-transparent text-neutral-300 border-surface-border',
      },
      size: {
        sm:   'px-2   py-0.5 text-2xs',
        base: 'px-2.5 py-1   text-xs',
        lg:   'px-3   py-1   text-sm',
      },
      dot: {
        true: '',
      },
    },
    defaultVariants: { variant: 'gold', size: 'base' },
  }
);

interface BadgeProps
  extends HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ variant, size, dot, className, children, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant, size }), className)} {...props}>
      {dot && (
        <span className="inline-block h-1.5 w-1.5 rounded-full bg-current" />
      )}
      {children}
    </span>
  );
}
