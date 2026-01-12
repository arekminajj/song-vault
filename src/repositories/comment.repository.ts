import "server-only";
import prisma from "@/lib/prisma";
import {
  CreateCommentSchema,
  CreateCommentInput,
  UpdateCommentSchema,
  UpdateCommentInput,
} from "../validation/comment.schema";

export async function getComments(mediaId: string, limit = 20, offset = 0) {
  return prisma.comment.findMany({
    where: { mediaId },
    orderBy: { createdAt: "desc" },
    skip: offset,
    take: limit,
  });
}

export async function getCommentById(id: number) {
  return prisma.comment.findUnique({
    where: { id },
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

export async function updateComment(
  commentId: number,
  rawData: UpdateCommentInput,
) {
  const validatedData = UpdateCommentSchema.parse(rawData);

  return await prisma.comment.update({
    where: {
      id: commentId,
    },
    data: {
      content: validatedData.content,
    },
  });
}

export async function deleteComment(id: number) {
  return await prisma.comment.delete({
    where: { id },
  });
}
