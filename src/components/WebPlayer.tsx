"use client";

import { useState, useEffect } from "react";
import { Session } from "next-auth";
import {
  getUserPlaybackState,
  skipToNextTrack,
  skipToPreviousTrack,
  pausePlayback,
  startResumePlayback,
} from "@/lib/spotify/player";
import { PlaybackState, Track, Episode } from "@spotify/web-api-ts-sdk";

export default function WebPlayer({ session }: { session: Session }) {
  const [playbackState, setPlaybackState] = useState<PlaybackState | null>(
    null
  );
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const token = session.accessToken;

  useEffect(() => {
    const fetchStatus = async () => {
      const data = await getUserPlaybackState(token!);
      setPlaybackState(data);
      setIsPlaying(data.is_playing ?? false);
    };

    fetchStatus();
    const interval = setInterval(fetchStatus, 5000);
    return () => clearInterval(interval);
  }, [token]);

  if (!playbackState || !playbackState.item) return <div>No media playing</div>;

  const isTrack = playbackState.item.type === "track";
  const item = playbackState.item;
  const subText = isTrack
    ? (item as Track).artists.map((a) => a.name).join(", ")
    : (item as Episode).show.name;

  return (
    <div className="flex items-center justify-between w-full max-w-md gap-4 p-3 bg-black border border-zinc-800 text-white rounded-2xl shadow-xl">
      <div className="flex items-center gap-3 min-w-0 flex-1">
        <img
          src={(item as Track).album.images[0].url}
          alt={item.name}
          className="w-12 h-12 rounded-md object-cover flex-shrink-0 shadow-md"
        />
        <div className="flex flex-col min-w-0">
          <span className="font-semibold text-sm truncate">{item.name}</span>
          <span className="text-[11px] text-zinc-400 truncate uppercase tracking-wider font-medium">
            {subText}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-4 pr-2">
        <button
          onClick={() => skipToPreviousTrack(token!)}
          className="text-zinc-400 hover:text-white transition-colors"
          aria-label="Previous"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M6 6h2v12H6zm3.5 6 8.5 6V6z" />
          </svg>
        </button>

        <button
          onClick={() =>
            isPlaying ? pausePlayback(token!) : startResumePlayback(token!)
          }
          className="group flex items-center justify-center w-10 h-10 bg-white text-black rounded-full hover:scale-105 active:scale-95 transition-all shadow-[0_0_15px_rgba(255,255,255,0.1)]"
        >
          {isPlaying ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
            </svg>
          ) : (
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="ml-0.5"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>

        <button
          onClick={() => skipToNextTrack(token!)}
          className="text-zinc-400 hover:text-white transition-colors"
          aria-label="Next"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="m6 18 8.5-6L6 6v12zM16 6v12h2V6h-2z" />
          </svg>
        </button>
      </div>
    </div>
  );
}
