import { type NextRequest } from 'next/server';
import { proxyGet, proxyPost, proxyDelete } from '@/lib/data/backendProxy';

export const dynamic = 'force-dynamic';

// Same [slug]-segment-reuse note as ../comments/route.ts (Next.js requires
// sibling dynamic routes at one directory level to share a segment name) —
// this is always called with the post's real GUID id, never its slug.
export async function GET(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug: postId } = await params;
  return proxyGet(req, `/blog/${postId}/reactions`);
}

export async function POST(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug: postId } = await params;
  return proxyPost(req, `/blog/${postId}/reactions`);
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug: postId } = await params;
  // proxyDelete doesn't auto-forward the request's own query string the way
  // proxyGet does (see backendProxy.ts) — CGM-Backend's remove-reaction
  // endpoint reads visitorToken from the query string, so it's appended here.
  const visitorToken = req.nextUrl.searchParams.get('visitorToken') ?? '';
  return proxyDelete(
    req,
    `/blog/${postId}/reactions?visitorToken=${encodeURIComponent(visitorToken)}`
  );
}
