import { type NextRequest } from 'next/server';
import { proxyPost } from '@/lib/data/backendProxy';

export async function POST(req: NextRequest) {
  return proxyPost(req, '/subscribers');
}
