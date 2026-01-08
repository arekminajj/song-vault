import "server-only";
import prisma from "@/lib/prisma";
import {
  CreateReviewSchema,
  CreateReviewInput,
  UpdateReviewSchema,
  UpdateReviewInput,
} from "../validation/review.schema";

export async function getAllReviews() {
  return await prisma.review.findMany({});
}

export async function getReviewById(id: number) {
  return await prisma.review.findUnique({
    where: { id },
  });
}

export async function getUserReviewForMedia(userId: string, mediaId: string) {
  return await prisma.review.findFirst({
    where: { userId: userId, mediaId: mediaId },
    orderBy: { createdAt: "desc" },
  });
}

export async function createReview(rawData: CreateReviewInput) {
  const validatedData = CreateReviewSchema.parse(rawData);

  return await prisma.review.create({
    data: {
      userId: validatedData.userId,
      mediaId: validatedData.mediaId,
      content: validatedData.content,
      starsNum: validatedData.starsNum,
      createdAt: new Date(),
    },
  });
}

export async function updateReview(
  reviewId: number,
  rawData: UpdateReviewInput
) {
  const validatedData = UpdateReviewSchema.parse(rawData);

  return await prisma.review.update({
    where: {
      id: reviewId,
    },
    data: {
      starsNum: validatedData.starsNum,
      content: validatedData.content,
    },
  });
}
