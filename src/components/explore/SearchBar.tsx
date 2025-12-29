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
      if (trimmed) {
        params.set("query", trimmed);
      } else {
        params.delete("query");
      }
      router.push(`${pathname}?${params.toString()}`);
    });
  };

  return (
    <form onSubmit={handleSubmit} className="relative max-w-2xl mx-auto">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search songs, artists, albums, playlists..."
        className="w-full rounded-full bg-white/10 px-6 py-4 text-base text-white placeholder-gray-400 backdrop-blur-md outline-none transition-all focus:ring-4 focus:ring-green-500/50 focus:bg-white/15"
        autoFocus
      />
      {isPending && (
        <div className="absolute right-6 top-1/2 -translate-y-1/2">
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
        </div>
      )}
      <button type="submit" hidden />
    </form>
  );
}
