import { ok, getSearchParam } from '@/utils/api';
import { products } from '@/data/store';
import type { ProductListResponse } from '@/types/api';

export const dynamic = 'force-dynamic';

export function GET(req: Request): Response {
  const category = getSearchParam(req, 'category');
  const search   = getSearchParam(req, 'q')?.toLowerCase();

  let filtered = [...products];

  if (category && category !== 'all') {
    filtered = filtered.filter((p) => p.category === category);
  }

  if (search) {
    filtered = filtered.filter(
      (p) =>
        p.name.toLowerCase().includes(search) ||
        p.description.toLowerCase().includes(search)
    );
  }

  const payload: ProductListResponse = {
    products: filtered,
    total:    filtered.length,
  };

  return ok(payload);
}
