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
    null,
  );
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const token = session.accessToken;

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const data = await getUserPlaybackState(token!);
        setPlaybackState(data);
        setIsPlaying(data?.is_playing ?? false);
      } catch {
        setPlaybackState(null);
        setIsPlaying(false);
      }
    };

    fetchStatus();
    const interval = setInterval(fetchStatus, 5000);
    return () => clearInterval(interval);
  }, [token]);

  const item = playbackState?.item ?? null;
  const isTrack = item?.type === "track";

  const title = item?.name ?? "Nothing is playing";
  const subText = !item
    ? "Start playback in Spotify (desktop/phone)"
    : isTrack
      ? (item as Track).artists.map((a) => a.name).join(", ")
      : (item as Episode).show.name;

  const imageUrl = !item
    ? null
    : isTrack
      ? ((item as Track).album.images?.[0]?.url ?? null)
      : ((item as Episode).images?.[0]?.url ?? null);

  return (
    <div className="w-full rounded-3xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0 flex-1">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={title}
              className="h-12 w-12 rounded-xl object-cover flex-shrink-0 shadow-md"
            />
          ) : (
            <div className="h-12 w-12 rounded-xl bg-white/10 flex-shrink-0 grid place-items-center">
              <span className="text-xs text-gray-300">♪</span>
            </div>
          )}

          <div className="min-w-0">
            <p className="text-xs text-gray-400">Now playing</p>
            <p className="font-semibold text-sm truncate">{title}</p>
            <p className="text-[11px] text-gray-400 truncate">{subText}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            disabled={!item}
            onClick={() => skipToPreviousTrack(token!)}
            className="h-9 w-9 grid place-items-center rounded-full border border-white/10 bg-white/[0.03] text-gray-200 hover:bg-white/[0.06] disabled:opacity-40 disabled:hover:bg-white/[0.03] transition"
            aria-label="Previous"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6 6h2v12H6zm3.5 6 8.5 6V6z" />
            </svg>
          </button>

          <button
            disabled={!item}
            onClick={() =>
              isPlaying ? pausePlayback(token!) : startResumePlayback(token!)
            }
            className="h-9 w-9 grid place-items-center rounded-full bg-white text-black hover:opacity-95 disabled:opacity-40 transition"
            aria-label="Play / Pause"
          >
            {isPlaying ? (
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
              </svg>
            ) : (
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="ml-0.5"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>

          <button
            disabled={!item}
            onClick={() => skipToNextTrack(token!)}
            className="h-9 w-9 grid place-items-center rounded-full border border-white/10 bg-white/[0.03] text-gray-200 hover:bg-white/[0.06] disabled:opacity-40 disabled:hover:bg-white/[0.03] transition"
            aria-label="Next"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="m6 18 8.5-6L6 6v12zM16 6v12h2V6h-2z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
