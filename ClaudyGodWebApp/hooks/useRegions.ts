'use client';

import { useEffect, useState } from 'react';
import type { RegionOption } from '@/lib/data/regions';

const cache = new Map<string, RegionOption[]>();

export function useRegions(countryName?: string) {
  const cacheKey = countryName?.trim().toLocaleLowerCase() ?? '';
  const [regions, setRegions] = useState<RegionOption[]>(() => cache.get(cacheKey) ?? []);
  const [isLoading, setIsLoading] = useState(Boolean(countryName && !cache.has(cacheKey)));
  const [isUnavailable, setIsUnavailable] = useState(false);

  useEffect(() => {
    if (!countryName || !cacheKey) {
      setRegions([]);
      setIsLoading(false);
      setIsUnavailable(false);
      return;
    }

    const cached = cache.get(cacheKey);
    if (cached) {
      setRegions(cached);
      setIsLoading(false);
      setIsUnavailable(false);
      return;
    }

    const controller = new AbortController();
    setRegions([]);
    setIsLoading(true);
    setIsUnavailable(false);
    fetch(`/api/locations/regions?country=${encodeURIComponent(countryName)}`, {
      signal: controller.signal,
    })
      .then(async (response) => {
        if (!response.ok) throw new Error('Unable to load regions');
        return response.json() as Promise<{
          regions: RegionOption[];
          source: 'live' | 'unavailable';
        }>;
      })
      .then(({ regions: loaded, source }) => {
        cache.set(cacheKey, loaded);
        setRegions(loaded);
        setIsUnavailable(source !== 'live' || loaded.length === 0);
      })
      .catch((error: unknown) => {
        if ((error as { name?: string }).name !== 'AbortError') setIsUnavailable(true);
      })
      .finally(() => {
        if (!controller.signal.aborted) setIsLoading(false);
      });

    return () => controller.abort();
  }, [cacheKey, countryName]);

  return { regions, isLoading, isUnavailable };
}
