"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { StarRating } from "./StarRating";

export function ReviewForm({ mediaId }: { mediaId: string }) {
  const router = useRouter();
  const [content, setContent] = useState("");
  const [starsNum, setStarsNum] = useState(3);
  const [loading, setLoading] = useState(false);

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
      className="space-y-6 bg-gray-900/50 p-6 rounded-xl border border-gray-800"
    >
      <div>
        <label className="block text-sm font-medium mb-2">Rating</label>
        <StarRating value={starsNum} onChange={setStarsNum} />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Review</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full bg-black border border-gray-700 rounded-lg p-3 text-white"
          rows={4}
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-green-500 hover:bg-green-600 text-black font-bold py-3 rounded-full disabled:opacity-50"
      >
        {loading ? "Submitting..." : "Submit Review"}
      </button>
    </form>
  );
}
