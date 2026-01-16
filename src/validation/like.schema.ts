import { z } from "zod";

export const CreateLikeSchema = z.object({
  userId: z.string().min(1, "Invalid user ID format"),
  mediaId: z.string().min(1, "Media ID is required"),
});

export type CreateLikeInput = z.infer<typeof CreateLikeSchema>;

export const RemoveLikeSchema = z.object({
  userId: z.string().min(1, "Invalid user ID format"),
  mediaId: z.string().min(1, "Media ID is required"),
});

export type RemoveLikeInput = z.infer<typeof RemoveLikeSchema>;
