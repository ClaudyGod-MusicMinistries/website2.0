import { useState, useEffect } from 'react';
import { apiGet, invalidateCache } from '@/lib/api/client';
import type { FAQ, ApiResponse } from '@/lib/api/types';

interface UseFAQsResult {
  faqs: FAQ[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useFAQs(category?: string): UseFAQsResult {
  const [faqs, setFAQs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFAQs = async () => {
    try {
      setLoading(true);
      setError(null);

      let endpoint = '/api/faqs';
      if (category) {
        endpoint += `?category=${encodeURIComponent(category)}`;
      }

      const response = await apiGet<ApiResponse<FAQ[]>>(endpoint);

      if (response.success && Array.isArray(response.data)) {
        setFAQs(response.data);
      } else {
        throw new Error(response.message || 'Failed to load FAQs');
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to load FAQs';
      setError(message);
      console.error('[useFAQs] Error:', message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFAQs();
  }, [category]);

  const refetch = async () => {
    if (category) {
      invalidateCache(`/api/faqs?category=${encodeURIComponent(category)}`);
    } else {
      invalidateCache('/api/faqs');
    }
    await fetchFAQs();
  };

  return { faqs, loading, error, refetch };
}
