import { Review } from "@/types/review";
import { dateToString } from "@/utils/dateParser";

interface Props {
  review: Review;
}

function StarsInline({ value }: { value: number }) {
  return (
    <div className="flex items-center gap-1" aria-label={`Rating: ${value}/5`}>
      {[1, 2, 3, 4, 5].map((s) => (
        <svg
          key={s}
          viewBox="0 0 24 24"
          className={`h-4 w-4 ${
            s <= value ? "text-yellow-400" : "text-white/15"
          }`}
          fill="currentColor"
          role="img"
          aria-hidden="true"
        >
          <path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
      ))}
    </div>
  );
}

export default function ReviewCard({ review }: Props) {
  return (
    <section className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-xs text-gray-400">Your review</p>
          <p className="text-sm font-semibold text-white/90">
            Submitted {dateToString(review.createdAt)}
          </p>
        </div>

        <div className="flex flex-col items-end gap-1">
          <StarsInline value={review.starsNum} />
          <p className="text-[11px] text-gray-400">{review.starsNum}/5</p>
        </div>
      </div>

      <div className="mt-4 rounded-2xl border border-white/10 bg-black/20 p-4">
        {review.content?.trim() ? (
          <p className="text-sm leading-relaxed text-gray-200 whitespace-pre-wrap">
            {review.content}
          </p>
        ) : (
          <p className="text-sm text-gray-400 italic">No text — rating only.</p>
        )}
      </div>
    </section>
  );
}
