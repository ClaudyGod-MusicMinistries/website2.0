import { type NextRequest } from 'next/server';
import { proxyGet } from '@/utils/backendProxy';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  return proxyGet(req, '/events');
}
