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

    // Persist order to backend with proper error handling
    const apiBaseUrl = process.env.API_BASE_URL || 'http://api:8080';
    let backendOrderId: string | null = null;

    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 15000); // 15-second timeout

      const backendRes = await fetch(`${apiBaseUrl}/api/v1.0/store/checkout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: data.items,
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
          subtotal: data.subtotal,
          shippingCost: data.shippingCost,
          total: data.total,
          currency: data.currency,
          paystackRef: data.paystackRef,
        }),
        signal: controller.signal,
      });

      clearTimeout(timeout);

      if (!backendRes.ok) {
        const errorText = await backendRes.text();
        console.error(
          `[checkout] Backend returned ${backendRes.status}:`,
          errorText.slice(0, 200),
        );
        return NextResponse.json(
          {
            success: false,
            message: 'Failed to process order. Please contact support if this persists.',
          },
          { status: 503 },
        );
      }

      const backendData = await backendRes.json();
      backendOrderId = backendData.data?.id;

      if (!backendOrderId) {
        console.error('[checkout] Backend response missing order ID:', backendData);
        return NextResponse.json(
          { success: false, message: 'Order processing error. Please contact support.' },
          { status: 500 },
        );
      }
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : String(err);
      console.error('[checkout] Failed to persist order to backend:', errorMsg);

      if (errorMsg.includes('AbortError') || errorMsg.includes('timeout')) {
        return NextResponse.json(
          {
            success: false,
            message: 'The order is taking too long to process. Please try again or contact support.',
          },
          { status: 504 },
        );
      }

      return NextResponse.json(
        { success: false, message: 'Unable to save your order. Please try again.' },
        { status: 503 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        orderId: backendOrderId || orderId,
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
