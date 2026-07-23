import { useApiResource } from '@/hooks/useApiResource';
import { fallbackVideos } from '@/data/fallback';
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

// Only ever called with type: 'video' today — the fallback below is
// video-specific. If a call site ever passes a different type, it'll fall
// back to an empty list rather than showing mismatched fallback content.
function fallbackFor(type?: string): PaginatedResponse<MediaItem> {
  if (type !== 'video') return EMPTY;
  return { ...EMPTY, items: fallbackVideos, totalCount: fallbackVideos.length };
}

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
    fallbackFor(type),
    [type]
  );
  return { media: data.items, loading, error, refetch };
}
