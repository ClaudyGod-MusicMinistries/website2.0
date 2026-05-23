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
  const ts   = Date.now().toString(36).toUpperCase();
  const rand = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `CGM-${ts}-${rand}`;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = schema.parse(body);

    const orderId = generateOrderId();

    // TODO: persist order to database
    // TODO: trigger confirmation email via SendGrid / Resend
    // TODO: verify Paystack payment ref if paymentMethod === 'paystack'

    return NextResponse.json(
      {
        success: true,
        orderId,
        message: 'Order received successfully',
        estimatedDelivery: data.shippingMethod === 'express' ? '3-5 business days' : '7-14 business days',
      },
      { status: 201 }
    );
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ success: false, errors: err.issues }, { status: 422 });
    }
    return NextResponse.json({ success: false, message: 'Internal error' }, { status: 500 });
  }
}
