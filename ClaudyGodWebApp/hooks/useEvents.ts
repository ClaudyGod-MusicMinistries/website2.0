/**
 * Hook for fetching events data
 * Handles loading, error, and caching
 */

import { useState, useEffect } from 'react';
import { apiGet, invalidateCache } from '@/lib/api/client';
import type { Event, ApiResponse } from '@/lib/api/types';

interface UseEventsResult {
  events: Event[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useEvents(status?: 'upcoming' | 'ongoing' | 'completed'): UseEventsResult {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      setError(null);

      let endpoint = '/api/events';
      if (status) {
        endpoint += `?status=${status}`;
      }

      const response = await apiGet<ApiResponse<Event[]>>(endpoint);

      if (response.success && Array.isArray(response.data)) {
        setEvents(response.data);
      } else {
        throw new Error(response.message || 'Failed to load events');
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to load events';
      setError(message);
      console.error('[useEvents] Error:', message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [status]);

  const refetch = async () => {
    if (status) {
      invalidateCache(`/api/events?status=${status}`);
    } else {
      invalidateCache('/api/events');
    }
    await fetchEvents();
  };

  return { events, loading, error, refetch };
}
