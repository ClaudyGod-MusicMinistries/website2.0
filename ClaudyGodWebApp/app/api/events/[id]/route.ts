import { type NextRequest } from 'next/server';
import { proxyGet } from '@/lib/data/backendProxy';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return proxyGet(req, `/events/${encodeURIComponent(id)}`);
}
