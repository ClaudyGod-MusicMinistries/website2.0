import { useApiResource } from '@/hooks/useApiResource';
import type { Event } from '@/lib/data/types';

export function useEvents(status?: 'upcoming' | 'ongoing' | 'completed') {
  const { data, loading, error, refetch } = useApiResource<Event[]>(
    '/events',
    status ? { status } : undefined,
    [],
    [status],
  );
  return { events: data, loading, error, refetch };
}
