import { NextRequest, NextResponse } from 'next/server';
import { proxyGet } from '@/lib/data/backendProxy';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const type = searchParams.get('type');
    let path = '/media';
    if (type) path += `?type=${encodeURIComponent(type)}`;
    const backendRes = await proxyGet(req, path);
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
