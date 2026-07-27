import { NextRequest, NextResponse } from 'next/server';
import { proxyGet } from '@/lib/data/backendProxy';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const backendRes = await proxyGet(req, '/reels');
    return backendRes;
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to fetch reels';
    console.error('[/api/reels] Error:', message);
    return NextResponse.json(
      {
        success: false,
        message: 'Unable to fetch reels',
        data: null,
        errors: [message],
        fieldErrors: {},
      },
      { status: 500 }
    );
  }
}
