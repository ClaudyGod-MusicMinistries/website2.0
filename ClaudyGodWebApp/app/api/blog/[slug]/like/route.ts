import { type NextRequest } from 'next/server';
import { proxyGet, proxyPost, proxyDelete } from '@/lib/data/backendProxy';

export const dynamic = 'force-dynamic';

// Same [slug]-segment-reuse note as ../comments/route.ts — this is always
// called with the post's real GUID id.
export async function GET(req: NextRequest, { params }: { params: { slug: string } }) {
  const postId = params.slug;
  return proxyGet(req, `/blog/${postId}/likes`);
}

export async function POST(req: NextRequest, { params }: { params: { slug: string } }) {
  const postId = params.slug;
  return proxyPost(req, `/blog/${postId}/like`);
}

export async function DELETE(req: NextRequest, { params }: { params: { slug: string } }) {
  const postId = params.slug;
  // proxyDelete doesn't auto-forward the request's own query string the way
  // proxyGet does (see backendProxy.ts) — CGM-Backend's unlike endpoint reads
  // visitorToken from the query string, so it's appended explicitly here.
  const visitorToken = req.nextUrl.searchParams.get('visitorToken') ?? '';
  return proxyDelete(req, `/blog/${postId}/like?visitorToken=${encodeURIComponent(visitorToken)}`);
}
