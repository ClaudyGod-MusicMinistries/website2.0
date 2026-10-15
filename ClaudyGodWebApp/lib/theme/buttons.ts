import { cva } from 'class-variance-authority';

/**
 * The one button variant source for the whole app. Every clickable action
 * — hero CTAs, form submits, card links styled as buttons — should render
 * through <Button variant="..."> (components/ui/Button.tsx) instead of a
 * one-off hand-typed className, which is how buttons ended up with
 * inconsistent hover/active/focus treatment (some had press feedback,
 * some didn't; some had a focus ring, some didn't) across the app.
 *
 * `primary` is gold — reserve it for the single most important action on
 * a screen. `secondary` is solid purple, for the next-most-important
 * action that still needs presence (not just an outline). `outline`/
 * `ghost`/`soft` are lower-emphasis purple treatments for tertiary
 * actions. All variants share the same transition timing and
 * active:scale press feedback so nothing on the site ever feels
 * unresponsive to a click.
 */
export const buttonVariants = cva(
  [
    'group relative isolate inline-flex w-auto max-w-full shrink-0 items-center justify-center gap-2 overflow-hidden',
    'font-sans font-semibold tracking-wide',
    'rounded-full border shadow-xs transition-all duration-200 ease-out',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white',
    'disabled:pointer-events-none disabled:opacity-40',
    'select-none cursor-pointer touch-manipulation active:translate-y-px active:scale-[0.98]',
    'before:pointer-events-none before:absolute before:inset-y-0 before:-left-1/2 before:w-1/3 before:skew-x-[-18deg] before:bg-white/20 before:opacity-0 before:transition-[left,opacity] before:duration-500 hover:before:left-[115%] hover:before:opacity-100',
  ],
  {
    variants: {
      variant: {
        primary: [
          'bg-gradient-gold text-surface-base border-gold-400/30',
          'shadow-gold-cta hover:-translate-y-0.5 hover:shadow-gold-cta-hover hover:brightness-105 font-semibold',
        ],
        secondary: [
          'bg-purple-700 text-white border-purple-600/30',
          'shadow-purple-cta hover:-translate-y-0.5 hover:bg-purple-800 hover:shadow-purple-cta-hover font-semibold',
        ],
        outline: [
          'bg-white/90 backdrop-blur-sm text-neutral-800 border-neutral-300',
          'hover:-translate-y-0.5 hover:bg-white hover:text-gold-700 hover:border-gold-500 hover:shadow-sm',
        ],
        'outline-dark': [
          'bg-white/95 backdrop-blur-sm text-neutral-800 border-neutral-300/80',
          'hover:-translate-y-0.5 hover:bg-purple-50 hover:text-purple-800 hover:border-purple-300 hover:shadow-sm',
        ],
        dark: [
          'bg-neutral-900 text-white border-neutral-800',
          'shadow-sm hover:-translate-y-0.5 hover:bg-neutral-800 hover:shadow-md font-semibold',
        ],
        ghost: [
          'bg-transparent text-neutral-700 border-transparent',
          'hover:bg-neutral-100 hover:text-neutral-900',
        ],
        soft: [
          'bg-purple-50 text-purple-800 border-purple-200/60',
          'hover:bg-purple-100 hover:border-purple-300 hover:-translate-y-0.5',
        ],
        white: [
          'bg-white text-neutral-900 border-neutral-200 shadow-sm',
          'hover:bg-neutral-50 hover:shadow-md hover:border-neutral-300 hover:-translate-y-0.5',
        ],
        'outline-white': [
          'bg-white/15 backdrop-blur-md text-white border-white/40',
          'hover:border-white hover:bg-white/25 hover:-translate-y-0.5',
        ],
        danger: ['bg-status-error text-white border-transparent', 'hover:brightness-110'],
        link: [
          'bg-transparent border-transparent text-gold-600 underline-offset-4',
          'hover:underline hover:text-gold-700',
          'h-auto p-0 shadow-none active:scale-100 before:hidden',
        ],
      },
      size: {
        xs: 'h-8 px-4 text-xs gap-1.5',
        sm: 'h-10 px-5 text-xs font-semibold tracking-wider gap-2',
        md: 'h-11 px-6 text-xs sm:text-sm font-semibold tracking-wider gap-2.5',
        lg: 'h-12 px-7 text-sm sm:text-base font-semibold tracking-wide gap-3',
        xl: 'h-14 px-8 text-base font-bold tracking-wide gap-3',
        icon: 'h-10 w-10 p-0 rounded-full',
      },
      fullWidth: { true: 'w-full' },
      uppercase: { true: 'uppercase tracking-[0.08em]' },
    },
    defaultVariants: { variant: 'primary', size: 'md' },
  }
);
