import { randomBytes } from 'crypto';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const lineItemSchema = z.object({
  id:       z.string(),
  name:     z.string(),
  price:    z.number().positive(),
  quantity: z.number().int().positive(),
  image:    z.string(),
  category: z.string(),
  description: z.string(),
});

const shippingSchema = z.object({
  fullName:   z.string().min(2).max(100),
  email:      z.string().email(),
  phone:      z.string().min(6).max(20),
  address:    z.string().min(4).max(200),
  city:       z.string().min(2).max(80),
  state:      z.string().min(2).max(80),
  country:    z.string().min(2).max(60),
  postalCode: z.string().optional(),
});

const schema = z.object({
  items:          z.array(lineItemSchema).min(1),
  shipping:       shippingSchema,
  shippingMethod: z.enum(['standard', 'express']),
  paymentMethod:  z.enum(['paystack', 'card', 'bank_transfer', 'paypal']),
  subtotal:       z.number().positive(),
  shippingCost:   z.number().min(0),
  total:          z.number().positive(),
  currency:       z.string().default('USD'),
  paystackRef:    z.string().optional(), // populated after Paystack callback
});

function generateOrderId(): string {
  return `CGM-${randomBytes(8).toString('hex').toUpperCase()}`;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = schema.parse(body);

    const orderId = generateOrderId();

    // Verify Paystack payment before acknowledging the order
    if (data.paymentMethod === 'paystack' && data.paystackRef) {
      const secretKey = process.env.PAYSTACK_SECRET_KEY;
      if (!secretKey) {
        return NextResponse.json(
          { success: false, message: 'Payment service not configured' },
          { status: 503 },
        );
      }

      const verifyRes = await fetch(
        `https://api.paystack.co/transaction/verify/${encodeURIComponent(data.paystackRef)}`,
        { headers: { Authorization: `Bearer ${secretKey}` } },
      );
      const verifyData = await verifyRes.json();

      if (!verifyData.status || verifyData.data?.status !== 'success') {
        return NextResponse.json(
          { success: false, message: 'Payment verification failed. Please contact support.' },
          { status: 402 },
        );
      }

      const paidAmount = verifyData.data.amount / 100;
      if (Math.abs(paidAmount - data.total) > 0.01) {
        console.error(`[checkout] Amount mismatch: paid ${paidAmount}, expected ${data.total}`);
        return NextResponse.json(
          { success: false, message: 'Payment amount does not match order total.' },
          { status: 400 },
        );
      }
    }

    return NextResponse.json(
      {
        success: true,
        orderId,
        message: 'Order received successfully',
        estimatedDelivery: data.shippingMethod === 'express' ? '3-5 business days' : '7-14 business days',
      },
      { status: 201 },
    );
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, message: 'Invalid order data', errors: err.issues },
        { status: 422 },
      );
    }
    console.error('[store/checkout]', err);
    return NextResponse.json({ success: false, message: 'Internal error' }, { status: 500 });
  }
}
