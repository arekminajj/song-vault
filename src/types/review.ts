export interface Review {
  id: number;
  userId: string;
  mediaId: string;
  content: string | null;
  starsNum: number;
  createdAt: Date;
}
