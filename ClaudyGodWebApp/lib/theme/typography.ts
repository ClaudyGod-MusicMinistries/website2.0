import { cva } from 'class-variance-authority';

/**
 * The type-role variant source for the whole app. Every heading/body/label
 * in new or touched code should render through the Display/Heading/Text/
 * Label/Caption/Accent components (components/ui/Typography.tsx) instead
 * of a one-off `<h2 className="text-3xl font-bold ...">` — that pattern is
 * exactly how the app ended up with four divergent heading size ramps
 * before this rebuild. Only two font-family classes exist in the app
 * (`font-display`, `font-sans`, see lib/fonts.ts) — these variants are
 * the layer that decides which role uses which one, at which size.
 */

// ─── Display — Fraunces, hero-level only ────────────────────────────────────
export const displayVariants = cva('font-display text-balance', {
  variants: {
    size: {
      xl: 'text-4xl md:text-5xl lg:text-6xl leading-none',
      lg: 'text-3xl md:text-4xl lg:text-5xl leading-none',
      md: 'text-2xl md:text-3xl lg:text-4xl leading-tight',
      sm: 'text-xl  md:text-2xl lg:text-3xl leading-tight',
    },
    color: {
      white: 'text-white',
      gold:  'text-gradient-gold',
      muted: 'text-neutral-300',
    },
  },
  defaultVariants: { size: 'md', color: 'white' },
});

// ─── Heading — Fraunces, section/card headings ──────────────────────────────
export const headingVariants = cva('font-display font-semibold text-balance', {
  variants: {
    level: {
      1: 'text-3xl md:text-4xl leading-tight',
      2: 'text-2xl md:text-3xl leading-tight',
      3: 'text-xl  md:text-2xl leading-snug',
      4: 'text-lg  md:text-xl  leading-snug',
      5: 'text-base md:text-lg  leading-normal',
      6: 'text-sm  md:text-base leading-normal',
    },
    color: {
      white:   'text-white',
      gold:    'text-gold-500',
      muted:   'text-neutral-300',
      inherit: 'text-inherit',
    },
  },
  defaultVariants: { level: 2, color: 'white' },
});

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;
export const headingTags: Record<HeadingLevel, string> = {
  1: 'h1', 2: 'h2', 3: 'h3', 4: 'h4', 5: 'h5', 6: 'h6',
};

// ─── Text — Inter, body copy and UI text ────────────────────────────────────
export const textVariants = cva('font-sans', {
  variants: {
    size: {
      '2xs': 'text-[0.625rem] leading-tight',
      xs:    'text-xs',
      sm:    'text-sm',
      base:  'text-base',
      lg:    'text-lg',
    },
    weight: {
      light:    'font-light',
      regular:  'font-normal',
      medium:   'font-medium',
      semibold: 'font-semibold',
      bold:     'font-bold',
    },
    color: {
      primary:   'text-white',
      secondary: 'text-neutral-300',
      muted:     'text-neutral-400',
      dim:       'text-neutral-500',
      gold:      'text-gold-500',
      goldLight: 'text-gold-300',
      error:     'text-status-error',
      success:   'text-status-success',
      inherit:   'text-inherit',
    },
    align: {
      left:    'text-left',
      center:  'text-center',
      right:   'text-right',
      justify: 'text-justify',
    },
    leading: {
      tight:   'leading-tight',
      snug:    'leading-snug',
      normal:  'leading-normal',
      relaxed: 'leading-relaxed',
      loose:   'leading-loose',
    },
  },
  defaultVariants: {
    size:    'base',
    weight:  'regular',
    color:   'secondary',
    leading: 'relaxed',
  },
});

// ─── Label — Inter uppercase, tracked — eyebrows, form labels, tags ────────
export const labelVariants = cva('font-sans font-medium uppercase tracking-widest', {
  variants: {
    size: {
      sm:   'text-[0.625rem]',
      base: 'text-xs',
      lg:   'text-sm',
    },
    color: {
      gold:  'text-gold-500',
      muted: 'text-neutral-400',
      white: 'text-white',
    },
  },
  defaultVariants: { size: 'base', color: 'gold' },
});

// ─── Accent — Fraunces italic — scripture callouts and pull-quotes only ────
export const accentVariants = cva('font-display italic text-balance', {
  variants: {
    size: {
      sm: 'text-lg md:text-xl leading-relaxed',
      md: 'text-xl md:text-2xl leading-relaxed',
      lg: 'text-2xl md:text-3xl leading-relaxed',
    },
    color: {
      white: 'text-white',
      gold:  'text-gold-400',
      muted: 'text-neutral-300',
    },
  },
  defaultVariants: { size: 'md', color: 'gold' },
});
