"use client";
import { useState } from "react";

interface StarRatingProps {
  value: number;
  onChange: (rating: number) => void;
}

export function StarRating({ value, onChange }: StarRatingProps) {
  const [hover, setHover] = useState<number | null>(null);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => {
          const active = star <= (hover ?? value);

          return (
            <button
              key={star}
              type="button"
              aria-label={`Rate ${star} star${star > 1 ? "s" : ""}`}
              onClick={() => onChange(star)}
              onMouseEnter={() => setHover(star)}
              onMouseLeave={() => setHover(null)}
              className="
                cursor-pointer
                rounded
                transition
                hover:scale-110
                active:scale-95
                focus:outline-none
                focus:ring-2
                focus:ring-white/20
              "
            >
              <StarIcon
                filled={active}
                className={
                  active
                    ? "text-yellow-400 drop-shadow-[0_0_6px_rgba(250,204,21,0.35)]"
                    : "text-white/20 hover:text-white/40"
                }
              />
            </button>
          );
        })}
      </div>

      <p className="text-[11px] text-gray-400">
        {hover ? `Rating: ${hover}/5` : `Selected: ${value}/5`}
      </p>
    </div>
  );
}

function StarIcon({
  filled,
  className,
}: {
  filled: boolean;
  className: string;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke="currentColor"
      fill={filled ? "currentColor" : "none"}
      className={`h-8 w-8 transition-colors ${className}`}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
      />
    </svg>
  );
}
