import { useApiResource } from '@/hooks/useApiResource';
import { fallbackAlbums } from '@/data/fallback';
import type { Album } from '@/lib/data/types';

export function useAlbums() {
  const { data, loading, error, refetch } = useApiResource<Album[]>(
    '/albums',
    undefined,
    fallbackAlbums,
    []
  );
  return { albums: data, loading, error, refetch };
}
