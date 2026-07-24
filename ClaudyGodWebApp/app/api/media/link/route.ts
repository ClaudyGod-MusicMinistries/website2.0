import { type NextRequest } from 'next/server';
import { proxyPost } from '@/lib/data/backendProxy';

// Admin/SuperAdmin-only on the backend (Bearer JWT + role check) — registers
// externally-hosted media (a YouTube link) with no file upload. See
// app/api/media/route.ts for the real-file-upload counterpart.
export async function POST(req: NextRequest) {
  return proxyPost(req, '/media/link');
}
