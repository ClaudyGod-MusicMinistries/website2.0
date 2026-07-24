import { useApiResource } from '@/hooks/useApiResource';
import { fallbackFAQs } from '@/data/fallback';
import type { FAQ } from '@/lib/data/types';

export function useFAQs(category?: string) {
  const fallback =
    category && category !== 'All'
      ? fallbackFAQs.filter((f) => f.category === category)
      : fallbackFAQs;

  const { data, loading, error, refetch } = useApiResource<FAQ[]>(
    '/faqs',
    category ? { category } : undefined,
    fallback,
    [category]
  );
  return { faqs: data, loading, error, refetch };
}
