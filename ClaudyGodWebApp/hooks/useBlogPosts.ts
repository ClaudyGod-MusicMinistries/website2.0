import { useApiResource } from '@/hooks/useApiResource';
import type { BlogPost, PaginatedResponse } from '@/lib/data/types';

const EMPTY: PaginatedResponse<BlogPost> = { items: [], total: 0, page: 1, pageSize: 10, totalPages: 0 };

export function useBlogPosts(page: number = 1, pageSize: number = 10) {
  const { data, loading, error, refetch } = useApiResource<PaginatedResponse<BlogPost>>(
    '/blog',
    { page, pageSize },
    EMPTY,
    [page, pageSize],
  );
  return { posts: data.items, loading, error, refetch };
}
