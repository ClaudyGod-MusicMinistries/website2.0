import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const reference = req.nextUrl.searchParams.get('reference');

  if (!reference) {
    return NextResponse.json({ error: 'reference is required' }, { status: 400 });
  }

  const secretKey = process.env.PAYSTACK_SECRET_KEY;
  if (!secretKey) {
    return NextResponse.json({ error: 'Payment service not configured' }, { status: 503 });
  }

  try {
    const paystackRes = await fetch(`https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`, {
      headers: { Authorization: `Bearer ${secretKey}` },
    });

    const data = await paystackRes.json();

    if (!data.status) {
      return NextResponse.json({ error: data.message ?? 'Verification failed' }, { status: 400 });
    }

    const tx = data.data;
    return NextResponse.json({
      status:    tx.status,          // 'success' | 'failed' | 'abandoned'
      reference: tx.reference,
      amount:    tx.amount / 100,    // back to full unit
      currency:  tx.currency,
      email:     tx.customer.email,
      paidAt:    tx.paid_at,
    });
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
