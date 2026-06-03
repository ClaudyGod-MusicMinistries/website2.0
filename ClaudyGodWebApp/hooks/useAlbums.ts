import { useState, useEffect } from 'react';
import { apiGet, invalidateCache } from '@/lib/api/client';
import type { Album, ApiResponse } from '@/lib/api/types';

interface UseAlbumsResult {
  albums: Album[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useAlbums(): UseAlbumsResult {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAlbums = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await apiGet<ApiResponse<Album[]>>('/api/albums');

      if (response.success && Array.isArray(response.data)) {
        setAlbums(response.data);
      } else {
        throw new Error(response.message || 'Failed to load albums');
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to load albums';
      setError(message);
      console.error('[useAlbums] Error:', message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAlbums();
  }, []);

  const refetch = async () => {
    invalidateCache('/api/albums');
    await fetchAlbums();
  };

  return { albums, loading, error, refetch };
}
