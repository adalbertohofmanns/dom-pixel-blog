import { NextResponse } from 'next/server';
import { mockPosts } from '@/data/mockPosts';
import { IPost } from '@/types/post';

let posts = [...mockPosts];

export async function GET() {
  posts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return NextResponse.json(mockPosts);
}

export async function POST(request: Request) {
  const body = await request.json(); 

  if (!body.title || !body.body || !body.image) {
    return NextResponse.json({ message: "Todos os campos são obrigatórios" }, { status: 400 });
  }

  const newPost: IPost = body;

  posts.push(newPost);

  return NextResponse.json(newPost, { status: 201 });
}

export async function PUT(request: Request) {
  const updatedPost = await request.json();
  return NextResponse.json(updatedPost);
}

export async function DELETE(request: Request) {
  const { id } = await request.json();
  return NextResponse.json({ id });
}

export async function PATCH(request: Request) {
  const updatedPost = await request.json();
  return NextResponse.json(updatedPost);
}
