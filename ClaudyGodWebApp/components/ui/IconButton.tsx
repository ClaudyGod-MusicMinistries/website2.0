'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { cn } from '@/utils/cn';

const iconButtonVariants = cva(
  [
    'inline-flex items-center justify-center',
    'rounded-full border transition-all duration-250',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-base',
    'disabled:pointer-events-none disabled:opacity-40',
    'cursor-pointer select-none',
  ],
  {
    variants: {
      variant: {
        primary: [
          'bg-gradient-gold text-surface-base border-transparent',
          'hover:shadow-gold hover:brightness-110 active:scale-95',
        ],
        outline: [
          'bg-transparent text-gold-500 border-gold-500',
          'hover:bg-gold-500 hover:text-surface-base active:scale-95',
        ],
        ghost: [
          'bg-transparent text-neutral-300 border-transparent',
          'hover:bg-surface-elevated hover:text-gold-400 active:scale-95',
        ],
        soft: [
          'bg-gold-500/10 text-gold-400 border-gold-500/20',
          'hover:bg-gold-500/20 active:scale-95',
        ],
        white: [
          'bg-white text-surface-base border-transparent',
          'hover:bg-neutral-100 active:scale-95',
        ],
      },
      size: {
        xs: 'h-7  w-7  text-xs',
        sm: 'h-9  w-9  text-sm',
        md: 'h-10 w-10 text-base',
        lg: 'h-12 w-12 text-lg',
        xl: 'h-14 w-14 text-xl',
      },
    },
    defaultVariants: {
      variant: 'ghost',
      size: 'md',
    },
  }
);

export interface IconButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof iconButtonVariants> {
  label: string;
}

const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, variant, size, label, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        aria-label={label}
        className={cn(iconButtonVariants({ variant, size }), className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);

IconButton.displayName = 'IconButton';

export { IconButton, iconButtonVariants };
