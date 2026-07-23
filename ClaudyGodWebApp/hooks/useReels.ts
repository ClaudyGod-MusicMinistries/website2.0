import { useApiResource } from '@/hooks/useApiResource';
import type { Reel } from '@/lib/data/types';

export function useReels(category?: string) {
  const { data, loading, error, refetch } = useApiResource<Reel[]>(
    '/reels',
    category ? { category } : undefined,
    [],
    [category]
  );
  return { reels: data, loading, error, refetch };
}
