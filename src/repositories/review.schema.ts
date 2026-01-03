import { z } from "zod";

export const CreateReviewSchema = z.object({
  userId: z.string().min(1, "Invalid user ID format"),
  mediaId: z.string().min(1, "Media ID is required"),
  content: z.string().max(1000, "Review is too long").nullable().optional(),
  starsNum: z.number().int().min(0).max(5, "Rating must be between 0 and 5"),
});

export type CreateReviewInput = z.infer<typeof CreateReviewSchema>;
