'use client';

import { useEffect, useState } from 'react';
import { FALLBACK_COUNTRIES, type CountryOption } from '@/lib/data/countries';

let countryCache: CountryOption[] | null = null;

export function useCountries() {
  const [countries, setCountries] = useState(countryCache ?? FALLBACK_COUNTRIES);
  const [isLoading, setIsLoading] = useState(!countryCache);

  useEffect(() => {
    if (countryCache) return;
    const controller = new AbortController();
    fetch('/api/countries', { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error('Unable to load countries');
        return response.json() as Promise<{ countries: CountryOption[] }>;
      })
      .then(({ countries: loaded }) => {
        if (!loaded.length) return;
        countryCache = loaded;
        setCountries(loaded);
      })
      .catch(() => undefined)
      .finally(() => setIsLoading(false));
    return () => controller.abort();
  }, []);

  return { countries, isLoading };
}
