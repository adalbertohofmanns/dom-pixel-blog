import { NextResponse } from "next/server";
import { mockPosts } from "@/data/mockPosts";

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  const post = mockPosts.find((p) => p.id === id);

  if (!post) {
    return NextResponse.json({ message: "Post não encontrado" }, { status: 404 });
  }

  return NextResponse.json(post);
}