import "server-only";
import prisma from "@/lib/prisma";
import {
  CreateCommentSchema,
  CreateCommentInput,
} from "../validation/comment.schema";

export async function getComments(
  mediaId: string,
  limit = 20,
  offset = 0
) {
  return prisma.comment.findMany({
    where: { mediaId },
    orderBy: { createdAt: "desc" },
    skip: offset,
    take: limit,
  });
}

export async function createComment(rawData: CreateCommentInput) {
  const validatedData = CreateCommentSchema.parse(rawData);

  return await prisma.comment.create({
    data: {
      userId: validatedData.userId,
      mediaId: validatedData.mediaId,
      content: validatedData.content,
      userName: validatedData.userName,
      userProfilePictureUrl: validatedData.userProfilePictureUrl,
      createdAt: new Date(),
    },
  });
}
