import { type VariantProps } from 'class-variance-authority';
import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '@/lib/utils/cn';
import {
  displayVariants, headingVariants, headingTags, textVariants, labelVariants, accentVariants,
  type HeadingLevel,
} from '@/lib/theme/typography';

// ─── Display ───────────────────────────────────────────────────────────────

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
    <span className={cn('text-xs text-neutral-500 font-sans leading-snug', className)} {...props}>
      {children}
    </span>
  );
}

// ─── Accent ────────────────────────────────────────────────────────────────

interface AccentProps
  extends Omit<HTMLAttributes<HTMLElement>, 'color'>,
    VariantProps<typeof accentVariants> {
  as?: 'p' | 'blockquote' | 'span';
}

export function Accent({ as: Tag = 'blockquote', size, color, className, children, ...props }: AccentProps) {
  return (
    <Tag className={cn(accentVariants({ size, color }), className)} {...props}>
      {children}
    </Tag>
  );
}
