import { useApiResource } from '@/hooks/useApiResource';
import type { FAQ } from '@/lib/data/types';

export function useFAQs(category?: string) {
  const { data, loading, error, refetch } = useApiResource<FAQ[]>(
    '/faqs',
    category ? { category } : undefined,
    [],
    [category],
  );
  return { faqs: data, loading, error, refetch };
}
