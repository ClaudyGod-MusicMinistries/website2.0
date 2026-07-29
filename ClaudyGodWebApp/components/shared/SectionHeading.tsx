import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils/cn';
import { Heading, Label, Text } from '@/components/ui/Typography';

interface SectionHeadingProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
  align?: 'left' | 'center';
  tone?: 'light' | 'dark';
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  action,
  align = 'left',
  tone = 'light',
  className,
  ...props
}: SectionHeadingProps) {
  const centered = align === 'center';
  return (
    <div
      className={cn(
        'mb-8 flex flex-col gap-5 sm:mb-10 sm:flex-row sm:items-end sm:justify-between',
        centered && 'items-center text-center sm:items-center sm:text-center',
        className
      )}
      {...props}
    >
      <div className={cn('max-w-2xl', centered && 'mx-auto')}>
        {eyebrow && (
          <div className={cn('mb-3 flex items-center gap-3', centered && 'justify-center')}>
            <span className={cn('h-px w-8', tone === 'dark' ? 'bg-gold-400' : 'bg-gold-600')} />
            <Label
              className={cn(
                'text-[0.68rem] tracking-[0.16em]',
                tone === 'dark' ? 'text-gold-400' : 'text-purple-700'
              )}
            >
              {eyebrow}
            </Label>
          </div>
        )}
        <Heading
          level={2}
          color="inherit"
          className={cn(
            'font-raleway text-2xl font-light leading-tight sm:text-3xl md:text-4xl',
            tone === 'dark' ? 'text-white' : 'text-neutral-950'
          )}
        >
          {title}
        </Heading>
        {description && (
          <Text
            size="sm"
            color="inherit"
            className={cn(
              'mt-3 max-w-xl leading-6',
              centered && 'mx-auto',
              tone === 'dark' ? 'text-neutral-400' : 'text-neutral-600'
            )}
          >
            {description}
          </Text>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
