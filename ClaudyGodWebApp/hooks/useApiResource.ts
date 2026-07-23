import { useState, useEffect, useCallback } from 'react';
import { get, BackendError } from '@/lib/data/client';

/**
 * Shared GET-resource hook: fetches `path` via the one consolidated data
 * client, tracks loading/error state, and exposes `refetch`. Every list-style
 * hook in this app (albums, events, blog posts, ...) is a thin wrapper
 * around this so there's one place that owns fetch/error semantics instead
 * of six copies drifting apart.
 *
 * `fallback` serves double duty: it's the value shown before the first
 * fetch resolves, AND what `data` reverts to if the fetch fails. Passing
 * curated, real, properly-shaped content (rather than an empty list) means
 * a section keeps showing something genuine during a backend hiccup instead
 * of going blank — callers that want "hide on error" instead (the right
 * call for anything time-sensitive, like live event dates) should keep
 * passing an empty fallback.
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
      setData(fallback);
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
