"use client";
import { useRouter } from "next/navigation";

export function RangeToggle({ currentRange }: { currentRange: string }) {
  const router = useRouter();

  const options = [
    { label: "4 Weeks", value: "short_term" },
    { label: "6 Months", value: "medium_term" },
    { label: "All Time", value: "long_term" },
  ];

  return (
    <div className="flex bg-white/5 p-1 rounded-full border border-white/10">
      {options.map((opt) => (
        <button
          key={opt.value}
          onClick={() => router.push(`?range=${opt.value}`)}
          className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
            currentRange === opt.value 
              ? "bg-[#1DB954] text-black" 
              : "text-gray-400 hover:text-white"
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}