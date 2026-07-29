import { cn } from '@/lib/utils/cn';

const columns = {
  1: 'grid-cols-1',
  2: 'sm:grid-cols-2',
  3: 'sm:grid-cols-2 lg:grid-cols-3',
  4: 'sm:grid-cols-2 lg:grid-cols-4',
} as const;

export function GridSkeleton({ cols = 4, rows = 2 }: { cols?: 1 | 2 | 3 | 4; rows?: number }) {
  return (
    <div className={cn('grid grid-cols-1 gap-5', columns[cols])} aria-label="Loading content">
      {Array.from({ length: cols * rows }).map((_, i) => (
        <div key={i} className="aspect-video skeleton" />
      ))}
    </div>
  );
}
