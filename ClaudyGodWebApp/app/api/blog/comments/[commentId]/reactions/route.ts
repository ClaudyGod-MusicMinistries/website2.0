import { type NextRequest } from 'next/server';
import { proxyGet, proxyPost, proxyDelete } from '@/lib/data/backendProxy';

export const dynamic = 'force-dynamic';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ commentId: string }> }
) {
  const { commentId } = await params;
  return proxyGet(req, `/blog/comments/${encodeURIComponent(commentId)}/reactions`);
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ commentId: string }> }
) {
  const { commentId } = await params;
  return proxyPost(req, `/blog/comments/${encodeURIComponent(commentId)}/reactions`);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ commentId: string }> }
) {
  const { commentId } = await params;
  const visitorToken = req.nextUrl.searchParams.get('visitorToken') ?? '';
  return proxyDelete(
    req,
    `/blog/comments/${encodeURIComponent(commentId)}/reactions?visitorToken=${encodeURIComponent(visitorToken)}`
  );
}
