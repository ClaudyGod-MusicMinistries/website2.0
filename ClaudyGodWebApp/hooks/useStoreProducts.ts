import { useApiResource } from '@/hooks/useApiResource';
import { fallbackStoreProducts } from '@/data/fallback';
import type { StoreProduct } from '@/lib/data/types';

export function useStoreProducts(category?: string) {
  const fallback =
    category && category !== 'all'
      ? fallbackStoreProducts.filter((p) => p.category === category)
      : fallbackStoreProducts;

  const { data, loading, error, refetch } = useApiResource<StoreProduct[]>(
    '/store/products',
    category ? { category } : undefined,
    fallback,
    [category]
  );
  return { products: data, loading, error, refetch };
}
