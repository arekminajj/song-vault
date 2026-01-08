"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { StarRating } from "./StarRating";
import { Review } from "@/types/review";

interface Props {
  review: Review;
}

export default function UpdateReviewForm({ review }: Props) {
  const router = useRouter();
  const [content, setContent] = useState(review.content);
  const [starsNum, setStarsNum] = useState(review.starsNum);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`/api/review/${review.id}`, {
        method: "PUT",
        body: JSON.stringify({ content, starsNum }),
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to update review");
      }

      router.refresh();
      alert("Review updated successfully!");
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 bg-gray-900/50 p-6 rounded-xl border border-gray-800"
    >
      <div>
        <label className="block text-sm font-medium mb-2">Rating</label>
        <StarRating value={starsNum} onChange={setStarsNum} />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Review</label>
        <textarea
          value={content!}
          onChange={(e) => setContent(e.target.value)}
          className="w-full bg-black border border-gray-700 rounded-lg p-3 text-white"
          rows={4}
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-500 hover:bg-blue-600 text-black font-bold py-3 rounded-full disabled:opacity-50"
      >
        {loading ? "Updating..." : "Update Review"}
      </button>
    </form>
  );
}
