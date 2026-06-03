import { NextRequest, NextResponse } from 'next/server';
import { proxyGet } from '@/utils/backendProxy';

export async function GET(req: NextRequest) {
  try {
    const backendRes = await proxyGet(req, '/albums');
    return backendRes;
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to fetch albums';
    console.error('[/api/albums] Error:', message);
    return NextResponse.json(
      { success: false, message: 'Unable to fetch albums', data: null, errors: [message], fieldErrors: {} },
      { status: 500 }
    );
  }
}
