import { NextRequest, NextResponse } from 'next/server';
import { proxyGet } from '@/lib/data/backendProxy';

export async function GET(req: NextRequest) {
  try {
    // proxyGet already forwards this request's own query string (status=...)
    // to the backend — see app/api/media/route.ts for why building it again
    // here and baking it into the path caused a double-appended, malformed
    // query string and a 400 whenever `status` was actually passed.
    const backendRes = await proxyGet(req, '/events');
    return backendRes;
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to fetch events';
    console.error('[/api/events] Error:', message);
    return NextResponse.json(
      {
        success: false,
        message: 'Unable to fetch events',
        data: null,
        errors: [message],
        fieldErrors: {},
      },
      { status: 500 }
    );
  }
}
