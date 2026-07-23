import { useState, useEffect, useCallback } from 'react';
import { get, BackendError } from '@/lib/data/client';

/**
 * Shared GET-resource hook: fetches `path` via the one consolidated data
 * client, tracks loading/error state, and exposes `refetch`. Every list-style
 * hook in this app (albums, events, blog posts, ...) is a thin wrapper
 * around this so there's one place that owns fetch/error semantics instead
 * of six copies drifting apart.
 */
export function useApiResource<T>(
  path: string,
  params: Record<string, string | number | undefined> | undefined,
  fallback: T,
  deps: readonly unknown[]
) {
  const [data, setData] = useState<T>(fallback);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      setData(await get<T>(path, params));
    } catch (err) {
      setError(
        err instanceof BackendError ? err.message : 'Something went wrong. Please try again.'
      );
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}
