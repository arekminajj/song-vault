import { auth } from "@/auth";
import { getTrack } from "@/lib/spotify/spotify";
import { getUserReviewForMedia } from "@/repositories/review.repository";
import ReviewCard from "@/components/ReviewCard";
import ReviewForm from "@/components/ReviewForm";

interface Props {
  params: { id: string };
}

export default async function TrackPage({ params }: Props) {
  const session = await auth();
  if (!session)
    return <div className="p-8 text-center">Please login to review.</div>;

  const { id } = await params;
  const track = await getTrack(id);

  const review = await getUserReviewForMedia(session.user.id!, track.id);

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <div className="flex items-center gap-4 mb-8">
        <img
          src={track.album.images[0].url}
          className="w-24 h-24 rounded-lg"
          alt=""
        />
        <div>
          <h1 className="text-3xl font-bold">{track.name}</h1>
          <p className="text-gray-400">{track.artists[0].name}</p>
        </div>
      </div>

      {review ? <ReviewCard review={review} /> : <ReviewForm mediaId={id} />}
    </div>
  );
}
