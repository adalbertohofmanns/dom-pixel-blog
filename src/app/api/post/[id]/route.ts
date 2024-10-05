import { NextResponse } from "next/server";

import { db } from '@/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';

export async function GET(request: Request, { params }: { params: { id: string } }) {

  console.log(request.url);

  const { id } = params;

  try {
    const postsRef = collection(db, 'posts');
    const q = query(postsRef, where('id', '==', id));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return NextResponse.json({ message: 'Post not found', status: 404 }, { status: 404 });
    }

    const postData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))[0];
    return NextResponse.json(postData, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching post', error }, { status: 500 });
  }
}