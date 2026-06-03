import { useState, useEffect } from 'react';
import { apiGet, invalidateCache } from '@/lib/api/client';
import type { StoreProduct, ApiResponse } from '@/lib/api/types';

interface UseStoreProductsResult {
  products: StoreProduct[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useStoreProducts(category?: string): UseStoreProductsResult {
  const [products, setProducts] = useState<StoreProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);

      let endpoint = '/api/store/products';
      if (category) {
        endpoint += `?category=${encodeURIComponent(category)}`;
      }

      const response = await apiGet<ApiResponse<StoreProduct[]>>(endpoint);

      if (response.success && Array.isArray(response.data)) {
        setProducts(response.data);
      } else {
        throw new Error(response.message || 'Failed to load products');
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to load products';
      setError(message);
      console.error('[useStoreProducts] Error:', message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [category]);

  const refetch = async () => {
    if (category) {
      invalidateCache(`/api/store/products?category=${encodeURIComponent(category)}`);
    } else {
      invalidateCache('/api/store/products');
    }
    await fetchProducts();
  };

  return { products, loading, error, refetch };
}
