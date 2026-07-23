import { useApiResource } from '@/hooks/useApiResource';
import type { StoreProduct } from '@/lib/data/types';

export function useStoreProducts(category?: string) {
  const { data, loading, error, refetch } = useApiResource<StoreProduct[]>(
    '/store/products',
    category ? { category } : undefined,
    [],
    [category]
  );
  return { products: data, loading, error, refetch };
}
