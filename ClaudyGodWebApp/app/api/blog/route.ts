import { NextRequest, NextResponse } from 'next/server';
import { proxyGet } from '@/lib/data/backendProxy';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    // proxyGet already forwards this request's own query string
    // (page/pageSize) to the backend — see app/api/media/route.ts for why
    // building it again here and baking it into the path caused a
    // double-appended, malformed query string. This one had no `if` guard
    // (page/pageSize always had values), so it 400'd on every single
    // request — the Journal/Blog listing never worked in production.
    const backendRes = await proxyGet(req, '/blog');
    return backendRes;
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to fetch blog posts';
    console.error('[/api/blog] Error:', message);
    return NextResponse.json(
      {
        success: false,
        message: 'Unable to fetch blog posts',
        data: null,
        errors: [message],
        fieldErrors: {},
      },
      { status: 500 }
    );
  }
}
