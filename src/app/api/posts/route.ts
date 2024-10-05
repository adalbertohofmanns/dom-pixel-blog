import { NextResponse } from 'next/server';
import { IPost } from '@/types/post';

import { db } from '@/firebase';
import { collection, addDoc, getDocs } from 'firebase/firestore';

export async function GET() {
  const posts = await getDocs(collection(db, 'posts'));
  const postsData = posts.docs.map((doc) => doc.data());
  return NextResponse.json(postsData);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const newPost: IPost = body;

    await addDoc(collection(db, 'posts'), newPost);

    return NextResponse.json(newPost.id, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to save post', error }, { status: 500 });
  }
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
