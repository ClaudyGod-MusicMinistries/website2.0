import { NextRequest, NextResponse } from 'next/server';
import { proxyGet } from '@/lib/data/backendProxy';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    // proxyGet already forwards this request's own query string (type=...)
    // to the backend — building it again here and passing '/media?type=...'
    // as the path caused proxyGet to append it a *second* time, sending the
    // backend a malformed '?type=video?type=video' that failed enum parsing
    // with a 400. Just pass the clean base path.
    const backendRes = await proxyGet(req, '/media');
    return backendRes;
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to fetch media';
    console.error('[/api/media] Error:', message);
    return NextResponse.json(
      {
        success: false,
        message: 'Unable to fetch media',
        data: null,
        errors: [message],
        fieldErrors: {},
      },
      { status: 500 }
    );
  }
}
