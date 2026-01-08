import { NextResponse } from "next/server";
import { auth } from "@/auth";
import type UpdateReviewDto from "@/types/dto/updateReviewDto";
import { getReviewById, updateReview } from "@/repositories/review.repository";

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  const body: UpdateReviewDto = await request.json();

  const session = await auth();
  if (!session?.user?.id)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const reviewId = Number(id);

  const review = await getReviewById(reviewId);
  if (session.user.id !== review?.userId)
    return NextResponse.json(
      { error: "User is unathorized to edit this review" },
      { status: 403 }
    );

  const updateResponse = await updateReview(reviewId, body);

  return NextResponse.json(updateResponse);
}
