import { NextRequest, NextResponse } from 'next/server';
import { proxyGet } from '@/utils/backendProxy';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status');
    let path = '/events';
    if (status) path += `?status=${encodeURIComponent(status)}`;
    const backendRes = await proxyGet(req, path);
    return backendRes;
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to fetch events';
    console.error('[/api/events] Error:', message);
    return NextResponse.json(
      { success: false, message: 'Unable to fetch events', data: null, errors: [message], fieldErrors: {} },
      { status: 500 }
    );
  }
}
