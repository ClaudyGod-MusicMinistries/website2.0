import { useApiResource } from '@/hooks/useApiResource';
import type { MediaItem, PaginatedResponse } from '@/lib/data/types';

const EMPTY: PaginatedResponse<MediaItem> = {
  items: [],
  totalCount: 0,
  pageNumber: 1,
  pageSize: 10,
  totalPages: 0,
  hasPreviousPage: false,
  hasNextPage: false,
};

/**
 * `type` matches the backend's `MediaType` enum (e.g. 'video', 'music',
 * 'photo') — ASP.NET Core binds query-string enums case-insensitively, so
 * lowercase call sites like `useMedia('video')` reach `MediaType.Video`.
 * Previously sent as `category`, a param the backend never read.
 */
export function useMedia(type?: string) {
  const { data, loading, error, refetch } = useApiResource<PaginatedResponse<MediaItem>>(
    '/media',
    type ? { type } : undefined,
    EMPTY,
    [type]
  );
  return { media: data.items, loading, error, refetch };
}
