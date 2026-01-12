import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { createComment, getComments } from "@/repositories/comment.repository";

import { z } from "zod";

export const GetCommentsParams = z.object({
  mediaId: z.string().describe("Id of the media"),
  limit: z.number().describe("Reponse array limit"),
  offset: z.number().describe("Response array offset"),
});

/**
 * Get comments
 * @description Fetches comments
 * @pathParams GetCommentsParams
 * @openapi
 */

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const mediaId = searchParams.get("mediaId");
  const limit = Number(searchParams.get("limit")) || 20;
  const offset = Number(searchParams.get("offset")) || 0;

  if (!mediaId) {
    return NextResponse.json({ error: "mediaId is required" }, { status: 400 });
  }

  const comments = await getComments(mediaId, limit, offset);
  return NextResponse.json(comments);
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await req.json();
    const review = await createComment({
      ...body,
      userId: session.user.id,
    });

    return NextResponse.json(review);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create review" },
      { status: 500 },
    );
  }
}
