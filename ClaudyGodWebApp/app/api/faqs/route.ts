import { NextRequest, NextResponse } from 'next/server';
import { proxyGet, proxyPost } from '@/lib/data/backendProxy';

export async function GET(req: NextRequest) {
  try {
    // proxyGet already forwards this request's own query string
    // (category=...) to the backend — see app/api/media/route.ts for why
    // building it again here and baking it into the path caused a
    // double-appended, malformed query string and a 400.
    const backendRes = await proxyGet(req, '/faqs');
    return backendRes;
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to fetch FAQs';
    console.error('[/api/faqs] Error:', message);

    return NextResponse.json(
      {
        success: false,
        message: 'Unable to fetch FAQs',
        data: null,
        errors: [message],
        fieldErrors: {},
      },
      { status: 500 }
    );
  }
}

// Admin/SuperAdmin-only on the backend (Bearer JWT + role check) — this proxy
// just forwards the request, the real authorization boundary stays server-side.
export async function POST(req: NextRequest) {
  return proxyPost(req, '/faqs');
}
