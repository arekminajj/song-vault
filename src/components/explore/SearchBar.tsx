"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";

export default function SearchBar({ initialQuery }: { initialQuery: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [value, setValue] = useState(initialQuery);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = value.trim();

    startTransition(() => {
      const params = new URLSearchParams(searchParams);
      if (trimmed) params.set("query", trimmed);
      else params.delete("query");
      router.push(`${pathname}?${params.toString()}`);
    });
  };

  return (
    <form onSubmit={handleSubmit} className="mx-auto w-full max-w-3xl">
      <div className="relative">
        <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/50">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M10 18a8 8 0 1 1 5.293-14.01A8 8 0 0 1 10 18Zm0-14a6 6 0 1 0 .001 12.001A6 6 0 0 0 10 4Zm9.707 16.293-4.2-4.2 1.414-1.414 4.2 4.2-1.414 1.414Z" />
          </svg>
        </div>

        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Search songs, artists, albums..."
          className="w-full rounded-2xl border border-white/10 bg-white/5 pl-11 pr-28 py-3.5 sm:py-4 text-base text-white placeholder-white/40 backdrop-blur-md outline-none transition
                     focus:border-[#1DB954]/40 focus:ring-4 focus:ring-[#1DB954]/15"
          autoFocus
        />

        {isPending && (
          <div className="absolute right-24 top-1/2 -translate-y-1/2">
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/70 border-t-transparent" />
          </div>
        )}

        <button
          type="submit"
          className="hidden sm:flex absolute right-2 top-1/2 -translate-y-1/2 items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold
                     bg-white text-black hover:opacity-95 active:scale-[0.98] transition"
        >
          Search
        </button>
      </div>

      <p className="mt-2 text-xs text-white/40 pl-1">
        Tip: Enter to search • Try: “Daft Punk”, “Kanye”, “Random Access
        Memories”
      </p>
    </form>
  );
}
