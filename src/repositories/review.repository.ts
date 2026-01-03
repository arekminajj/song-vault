import "server-only";
import prisma from "@/lib/prisma";
import { CreateReviewSchema, CreateReviewInput } from "./review.schema";

export async function getAllReviews() {
  return await prisma.review.findMany({});
}

export async function getReviewById(id: number) {
  return await prisma.review.findUnique({
    where: { id },
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
