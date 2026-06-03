import { useState, useEffect } from 'react';
import { apiGet, invalidateCache } from '@/lib/api/client';
import type { MediaItem, ApiResponse } from '@/lib/api/types';

interface UseMediaResult {
  media: MediaItem[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useMedia(category?: string): UseMediaResult {
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMedia = async () => {
    try {
      setLoading(true);
      setError(null);

      let endpoint = '/api/media';
      if (category) {
        endpoint += `?category=${encodeURIComponent(category)}`;
      }

      const response = await apiGet<ApiResponse<MediaItem[]>>(endpoint);

      if (response.success && Array.isArray(response.data)) {
        setMedia(response.data);
      } else {
        throw new Error(response.message || 'Failed to load media');
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to load media';
      setError(message);
      console.error('[useMedia] Error:', message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedia();
  }, [category]);

  const refetch = async () => {
    if (category) {
      invalidateCache(`/api/media?category=${encodeURIComponent(category)}`);
    } else {
      invalidateCache('/api/media');
    }
    await fetchMedia();
  };

  return { media, loading, error, refetch };
}
