import assert from 'node:assert/strict';
import test from 'node:test';
import { priceOrder } from '../../lib/commerce/pricing';

test('priceOrder ignores all browser pricing and calculates from backend products', async (t) => {
  const originalFetch = global.fetch;
  const originalBase = process.env.API_BASE_URL;
  process.env.API_BASE_URL = 'https://backend.example';
  global.fetch = async () =>
    new Response(
      JSON.stringify({
        data: [
          {
            id: 'shirt',
            title: 'Shirt',
            description: 'Official shirt',
            price: 15,
            image: '/shirt.webp',
            category: 'clothing',
            inStock: true,
          },
        ],
      }),
      { status: 200, headers: { 'content-type': 'application/json' } }
    );
  t.after(() => {
    global.fetch = originalFetch;
    process.env.API_BASE_URL = originalBase;
  });

  const result = await priceOrder([{ id: 'shirt', quantity: 2 }], 'standard');
  assert.equal(result.subtotal, 30);
  assert.equal(result.shippingCost, 9.99);
  assert.equal(result.total, 39.99);
  assert.equal(result.currency, 'USD');
});

test('priceOrder rejects unavailable products', async (t) => {
  const originalFetch = global.fetch;
  const originalBase = process.env.API_BASE_URL;
  process.env.API_BASE_URL = 'https://backend.example';
  global.fetch = async () =>
    new Response(JSON.stringify({ data: [] }), {
      status: 200,
      headers: { 'content-type': 'application/json' },
    });
  t.after(() => {
    global.fetch = originalFetch;
    process.env.API_BASE_URL = originalBase;
  });

  await assert.rejects(() => priceOrder([{ id: 'missing', quantity: 1 }], 'express'));
});
