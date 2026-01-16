import { z } from "zod";

export const CreateCommentSchema = z.object({
  userId: z.string().min(1, "Invalid user ID format"),
  userName: z.string().min(1, "Invalid user name format"),
  mediaId: z.string().min(1, "Media ID is required"),
  content: z
    .string()
    .min(1, "Comment cannot be empty")
    .max(1000, "Comment is too long"),
  userProfilePictureUrl: z.url().optional(),
});

export type CreateCommentInput = z.infer<typeof CreateCommentSchema>;

export const UpdateCommentSchema = z.object({
  content: z
    .string()
    .min(1, "Comment cannot be empty")
    .max(1000, "Comment is too long"),
});

export type UpdateCommentInput = z.infer<typeof UpdateCommentSchema>;

export const RemoveCommentSchema = z.object({
  userId: z.string().min(1, "Invalid user ID format"),
  mediaId: z.string().min(1, "Media ID is required"),
});

export type RemoveCommentInput = z.infer<typeof RemoveCommentSchema>;
