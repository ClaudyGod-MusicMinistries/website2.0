import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const reference = req.nextUrl.searchParams.get('reference');

  if (!reference) {
    return NextResponse.json(
      { success: false, message: 'reference is required' },
      { status: 400 },
    );
  }

  const secretKey = process.env.PAYSTACK_SECRET_KEY;
  if (!secretKey) {
    return NextResponse.json(
      { success: false, message: 'Payment service not configured' },
      { status: 503 },
    );
  }

  try {
    const paystackRes = await fetch(
      `https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`,
      { headers: { Authorization: `Bearer ${secretKey}` } },
    );

    const data = await paystackRes.json();

    if (!data.status) {
      return NextResponse.json(
        { success: false, message: data.message ?? 'Verification failed' },
        { status: 400 },
      );
    }

    const tx = data.data;
    return NextResponse.json({
      success:   true,
      status:    tx.status,       // 'success' | 'failed' | 'abandoned'
      reference: tx.reference,
      amount:    tx.amount / 100, // kobo → naira/dollars
      currency:  tx.currency,
      email:     tx.customer?.email ?? '',
      paidAt:    tx.paid_at ?? null,
    });
  } catch (err) {
    console.error('[payments/verify]', err);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 },
    );
  }
}
