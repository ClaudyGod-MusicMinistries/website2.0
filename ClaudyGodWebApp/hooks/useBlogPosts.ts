import { useApiResource } from '@/hooks/useApiResource';
import type { BlogPost, PaginatedResponse } from '@/lib/data/types';

const EMPTY: PaginatedResponse<BlogPost> = {
  items: [],
  totalCount: 0,
  pageNumber: 1,
  pageSize: 10,
  totalPages: 0,
  hasPreviousPage: false,
  hasNextPage: false,
};

export function useBlogPosts(page: number = 1, pageSize: number = 10) {
  const { data, loading, error, refetch } = useApiResource<PaginatedResponse<BlogPost>>(
    '/blog',
    { page, pageSize },
    EMPTY,
    [page, pageSize]
  );
  return { posts: data.items, loading, error, refetch };
}
