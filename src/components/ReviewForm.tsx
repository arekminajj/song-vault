"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { StarRating } from "./StarRating";

export default function ReviewForm({ mediaId }: { mediaId: string }) {
  const router = useRouter();
  const [content, setContent] = useState("");
  const [starsNum, setStarsNum] = useState(4);
  const [loading, setLoading] = useState(false);

  const maxLen = 500;
  const remaining = useMemo(() => maxLen - content.length, [content.length]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/api/review", {
      method: "POST",
      body: JSON.stringify({ mediaId, content, starsNum }),
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      setContent("");
      router.refresh();
    } else {
      alert("Something went wrong");
    }
    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h2 className="text-base font-semibold">Write a review</h2>
          <p className="mt-1 text-xs text-gray-400">
            Rate the track and leave a short comment (optional).
          </p>
        </div>

        <div className="text-right">
          <p className="text-[11px] text-gray-400">Rating</p>
          <div className="mt-1">
            <StarRating value={starsNum} onChange={setStarsNum} />
          </div>
        </div>
      </div>

      <div className="mt-4">
        <div className="flex items-center justify-between">
          <label className="text-xs font-medium text-gray-300">Your text</label>
          <span
            className={`text-[11px] ${
              remaining < 0 ? "text-red-400" : "text-gray-500"
            }`}
          >
            {remaining} left
          </span>
        </div>

        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value.slice(0, maxLen))}
          placeholder="What did you like? How does it compare to similar tracks?"
          className="mt-2 w-full resize-none rounded-2xl border border-white/10 bg-black/25 p-4 text-sm text-white placeholder:text-gray-500 outline-none focus:border-white/20 focus:ring-2 focus:ring-white/10"
          rows={5}
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="
    mt-4 inline-flex w-full items-center justify-center gap-2
    rounded-full bg-white py-3 font-semibold text-black
    cursor-pointer
    transition
    hover:opacity-95 hover:scale-[1.01]
    active:scale-[0.98]
    disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100
  "
      >
        {loading ? (
          <>
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-black/30 border-t-black" />
            Submitting...
          </>
        ) : (
          "Submit review"
        )}
      </button>
    </form>
  );
}
