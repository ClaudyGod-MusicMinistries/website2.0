import { randomBytes } from 'crypto';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { SITE_URL } from '@/lib/config/site';
import { orderItemSchema, priceOrder } from '@/lib/commerce/pricing';
import { guardPublicMutation } from '@/lib/security/request';

const schema = z.object({
  email: z.string().email().max(254),
  items: z.array(orderItemSchema).min(1).max(50),
  shippingMethod: z.enum(['standard', 'express']),
});

export async function POST(req: NextRequest) {
  try {
    const denied = guardPublicMutation(req, 'store-payment-initialize', {
      limit: 6,
      windowMs: 60_000,
    });
    if (denied) return denied;

    const input = schema.parse(await req.json());
    const priced = await priceOrder(input.items, input.shippingMethod);
    const secretKey = process.env.PAYSTACK_SECRET_KEY;
    if (!secretKey) {
      return NextResponse.json(
        { success: false, message: 'Payment service is not configured.' },
        { status: 503 }
      );
    }

    const reference = `CGM-ORDER-${randomBytes(12).toString('hex').toUpperCase()}`;
    const response = await fetch('https://api.paystack.co/transaction/initialize', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${secretKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: input.email,
        amount: Math.round(priced.total * 100),
        currency: priced.currency,
        reference,
        callback_url: `${SITE_URL}/store/checkout/complete`,
        metadata: { purpose: 'store_order' },
      }),
    });
    const payload = await response.json();
    if (!response.ok || !payload.status) {
      return NextResponse.json(
        { success: false, message: 'Unable to start secure payment.' },
        { status: 502 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Payment initialized.',
      data: {
        reference: payload.data.reference,
        authorizationUrl: payload.data.authorization_url,
        total: priced.total,
        currency: priced.currency,
      },
      errors: [],
      fieldErrors: {},
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, message: 'Invalid order details.' },
        { status: 422 }
      );
    }
    console.error('[store/payment/initialize]', error);
    return NextResponse.json(
      { success: false, message: 'Unable to initialize payment.' },
      { status: 503 }
    );
  }
}
