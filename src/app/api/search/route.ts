import { collection, getDocs } from "firebase/firestore";
import { db } from '@/firebase';
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const searchTerm = searchParams.get('q');

  const posts = await getDocs(collection(db, 'posts'));
  const postsData = posts.docs.map((doc) => doc.data());

  if (!searchTerm) {
    return NextResponse.json({ message: 'Missing search term' }, { status: 400 });
  }

  const filteredPosts = postsData.filter((post) => post.title.toLowerCase().includes(searchTerm.toLowerCase()));


  return NextResponse.json(filteredPosts);
}