import { forwardRef, type HTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils/cn';

// ─── Container ────────────────────────────────────────────────────────────

const containerVariants = cva('w-full mx-auto', {
  variants: {
    size: {
      narrow:  'max-w-3xl  px-4 sm:px-6 lg:px-8',
      default: 'max-w-7xl  px-4 sm:px-6 lg:px-8',
      wide:    'max-w-8xl  px-4 sm:px-6 lg:px-10',
      full:    'max-w-full px-4 sm:px-6 lg:px-8',
    },
  },
  defaultVariants: { size: 'default' },
});

interface ContainerProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof containerVariants> {}

export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ size, className, children, ...props }, ref) => (
    <div ref={ref} className={cn(containerVariants({ size }), className)} {...props}>
      {children}
    </div>
  )
);
Container.displayName = 'Container';

// ─── Section ──────────────────────────────────────────────────────────────

const sectionVariants = cva('relative w-full', {
  variants: {
    bg: {
      base:     'bg-surface-base',
      muted:    'bg-surface-muted',
      elevated: 'bg-surface-elevated',
      overlay:  'bg-surface-overlay',
      transparent: 'bg-transparent',
    },
    py: {
      none: '',
      sm:   'py-8  md:py-12',
      md:   'py-12 md:py-16',
      lg:   'py-16 md:py-20 lg:py-24',
      xl:   'py-20 md:py-28 lg:py-32',
    },
  },
  defaultVariants: { bg: 'base', py: 'lg' },
});

interface SectionProps
  extends HTMLAttributes<HTMLElement>,
    VariantProps<typeof sectionVariants> {
  as?: 'section' | 'div' | 'article' | 'aside';
}

export const Section = forwardRef<HTMLElement, SectionProps>(
  ({ as: Tag = 'section', bg, py, className, children, ...props }, ref) => {
    const classes = cn(sectionVariants({ bg, py }), className);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const Component = Tag as any;
    return (
      <Component ref={ref} className={classes} {...props}>
        {children}
      </Component>
    );
  }
);
Section.displayName = 'Section';

// ─── Grid ─────────────────────────────────────────────────────────────────

const gridVariants = cva('grid', {
  variants: {
    cols: {
      1:  'grid-cols-1',
      2:  'grid-cols-1 sm:grid-cols-2',
      3:  'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
      4:  'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
      5:  'grid-cols-2 sm:grid-cols-3 lg:grid-cols-5',
      6:  'grid-cols-2 sm:grid-cols-3 lg:grid-cols-6',
      12: 'grid-cols-12',
    },
    gap: {
      none: 'gap-0',
      xs:   'gap-2',
      sm:   'gap-4',
      md:   'gap-6',
      lg:   'gap-8',
      xl:   'gap-10 md:gap-12',
    },
    align: {
      start:   'items-start',
      center:  'items-center',
      end:     'items-end',
      stretch: 'items-stretch',
    },
  },
  defaultVariants: { cols: 3, gap: 'md', align: 'stretch' },
});

interface GridProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof gridVariants> {}

export const Grid = forwardRef<HTMLDivElement, GridProps>(
  ({ cols, gap, align, className, children, ...props }, ref) => (
    <div ref={ref} className={cn(gridVariants({ cols, gap, align }), className)} {...props}>
      {children}
    </div>
  )
);
Grid.displayName = 'Grid';

// ─── Flex ─────────────────────────────────────────────────────────────────

const flexVariants = cva('flex', {
  variants: {
    direction: {
      row:     'flex-row',
      col:     'flex-col',
      'row-reverse': 'flex-row-reverse',
      'col-reverse': 'flex-col-reverse',
    },
    align: {
      start:    'items-start',
      center:   'items-center',
      end:      'items-end',
      stretch:  'items-stretch',
      baseline: 'items-baseline',
    },
    justify: {
      start:    'justify-start',
      center:   'justify-center',
      end:      'justify-end',
      between:  'justify-between',
      around:   'justify-around',
      evenly:   'justify-evenly',
    },
    wrap: {
      wrap:   'flex-wrap',
      nowrap: 'flex-nowrap',
    },
    gap: {
      none: 'gap-0',
      xs:   'gap-1',
      sm:   'gap-2',
      md:   'gap-4',
      lg:   'gap-6',
      xl:   'gap-8',
    },
  },
  defaultVariants: {
    direction: 'row',
    align:     'center',
    justify:   'start',
    wrap:      'nowrap',
    gap:       'md',
  },
});

interface FlexProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof flexVariants> {}

export const Flex = forwardRef<HTMLDivElement, FlexProps>(
  ({ direction, align, justify, wrap, gap, className, children, ...props }, ref) => (
    <div ref={ref} className={cn(flexVariants({ direction, align, justify, wrap, gap }), className)} {...props}>
      {children}
    </div>
  )
);
Flex.displayName = 'Flex';

// ─── Stack (vertical Flex shorthand) ──────────────────────────────────────

interface StackProps extends HTMLAttributes<HTMLDivElement> {
  gap?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  align?: 'start' | 'center' | 'end' | 'stretch';
}

export const Stack = forwardRef<HTMLDivElement, StackProps>(
  ({ gap = 'md', align = 'stretch', className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(flexVariants({ direction: 'col', align, gap }), className)}
      {...props}
    >
      {children}
    </div>
  )
);
Stack.displayName = 'Stack';
