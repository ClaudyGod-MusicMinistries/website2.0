import { z } from 'zod';
import type { StoreProduct } from '@/lib/data/types';
import { getBackendServiceHeaders, getBackendUrl } from '@/lib/data/backendConfig';

export const shippingPrices = {
  standard: 9.99,
  express: 19.99,
} as const;

export const orderItemSchema = z.object({
  id: z.string().min(1).max(100),
  quantity: z.number().int().min(1).max(20),
});

type ProductEnvelope = {
  data?: StoreProduct[] | { items?: StoreProduct[] };
  items?: StoreProduct[];
};

function extractProducts(payload: ProductEnvelope): StoreProduct[] {
  if (Array.isArray(payload.data)) return payload.data;
  if (payload.data && Array.isArray(payload.data.items)) return payload.data.items;
  if (Array.isArray(payload.items)) return payload.items;
  return [];
}

export async function priceOrder(
  items: z.infer<typeof orderItemSchema>[],
  shippingMethod: keyof typeof shippingPrices
) {
  const response = await fetch(getBackendUrl('/store/products'), {
    headers: { Accept: 'application/json', ...getBackendServiceHeaders() },
    cache: 'no-store',
    signal: AbortSignal.timeout(15_000),
  });
  if (!response.ok) throw new Error('Unable to verify current product prices');

  const products = extractProducts((await response.json()) as ProductEnvelope);
  const byId = new Map(products.map((product) => [product.id, product]));
  const lineItems = items.map(({ id, quantity }) => {
    const product = byId.get(id);
    if (!product || !product.inStock) throw new Error('One or more products are unavailable');
    return { product, quantity, lineTotal: product.price * quantity };
  });
  const subtotal = lineItems.reduce((sum, item) => sum + item.lineTotal, 0);
  const shippingCost = shippingPrices[shippingMethod];
  const total = Math.round((subtotal + shippingCost) * 100) / 100;

  return { lineItems, subtotal, shippingCost, total, currency: 'USD' as const };
}
