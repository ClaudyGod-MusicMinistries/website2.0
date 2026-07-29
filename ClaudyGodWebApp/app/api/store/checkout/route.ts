import { randomBytes } from 'crypto';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { guardPublicMutation } from '@/lib/security/request';
import { orderItemSchema, priceOrder, shippingPrices } from '@/lib/commerce/pricing';
import { getBackendServiceHeaders, getBackendUrl } from '@/lib/data/backendConfig';

const shippingSchema = z.object({
  fullName: z.string().min(2).max(100),
  email: z.string().email(),
  phone: z.string().min(6).max(20),
  address: z.string().min(4).max(200),
  city: z.string().min(2).max(80),
  state: z.string().min(2).max(80),
  country: z.string().min(2).max(60),
  postalCode: z.string().optional(),
});

const schema = z.object({
  items: z.array(orderItemSchema).min(1).max(50),
  shipping: shippingSchema,
  shippingMethod: z.enum(['standard', 'express']),
  paymentMethod: z.literal('paystack'),
  paystackRef: z.string().min(6).max(150),
});

function generateOrderId(): string {
  return `CGM-${randomBytes(8).toString('hex').toUpperCase()}`;
}

export async function POST(req: NextRequest) {
  try {
    const denied = guardPublicMutation(req, 'store-checkout', { limit: 6, windowMs: 60_000 });
    if (denied) return denied;
    const body = await req.json();
    const data = schema.parse(body);
    const priced = await priceOrder(data.items, data.shippingMethod);

    const orderId = generateOrderId();

    // Verify Paystack payment before acknowledging the order
    if (data.paymentMethod === 'paystack') {
      const secretKey = process.env.PAYSTACK_SECRET_KEY;
      if (!secretKey) {
        return NextResponse.json(
          { success: false, message: 'Payment service not configured' },
          { status: 503 }
        );
      }

      const verifyRes = await fetch(
        `https://api.paystack.co/transaction/verify/${encodeURIComponent(data.paystackRef)}`,
        { headers: { Authorization: `Bearer ${secretKey}` } }
      );
      const verifyData = await verifyRes.json();

      if (!verifyData.status || verifyData.data?.status !== 'success') {
        return NextResponse.json(
          { success: false, message: 'Payment verification failed. Please contact support.' },
          { status: 402 }
        );
      }
      if (
        !data.paystackRef.startsWith('CGM-ORDER-') ||
        verifyData.data?.metadata?.purpose !== 'store_order'
      ) {
        return NextResponse.json(
          { success: false, message: 'Payment reference is not valid for a store order.' },
          { status: 400 }
        );
      }

      const paidAmount = verifyData.data.amount / 100;
      if (
        Math.abs(paidAmount - priced.total) > 0.01 ||
        verifyData.data.currency !== priced.currency
      ) {
        console.error(`[checkout] Payment details do not match the server-calculated order`);
        return NextResponse.json(
          { success: false, message: 'Payment amount does not match order total.' },
          { status: 400 }
        );
      }
    }

    // Persist order to backend with proper error handling
    let backendOrderId: string | null = null;

    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 15000); // 15-second timeout

      const backendRes = await fetch(getBackendUrl('/store/checkout'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Idempotency-Key': data.paystackRef,
          ...getBackendServiceHeaders(),
        },
        body: JSON.stringify({
          items: priced.lineItems.map(({ product, quantity }) => ({
            id: product.id,
            name: product.title,
            price: product.price,
            quantity,
            image: product.image,
            category: product.category,
            description: product.description,
          })),
          shipping: {
            fullName: data.shipping.fullName,
            email: data.shipping.email,
            phone: data.shipping.phone,
            address: data.shipping.address,
            city: data.shipping.city,
            state: data.shipping.state,
            country: data.shipping.country,
            postalCode: data.shipping.postalCode,
          },
          shippingMethod: data.shippingMethod,
          paymentMethod: data.paymentMethod,
          subtotal: priced.subtotal,
          shippingCost: priced.shippingCost,
          total: priced.total,
          currency: priced.currency,
          paystackRef: data.paystackRef,
        }),
        signal: controller.signal,
      });

      clearTimeout(timeout);

      if (!backendRes.ok) {
        const errorText = await backendRes.text();
        console.error(`[checkout] Backend returned ${backendRes.status}:`, errorText.slice(0, 200));
        return NextResponse.json(
          {
            success: false,
            message: 'Failed to process order. Please contact support if this persists.',
          },
          { status: 503 }
        );
      }

      const backendData = await backendRes.json();
      backendOrderId = backendData.data?.id;

      if (!backendOrderId) {
        console.error('[checkout] Backend response missing order ID:', backendData);
        return NextResponse.json(
          { success: false, message: 'Order processing error. Please contact support.' },
          { status: 500 }
        );
      }
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : String(err);
      console.error('[checkout] Failed to persist order to backend:', errorMsg);

      if (errorMsg.includes('AbortError') || errorMsg.includes('timeout')) {
        return NextResponse.json(
          {
            success: false,
            message:
              'The order is taking too long to process. Please try again or contact support.',
          },
          { status: 504 }
        );
      }

      return NextResponse.json(
        { success: false, message: 'Unable to save your order. Please try again.' },
        { status: 503 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        orderId: backendOrderId || orderId,
        message: 'Order received successfully',
        estimatedDelivery:
          data.shippingMethod === 'express' ? '3-5 business days' : '7-14 business days',
      },
      { status: 201 }
    );
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, message: 'Invalid order data', errors: err.issues },
        { status: 422 }
      );
    }
    console.error('[store/checkout]', err);
    return NextResponse.json({ success: false, message: 'Internal error' }, { status: 500 });
  }
}
