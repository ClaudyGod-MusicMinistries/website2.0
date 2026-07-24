import { useState, useEffect, useCallback } from 'react';
import { get, BackendError } from '@/lib/data/client';

const defaultIsEmpty = (data: unknown): boolean => Array.isArray(data) && data.length === 0;

/**
 * Shared GET-resource hook: fetches `path` via the one consolidated data
 * client, tracks loading/error state, and exposes `refetch`. Every list-style
 * hook in this app (albums, events, blog posts, ...) is a thin wrapper
 * around this so there's one place that owns fetch/error semantics instead
 * of six copies drifting apart.
 *
 * `fallback` serves triple duty: it's the value shown before the first fetch
 * resolves, what `data` reverts to if the fetch fails, AND — via `isEmpty` —
 * what's shown when the fetch *succeeds* but the backend genuinely has no
 * rows yet. A successful empty response and a broken one look identical to a
 * visitor (a blank section), so an unseeded backend shouldn't read any
 * differently than an outage for resources with real curated fallback
 * content. Callers that want "hide when truly empty" instead (the right call
 * for anything time-sensitive, like live event dates, or content with no
 * curated fallback at all, like blog posts) get that for free by passing an
 * empty fallback — swapping empty-for-empty is a no-op.
 *
 * `isEmpty` defaults to a bare-array check; hooks wrapping a paginated
 * `{ items: T[] }` response pass `(r) => r.items.length === 0`.
 */
export function useApiResource<T>(
  path: string,
  params: Record<string, string | number | undefined> | undefined,
  fallback: T,
  deps: readonly unknown[],
  isEmpty: (data: T) => boolean = defaultIsEmpty
) {
  const [data, setData] = useState<T>(fallback);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await get<T>(path, params);
      setData(isEmpty(result) && !isEmpty(fallback) ? fallback : result);
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
