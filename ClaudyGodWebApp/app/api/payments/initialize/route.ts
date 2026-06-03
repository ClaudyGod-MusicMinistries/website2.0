import { randomBytes } from 'crypto';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, amount, name, message, currency = 'NGN' } = body;

    if (!email || !amount || !name) {
      return NextResponse.json(
        {
          success: false,
          message: 'Email, amount, and name are required',
          data: null,
          errors: ['email, amount, and name are required'],
          fieldErrors: {},
        },
        { status: 400 },
      );
    }

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
        { status: 503 },
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
          custom_fields: [
            { display_name: 'Donor Name', variable_name: 'donor_name', value: name },
            ...(message
              ? [{ display_name: 'Message', variable_name: 'message', value: message }]
              : []),
          ],
        },
        callback_url: `${process.env.NEXT_PUBLIC_SITE_URL ?? 'https://claudygod.com'}/donate/success`,
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
        { status: 502 },
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
        { status: 504 },
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
      { status: 500 },
    );
  }
}
