import { useApiResource } from '@/hooks/useApiResource';
import type { MediaItem } from '@/lib/data/types';

export function useMedia(category?: string) {
  const { data, loading, error, refetch } = useApiResource<MediaItem[]>(
    '/media',
    category ? { category } : undefined,
    [],
    [category],
  );
  return { media: data, loading, error, refetch };
}
