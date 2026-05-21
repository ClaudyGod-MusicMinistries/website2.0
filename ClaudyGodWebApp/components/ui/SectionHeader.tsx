import { cn } from '@/utils/cn';
import { Label } from './Typography';
import { GoldBar } from './Divider';
import type { HTMLAttributes } from 'react';

interface SectionHeaderProps extends HTMLAttributes<HTMLDivElement> {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  titleClassName?: string;
}

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  className,
  titleClassName,
  ...props
}: SectionHeaderProps) {
  const isCenter = align === 'center';

  return (
    <div
      className={cn(
        'flex flex-col gap-3',
        isCenter ? 'items-center text-center' : 'items-start text-left',
        className
      )}
      {...props}
    >
      {eyebrow && <Label>{eyebrow}</Label>}

      <h2
        className={cn(
          'font-bricolage font-bold text-white text-2xl md:text-3xl lg:text-4xl leading-tight text-balance',
          titleClassName
        )}
      >
        {title}
      </h2>

      <GoldBar className={isCenter ? 'mx-auto' : undefined} />

      {subtitle && (
        <p
          className={cn(
            'text-neutral-400 text-base md:text-lg leading-relaxed max-w-2xl',
            isCenter && 'mx-auto'
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
