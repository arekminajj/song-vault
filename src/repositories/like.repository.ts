import "server-only";
import prisma from "@/lib/prisma";
import { CreateLikeSchema, CreateLikeInput } from "@/validation/like.schema";

export async function getLikesCount(mediaId: string) {
  return prisma.like.count({
    where: { mediaId },
  });
}

export async function createLike(rawData: CreateLikeInput) {
  const validatedData = CreateLikeSchema.parse(rawData);
  return await prisma.like.create({
    data: {
      mediaId: validatedData.mediaId,
      userId: validatedData.userId,
      createdAt: new Date(),
    },
  });
}
