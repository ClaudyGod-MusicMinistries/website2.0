import { useState, useEffect } from 'react';
import { apiGet, invalidateCache } from '@/lib/api/client';
import type { BlogPost, ApiResponse, PaginatedResponse } from '@/lib/api/types';

interface UseBlogPostsResult {
  posts: BlogPost[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useBlogPosts(page: number = 1, pageSize: number = 10): UseBlogPostsResult {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      setError(null);

      const endpoint = `/api/blog?page=${page}&pageSize=${pageSize}`;
      const response = await apiGet<ApiResponse<PaginatedResponse<BlogPost>>>(endpoint);

      if (response.success && response.data?.items) {
        setPosts(response.data.items);
      } else {
        throw new Error(response.message || 'Failed to load blog posts');
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to load blog posts';
      setError(message);
      console.error('[useBlogPosts] Error:', message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [page, pageSize]);

  const refetch = async () => {
    invalidateCache(`/api/blog?page=${page}&pageSize=${pageSize}`);
    await fetchPosts();
  };

  return { posts, loading, error, refetch };
}
