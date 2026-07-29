import { type NextRequest } from 'next/server';
import { proxyGet } from '@/lib/data/backendProxy';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return proxyGet(req, `/blog/${encodeURIComponent(slug)}`);
}
