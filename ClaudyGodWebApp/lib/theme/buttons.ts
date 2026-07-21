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
    'inline-flex items-center justify-center gap-1.5',
    'font-display font-semibold tracking-wide',
    'rounded-lg border transition-all duration-150',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-base',
    'disabled:pointer-events-none disabled:opacity-40',
    'select-none cursor-pointer active:scale-[0.97]',
  ],
  {
    variants: {
      variant: {
        primary: [
          'bg-gradient-gold text-surface-base border-transparent',
          'hover:shadow-gold hover:brightness-110',
        ],
        secondary: [
          'bg-purple-600 text-white border-transparent',
          'hover:bg-purple-500 hover:shadow-purple',
        ],
        outline: [
          'bg-transparent text-purple-200 border-purple-400/50',
          'hover:bg-purple-600 hover:text-white hover:border-purple-600',
        ],
        ghost: [
          'bg-transparent text-white border-transparent',
          'hover:bg-surface-elevated hover:text-gold-400',
        ],
        soft: [
          'bg-purple-600/15 text-purple-200 border-purple-500/20',
          'hover:bg-purple-600/25 hover:border-purple-500/40',
        ],
        white: [
          'bg-white text-surface-base border-transparent',
          'hover:bg-neutral-100 hover:shadow-md',
        ],
        // For secondary CTAs over a photo/video background (hero sections,
        // PageHero), where a purple-tinted outline would disappear against
        // a busy image — needs true white/transparent contrast instead.
        'outline-white': [
          'bg-transparent text-white border-white/30 backdrop-blur-sm',
          'hover:border-white/70 hover:bg-white/10',
        ],
        danger: [
          'bg-status-error text-white border-transparent',
          'hover:brightness-110',
        ],
        link: [
          'bg-transparent border-transparent text-gold-500 underline-offset-4',
          'hover:underline hover:text-gold-400',
          'h-auto p-0 active:scale-100',
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
