import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { deleteLike } from "@/repositories/like.repository";

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } },
) {
  const session = await auth();
  if (!session?.user?.id)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const likeId = Number(params.id);
    if (isNaN(likeId)) {
      return NextResponse.json({ error: "Invalid like ID" }, { status: 400 });
    }

    await deleteLike(likeId);

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete like" },
      { status: 500 },
    );
  }
}
