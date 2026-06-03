import { NextRequest, NextResponse } from 'next/server';
import { proxyGet } from '@/utils/backendProxy';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');
    let path = '/store';
    if (category) path += `?category=${encodeURIComponent(category)}`;
    const backendRes = await proxyGet(req, path);
    return backendRes;
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to fetch products';
    console.error('[/api/store/products] Error:', message);
    return NextResponse.json(
      { success: false, message: 'Unable to fetch products', data: null, errors: [message], fieldErrors: {} },
      { status: 500 }
    );
  }
}
