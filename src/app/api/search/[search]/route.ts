import { NextResponse } from 'next/server';
import { db } from '@/firebase';
import { collection, getDocs, query, where, or } from 'firebase/firestore';

export async function GET(request: Request, { params }: { params: { search: string } }) {
  const { search } = params;

  console.log('search:', search);
  
  try {
    const q = query(
      collection(db, "posts"),
      or(where("title", "==", search), where("body", "==", search))
    );

    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return NextResponse.json({ message: "Nenhum post encontrado" }, { status: 404 });
    }

    const posts = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return NextResponse.json(posts, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Erro ao buscar posts" }, { status: 500 });
  }
}