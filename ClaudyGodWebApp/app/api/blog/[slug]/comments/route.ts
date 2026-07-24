import { type NextRequest } from 'next/server';
import { proxyGet, proxyPost } from '@/lib/data/backendProxy';

export const dynamic = 'force-dynamic';

// Nested under the existing [slug] segment (Next.js requires sibling dynamic
// routes at the same directory level to share one segment name) — but the
// client always calls this with the post's real GUID id, never its slug,
// since CGM-Backend's comment endpoints are id-scoped, not slug-scoped.
export async function GET(req: NextRequest, { params }: { params: { slug: string } }) {
  const postId = params.slug;
  return proxyGet(req, `/blog/${postId}/comments`);
}

export async function POST(req: NextRequest, { params }: { params: { slug: string } }) {
  const postId = params.slug;
  return proxyPost(req, `/blog/${postId}/comments`);
}
