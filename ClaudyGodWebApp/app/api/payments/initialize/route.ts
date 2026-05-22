import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, amount, name, message, currency = 'NGN' } = body;

    if (!email || !amount || !name) {
      return NextResponse.json({ error: 'email, amount, and name are required' }, { status: 400 });
    }

    const secretKey = process.env.PAYSTACK_SECRET_KEY;
    if (!secretKey) {
      return NextResponse.json({ error: 'Payment service not configured' }, { status: 503 });
    }

    const reference = `CGM-${Date.now()}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;

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
            ...(message ? [{ display_name: 'Message', variable_name: 'message', value: message }] : []),
          ],
        },
        callback_url: `${process.env.NEXT_PUBLIC_SITE_URL ?? 'https://claudygod.com'}/donate/success`,
      }),
    });

    const data = await paystackRes.json();

    if (!data.status) {
      return NextResponse.json({ error: data.message ?? 'Initialization failed' }, { status: 500 });
    }

    return NextResponse.json({ reference: data.data.reference, authorizationUrl: data.data.authorization_url });
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
