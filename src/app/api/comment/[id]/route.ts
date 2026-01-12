import { NextResponse } from "next/server";
import { auth } from "@/auth";
import {
  getCommentById,
  updateComment,
  deleteComment
} from "@/repositories/comment.repository";
import type { UpdateCommentInput } from "@/validation/comment.schema";

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  const id = Number(params.id);
  if (isNaN(id)) return NextResponse.json({ error: "Invalid ID" }, { status: 400 });

  const comment = await getCommentById(id);
  if (!comment) return NextResponse.json({ error: "Not Found" }, { status: 404 });

  return NextResponse.json(comment);
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } },
) {
  const session = await auth();
  if (!session?.user?.id)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const id = Number(params.id);
  const comment = await getCommentById(id);

  if (!comment)
    return NextResponse.json({ error: "Not Found" }, { status: 404 });

  if (comment.userId !== session.user.id)
    return NextResponse.json(
      { error: "User is unauthorized to edit this comment" },
      { status: 403 }
    );

  const body: UpdateCommentInput = await request.json();
  const updated = await updateComment(id, body);

  return NextResponse.json(updated);
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } },
) {
  const session = await auth();
  if (!session?.user?.id)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const id = Number(params.id);
  const comment = await getCommentById(id);

  if (!comment)
    return NextResponse.json({ error: "Not Found" }, { status: 404 });

  if (comment.userId !== session.user.id)
    return NextResponse.json(
      { error: "User is unauthorized to delete this comment" },
      { status: 403 }
    );

  await deleteComment(id);
  return NextResponse.json({ success: true });
}
