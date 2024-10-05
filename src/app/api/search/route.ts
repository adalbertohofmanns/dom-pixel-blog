import { mockPosts } from '@/data/mockPosts';
import { NextResponse } from 'next/server';

export async function GET(request: Request, { params }: { params: { query: string } }) {
  const { query } = params;

  const post = mockPosts.find((p) => p.title === query);

  if (!post) {
    return NextResponse.json({ message: "Post não encontrado" }, { status: 404 });
  }

  return NextResponse.json(post);
}