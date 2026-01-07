import { Review } from "@/types/review";
import { dateToString } from "@/utils/dateParser";

interface Props {
  review: Review;
}

export default function ReviewCard({ review }: Props) {
  return (
    <div className="flex flex-col gap-2">
      <p>{dateToString(review.createdAt)}</p>
      <p>Num of stars: {review.starsNum}</p>
      <p>content: {review.content}</p>
    </div>
  );
}
