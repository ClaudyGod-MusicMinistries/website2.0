import { NextRequest, NextResponse } from 'next/server';
import { proxyGet } from '@/utils/backendProxy';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');

    let path = '/faqs';
    if (category) {
      path += `?category=${encodeURIComponent(category)}`;
    }

    const backendRes = await proxyGet(req, path);
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
