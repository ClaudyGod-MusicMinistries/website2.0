import { NextRequest, NextResponse } from 'next/server';
import { proxyGet } from '@/utils/backendProxy';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const page = searchParams.get('page') || '1';
    const pageSize = searchParams.get('pageSize') || '10';
    const path = `/blog?page=${page}&pageSize=${pageSize}`;
    const backendRes = await proxyGet(req, path);
    return backendRes;
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to fetch blog posts';
    console.error('[/api/blog] Error:', message);
    return NextResponse.json(
      { success: false, message: 'Unable to fetch blog posts', data: null, errors: [message], fieldErrors: {} },
      { status: 500 }
    );
  }
}
