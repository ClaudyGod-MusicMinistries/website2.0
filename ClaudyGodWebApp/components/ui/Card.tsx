import { cva, type VariantProps } from 'class-variance-authority';
import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '@/utils/cn';

const cardVariants = cva(
  'relative overflow-hidden transition-all duration-300',
  {
    variants: {
      variant: {
        default: [
          'bg-surface-elevated border border-surface-border rounded-xl',
          'shadow-card',
        ],
        elevated: [
          'bg-surface-overlay border border-surface-border rounded-xl',
          'shadow-card-hover',
        ],
        glass: [
          'glass rounded-xl',
        ],
        outline: [
          'bg-transparent border border-surface-border rounded-xl',
        ],
        gold: [
          'bg-surface-elevated border border-gold-500/30 rounded-xl',
          'shadow-gold',
        ],
        flat: [
          'bg-surface-elevated rounded-xl border-0',
        ],
      },
      interactive: {
        true: [
          'cursor-pointer',
          'hover:border-gold-500/50 hover:shadow-gold hover:-translate-y-1',
        ],
      },
      padding: {
        none: '',
        sm:   'p-4',
        md:   'p-6',
        lg:   'p-8',
        xl:   'p-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      padding: 'md',
    },
  }
);

interface CardProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ variant, interactive, padding, className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(cardVariants({ variant, interactive, padding }), className)}
      {...props}
    >
      {children}
    </div>
  )
);
Card.displayName = 'Card';

// ─── Card sub-components ──────────────────────────────────────────────────

export function CardHeader({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('flex flex-col gap-1.5 pb-4 border-b border-surface-border', className)} {...props}>
      {children}
    </div>
  );
}

export function CardBody({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('py-4', className)} {...props}>
      {children}
    </div>
  );
}

export function CardFooter({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('flex items-center pt-4 border-t border-surface-border', className)} {...props}>
      {children}
    </div>
  );
}
