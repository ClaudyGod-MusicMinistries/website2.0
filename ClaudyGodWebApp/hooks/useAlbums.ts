import { useApiResource } from '@/hooks/useApiResource';
import type { Album } from '@/lib/data/types';

export function useAlbums() {
  const { data, loading, error, refetch } = useApiResource<Album[]>('/albums', undefined, [], []);
  return { albums: data, loading, error, refetch };
}
