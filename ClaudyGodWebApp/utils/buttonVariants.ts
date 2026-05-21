import { cva } from 'class-variance-authority';

export const buttonVariants = cva(
  [
    'inline-flex items-center justify-center gap-1.5',
    'font-bricolage font-semibold tracking-wide',
    'rounded-lg border transition-all duration-200',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-base',
    'disabled:pointer-events-none disabled:opacity-40',
    'select-none cursor-pointer',
  ],
  {
    variants: {
      variant: {
        primary: [
          'bg-gradient-gold text-surface-base border-transparent',
          'hover:shadow-gold hover:brightness-110',
          'active:scale-[0.97]',
        ],
        outline: [
          'bg-transparent text-gold-500 border-gold-500',
          'hover:bg-gold-500 hover:text-surface-base',
          'active:scale-[0.97]',
        ],
        ghost: [
          'bg-transparent text-white border-transparent',
          'hover:bg-surface-elevated hover:text-gold-400',
          'active:scale-[0.97]',
        ],
        soft: [
          'bg-gold-500/10 text-gold-400 border-gold-500/20',
          'hover:bg-gold-500/20 hover:border-gold-500/40',
          'active:scale-[0.97]',
        ],
        white: [
          'bg-white text-surface-base border-transparent',
          'hover:bg-neutral-100 hover:shadow-md',
          'active:scale-[0.97]',
        ],
        danger: [
          'bg-status-error text-white border-transparent',
          'hover:brightness-110',
          'active:scale-[0.97]',
        ],
        link: [
          'bg-transparent border-transparent text-gold-500 underline-offset-4',
          'hover:underline hover:text-gold-400',
          'h-auto p-0',
        ],
      },
      size: {
        xs:   'h-7  px-3   text-xs  gap-1',
        sm:   'h-8  px-3.5 text-xs',
        md:   'h-9  px-4   text-sm',
        lg:   'h-10 px-5   text-sm',
        xl:   'h-11 px-6   text-base',
        icon: 'h-9  w-9    p-0',
      },
      fullWidth: { true: 'w-full' },
      uppercase: { true: 'uppercase tracking-widest' },
    },
    defaultVariants: { variant: 'primary', size: 'md' },
  }
);
