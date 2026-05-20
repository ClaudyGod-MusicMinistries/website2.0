import { cva, type VariantProps } from 'class-variance-authority';
import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '@/utils/cn';

// ─── Display ───────────────────────────────────────────────────────────────
// Abril Fatface — hero-level only. Kept tastefully compact.

const displayVariants = cva('font-abril text-balance', {
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

interface DisplayProps
  extends Omit<HTMLAttributes<HTMLHeadingElement>, 'color'>,
    VariantProps<typeof displayVariants> {
  as?: 'h1' | 'h2';
}

export function Display({ as: Tag = 'h1', size, color, className, children, ...props }: DisplayProps) {
  return (
    <Tag className={cn(displayVariants({ size, color }), className)} {...props}>
      {children}
    </Tag>
  );
}

// ─── Heading ───────────────────────────────────────────────────────────────
// Bricolage Grotesque — section and card headings.

const headingVariants = cva('font-bricolage font-bold text-balance', {
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

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;
const headingTags: Record<HeadingLevel, string> = {
  1: 'h1', 2: 'h2', 3: 'h3', 4: 'h4', 5: 'h5', 6: 'h6',
};

interface HeadingProps
  extends Omit<HTMLAttributes<HTMLHeadingElement>, 'color'>,
    VariantProps<typeof headingVariants> {
  level?: HeadingLevel;
}

export const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ level = 2, color, className, children, ...props }, ref) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const Tag = headingTags[level] as any;
    return (
      <Tag ref={ref} className={cn(headingVariants({ level, color }), className)} {...props}>
        {children}
      </Tag>
    );
  }
);
Heading.displayName = 'Heading';

// ─── Text ──────────────────────────────────────────────────────────────────
// Body copy and UI text. Sizes are intentionally conservative.

const textVariants = cva('font-bricolage', {
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

interface TextProps
  extends Omit<HTMLAttributes<HTMLElement>, 'color'>,
    VariantProps<typeof textVariants> {
  as?: 'p' | 'span' | 'div' | 'li' | 'label';
}

export const Text = forwardRef<HTMLElement, TextProps>(
  ({ as: Tag = 'p', size, weight, color, align, leading, className, children, ...props }, ref) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const Component = Tag as any;
    return (
      <Component
        ref={ref}
        className={cn(textVariants({ size, weight, color, align, leading }), className)}
        {...props}
      >
        {children}
      </Component>
    );
  }
);
Text.displayName = 'Text';

// ─── Label ─────────────────────────────────────────────────────────────────
// WorkSans uppercase — eyebrows, form labels, tags.

const labelVariants = cva('font-worksans uppercase tracking-widest', {
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

interface LabelProps
  extends Omit<HTMLAttributes<HTMLSpanElement>, 'color'>,
    VariantProps<typeof labelVariants> {}

export function Label({ size, color, className, children, ...props }: LabelProps) {
  return (
    <span className={cn(labelVariants({ size, color }), className)} {...props}>
      {children}
    </span>
  );
}

// ─── Caption ───────────────────────────────────────────────────────────────
// Micro text — timestamps, footnotes, helper copy.

export function Caption({ className, children, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span className={cn('text-xs text-neutral-500 font-worksans leading-snug', className)} {...props}>
      {children}
    </span>
  );
}
