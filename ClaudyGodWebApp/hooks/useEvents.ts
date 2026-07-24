import { useApiResource } from '@/hooks/useApiResource';
import type { Event, PaginatedResponse } from '@/lib/data/types';

const EMPTY: PaginatedResponse<Event> = {
  items: [],
  totalCount: 0,
  pageNumber: 1,
  pageSize: 10,
  totalPages: 0,
  hasPreviousPage: false,
  hasNextPage: false,
};

export function useEvents(status?: 'upcoming' | 'ongoing' | 'completed') {
  const { data, loading, error, refetch } = useApiResource<PaginatedResponse<Event>>(
    '/events',
    status ? { status } : undefined,
    EMPTY,
    [status],
    (r) => r.items.length === 0
  );
  return { events: data.items, loading, error, refetch };
}
