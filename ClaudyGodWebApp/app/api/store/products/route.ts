import { NextRequest, NextResponse } from 'next/server';
import { proxyGet } from '@/lib/data/backendProxy';

export async function GET(req: NextRequest) {
  try {
    // proxyGet already forwards this request's own query string
    // (category=...) to the backend — see app/api/media/route.ts for why
    // building it again here and baking it into the path caused a
    // double-appended, malformed query string and a 400.
    const backendRes = await proxyGet(req, '/store/products');
    return backendRes;
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to fetch products';
    console.error('[/api/store/products] Error:', message);
    return NextResponse.json(
      {
        success: false,
        message: 'Unable to fetch products',
        data: null,
        errors: [message],
        fieldErrors: {},
      },
      { status: 500 }
    );
  }
}
