import { type NextRequest } from 'next/server';
import { proxyPost } from '@/utils/backendProxy';

// Forwards ticket reservation to the .NET backend: POST /api/v1.0/tickets
export async function POST(req: NextRequest) {
  return proxyPost(req, '/tickets');
}
