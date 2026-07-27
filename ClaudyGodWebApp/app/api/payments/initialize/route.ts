import { randomBytes } from 'crypto';
import { NextRequest, NextResponse } from 'next/server';
import { SITE_URL } from '@/lib/config/site';
import { z } from 'zod';
import { guardPublicMutation } from '@/lib/security/request';

const schema = z.object({
  email: z.string().email().max(254),
  amount: z.number().finite().min(1).max(10_000_000),
  name: z.string().trim().min(2).max(100),
  message: z.string().trim().max(500).optional(),
  currency: z.enum(['NGN', 'USD', 'GBP', 'EUR', 'GHS', 'ZAR']).default('NGN'),
});

export async function POST(req: NextRequest) {
  try {
    const denied = guardPublicMutation(req, 'payment-initialize', { limit: 8, windowMs: 60_000 });
    if (denied) return denied;

    const { email, amount, name, message, currency } = schema.parse(await req.json());

    const secretKey = process.env.PAYSTACK_SECRET_KEY;
    if (!secretKey) {
      return NextResponse.json(
        {
          success: false,
          message: 'Payment service not configured',
          data: null,
          errors: ['Payment service not configured'],
          fieldErrors: {},
        },
        { status: 503 }
      );
    }

    const reference = `CGM-${randomBytes(12).toString('hex').toUpperCase()}`;

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000); // 15-second timeout

    const paystackRes = await fetch('https://api.paystack.co/transaction/initialize', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${secretKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        amount: Math.round(amount * 100), // kobo
        currency,
        reference,
        metadata: {
          purpose: 'donation',
          custom_fields: [
            { display_name: 'Donor Name', variable_name: 'donor_name', value: name },
            ...(message
              ? [{ display_name: 'Message', variable_name: 'message', value: message }]
              : []),
          ],
        },
        callback_url: `${SITE_URL}/donate/success`,
      }),
      signal: controller.signal,
    });

    clearTimeout(timeout);

    const data = await paystackRes.json();

    if (!data.status) {
      return NextResponse.json(
        {
          success: false,
          message: data.message ?? 'Payment initialization failed',
          data: null,
          errors: [data.message ?? 'Initialization failed'],
          fieldErrors: {},
        },
        { status: 502 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Payment initialization successful',
      data: {
        reference: data.data.reference,
        authorizationUrl: data.data.authorization_url,
      },
      errors: [],
      fieldErrors: {},
    });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, message: 'Invalid payment details.', errors: err.flatten().fieldErrors },
        { status: 422 }
      );
    }
    const errorMsg = err instanceof Error ? err.message : String(err);
    console.error('[payments/initialize]', errorMsg);

    if (errorMsg.includes('AbortError') || errorMsg.includes('timeout')) {
      return NextResponse.json(
        {
          success: false,
          message: 'Payment service is taking too long. Please try again.',
          data: null,
          errors: ['Timeout connecting to payment service'],
          fieldErrors: {},
        },
        { status: 504 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: 'Unable to initialize payment. Please try again.',
        data: null,
        errors: [errorMsg],
        fieldErrors: {},
      },
      { status: 500 }
    );
  }
}
