import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils/cn';

const spinnerVariants = cva(
  'inline-block animate-spin rounded-full border-2 border-current border-t-transparent',
  {
    variants: {
      size: {
        xs:  'h-3  w-3',
        sm:  'h-4  w-4',
        md:  'h-6  w-6',
        lg:  'h-8  w-8',
        xl:  'h-10 w-10',
        '2xl':'h-14 w-14',
      },
      color: {
        gold:    'text-gold-500',
        white:   'text-white',
        muted:   'text-neutral-400',
        current: 'text-current',
      },
    },
    defaultVariants: { size: 'md', color: 'gold' },
  }
);

interface SpinnerProps extends VariantProps<typeof spinnerVariants> {
  className?: string;
  label?: string;
}

export function Spinner({ size, color, className, label = 'Loading…' }: SpinnerProps) {
  return (
    <span role="status" aria-label={label} className="inline-flex">
      <span className={cn(spinnerVariants({ size, color }), className)} />
      <span className="sr-only">{label}</span>
    </span>
  );
}

// ─── Full-page loading overlay ────────────────────────────────────────────

export function PageLoader({ label = 'Loading…' }: { label?: string }) {
  return (
    <div className="fixed inset-0 z-modal flex items-center justify-center bg-surface-base/80 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-4">
        <Spinner size="2xl" />
        <p className="text-sm text-neutral-400 font-worksans">{label}</p>
      </div>
    </div>
  );
}
