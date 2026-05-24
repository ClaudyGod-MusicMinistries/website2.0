import { type NextRequest } from 'next/server';
import { proxyPost } from '@/utils/backendProxy';

export async function POST(req: NextRequest) {
  return proxyPost(req, '/contacts');
}
