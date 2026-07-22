import { useApiResource } from '@/hooks/useApiResource';
import type { MediaItem, PaginatedResponse } from '@/lib/data/types';

const EMPTY: PaginatedResponse<MediaItem> = {
  items: [], totalCount: 0, pageNumber: 1, pageSize: 10, totalPages: 0,
  hasPreviousPage: false, hasNextPage: false,
};

export function useMedia(category?: string) {
  const { data, loading, error, refetch } = useApiResource<PaginatedResponse<MediaItem>>(
    '/media',
    category ? { category } : undefined,
    EMPTY,
    [category],
  );
  return { media: data.items, loading, error, refetch };
}
