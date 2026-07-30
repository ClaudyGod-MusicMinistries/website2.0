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
    'group relative isolate inline-flex items-center justify-center gap-1.5 overflow-hidden',
    // font-sans, not font-display — buttons are UI chrome, not editorial
    // headlines; the display face at button sizes read heavy/oversized.
    'font-sans font-semibold tracking-wide',
    'rounded-lg border shadow-sm transition-[color,background-color,border-color,box-shadow,transform,filter] duration-200 ease-out',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-base',
    'disabled:pointer-events-none disabled:opacity-40',
    'select-none cursor-pointer touch-manipulation active:translate-y-px active:scale-[0.985]',
    'before:pointer-events-none before:absolute before:inset-y-0 before:-left-1/2 before:w-1/3 before:skew-x-[-18deg] before:bg-white/15 before:opacity-0 before:transition-[left,opacity] before:duration-500 hover:before:left-[115%] hover:before:opacity-100',
  ],
  {
    variants: {
      variant: {
        primary: [
          'bg-gradient-gold text-surface-base border-transparent',
          'shadow-gold-cta hover:-translate-y-0.5 hover:shadow-gold-cta-hover hover:brightness-105',
        ],
        secondary: [
          'bg-purple-600 text-white border-transparent',
          'shadow-purple-cta hover:-translate-y-0.5 hover:bg-purple-500 hover:shadow-purple-cta-hover',
        ],
        outline: [
          'bg-transparent text-purple-200 border-purple-400/50',
          'hover:-translate-y-0.5 hover:bg-purple-600 hover:text-white hover:border-purple-600 hover:shadow-purple',
        ],
        // Same role as `outline`, for use on white/cream section
        // backgrounds — `outline`'s text-purple-200 is tuned for dark
        // surfaces and reads as nearly invisible on a light one.
        'outline-dark': [
          'bg-transparent text-purple-700 border-purple-300',
          'hover:-translate-y-0.5 hover:bg-purple-600 hover:text-white hover:border-purple-600 hover:shadow-purple',
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
        danger: ['bg-status-error text-white border-transparent', 'hover:brightness-110'],
        link: [
          'bg-transparent border-transparent text-gold-500 underline-offset-4',
          'hover:underline hover:text-gold-400',
          'h-auto p-0 shadow-none active:scale-100 before:hidden',
        ],
      },
      // Text stays at text-sm max even at the largest size — only height
      // and padding grow. A button reading text-base/uppercase/tracked
      // was consistently the "buttons feel too big" complaint.
      size: {
        xs: 'h-7  px-3   text-[0.7rem] gap-1',
        sm: 'h-8  px-3.5 text-xs',
        md: 'h-9  px-4   text-xs',
        lg: 'h-10 px-5   text-sm',
        xl: 'h-11 px-6   text-sm',
        icon: 'h-9  w-9    p-0',
      },
      fullWidth: { true: 'w-full' },
      // tracking-wider, not tracking-widest — the widest tracking read as
      // shouty at button sizes; save tracking-widest for actual eyebrow
      // labels, which have room to breathe.
      uppercase: { true: 'uppercase tracking-wider' },
    },
    defaultVariants: { variant: 'primary', size: 'md' },
  }
);
