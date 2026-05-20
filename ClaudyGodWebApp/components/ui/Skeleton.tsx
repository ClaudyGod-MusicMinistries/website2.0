import { cn } from '@/utils/cn';
import type { HTMLAttributes } from 'react';

interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  rounded?: 'sm' | 'md' | 'lg' | 'full';
}

export function Skeleton({ rounded = 'md', className, ...props }: SkeletonProps) {
  const roundedClass = {
    sm:   'rounded',
    md:   'rounded-md',
    lg:   'rounded-xl',
    full: 'rounded-full',
  }[rounded];

  return (
    <div
      className={cn('skeleton', roundedClass, className)}
      {...props}
    />
  );
}

// ─── Preset skeleton shapes ────────────────────────────────────────────────

export function SkeletonText({ lines = 3, className }: { lines?: number; className?: string }) {
  return (
    <div className={cn('flex flex-col gap-2', className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          className="h-4"
          style={{ width: i === lines - 1 ? '60%' : '100%' }}
        />
      ))}
    </div>
  );
}

export function SkeletonCard({ className }: { className?: string }) {
  return (
    <div className={cn('rounded-xl bg-surface-elevated p-6 space-y-4', className)}>
      <Skeleton className="h-48 w-full" rounded="lg" />
      <Skeleton className="h-5 w-3/4" />
      <SkeletonText lines={2} />
      <Skeleton className="h-10 w-32" rounded="md" />
    </div>
  );
}

export function SkeletonAvatar({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const sizeClass = { sm: 'h-8 w-8', md: 'h-12 w-12', lg: 'h-16 w-16' }[size];
  return <Skeleton className={sizeClass} rounded="full" />;
}
