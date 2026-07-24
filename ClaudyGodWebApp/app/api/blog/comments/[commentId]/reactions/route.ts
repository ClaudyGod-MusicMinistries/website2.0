import { type NextRequest } from 'next/server';
import { proxyGet, proxyPost, proxyDelete } from '@/lib/data/backendProxy';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest, { params }: { params: { commentId: string } }) {
  return proxyGet(req, `/blog/comments/${params.commentId}/reactions`);
}

export async function POST(req: NextRequest, { params }: { params: { commentId: string } }) {
  return proxyPost(req, `/blog/comments/${params.commentId}/reactions`);
}

export async function DELETE(req: NextRequest, { params }: { params: { commentId: string } }) {
  const visitorToken = req.nextUrl.searchParams.get('visitorToken') ?? '';
  return proxyDelete(
    req,
    `/blog/comments/${params.commentId}/reactions?visitorToken=${encodeURIComponent(visitorToken)}`
  );
}
