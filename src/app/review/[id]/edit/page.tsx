import { auth } from "@/auth";
import { getReviewById } from "@/repositories/review.repository";
import UpdateReviewForm from "@/components/UpdateReviewForm";
import { Review } from "@/types/review";

interface Props {
  params: { id: string };
}

export default async function EditReviewPage({ params }: Props) {
  const reviewId = await params.id;

  const session = await auth();

  if (!session)
    return <div className="p-8 text-center text-gray-400">Login required</div>;

  const review: Review | null = await getReviewById(Number(reviewId));

  if (!review) {
    return (
      <div className="p-8 text-center text-gray-400">Review does not exist</div>
    );
  }

  return <UpdateReviewForm review={review} />;
}
