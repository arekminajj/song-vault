import { auth } from "@/auth";
import { getTrack } from "@/lib/spotify/spotify";
import { getUserReviewForMedia } from "@/repositories/review.repository";
import { msToMinSec } from "@/utils/timeParser";
import ReviewCard from "@/components/ReviewCard";
import ReviewForm from "@/components/ReviewForm";
import SignIn from "@/components/Signin";

import { Track, SimplifiedAlbum } from "@spotify/web-api-ts-sdk";

interface Props {
  params: { id: string };
}

export default async function TrackPage({ params }: Props) {
  const session = await auth();
  const { id } = await params;
  const track = await getTrack(id);

  if (!session) {
    return (
      <main className="relative min-h-[calc(100vh-56px)] bg-gray-950 text-white overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 left-1/2 h-[420px] w-[820px] -translate-x-1/2 rounded-full bg-green-500/15 blur-3xl" />
          <div className="absolute top-48 left-1/3 h-[260px] w-[520px] rounded-full bg-indigo-500/10 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-4xl px-4 py-10">
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur">
            <div className="flex items-center gap-4">
              <img
                src={track.album.images?.[0]?.url}
                alt={track.name}
                className="h-16 w-16 rounded-2xl object-cover shadow-md border border-white/10"
              />
              <div className="min-w-0">
                <p className="text-xs text-gray-400">Track</p>
                <h1 className="text-xl font-semibold truncate">{track.name}</h1>
                <p className="text-sm text-gray-400 truncate">
                  {track.artists.map((a) => a.name).join(", ")}
                </p>
              </div>
            </div>

            <div className="mt-5 rounded-2xl border border-white/10 bg-black/20 p-4">
              <p className="text-sm text-gray-300">
                Zaloguj się, żeby dodać recenzję i zobaczyć swoje oceny w
                profilu.
              </p>

              <div className="mt-3">
                <div className="[&>form>button]:cursor-pointer [&>form>button]:rounded-full [&>form>button]:bg-white [&>form>button]:px-5 [&>form>button]:py-2.5 [&>form>button]:text-sm [&>form>button]:font-semibold [&>form>button]:text-black [&>form>button]:transition [&>form>button]:hover:opacity-95 [&>form>button]:active:scale-[0.98]">
                  <SignIn />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  const review = await getUserReviewForMedia(session.user.id!, track.id);

  const albumName = track.album?.name ?? "Unknown album";
  const coverUrl = track.album?.images?.[0]?.url ?? "";
  const artists = track.artists.map((a) => a.name).join(", ");
  const release = (track.album as SimplifiedAlbum)?.release_date as
    | string
    | undefined;
  const duration = msToMinSec(track.duration_ms);
  const popularity = (track as Track)?.popularity as number | undefined;
  const explicit = (track as Track)?.explicit as boolean | undefined;
  const previewUrl = (track as Track)?.preview_url as string | null | undefined;
  const spotifyUrl = (track as Track)?.external_urls?.spotify as
    | string
    | undefined;

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <section className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4 min-w-0">
            <img
              src={coverUrl}
              alt={track.name}
              className="h-20 w-20 rounded-2xl object-cover shadow-md border border-white/10 flex-shrink-0"
            />

            <div className="min-w-0">
              <p className="text-xs text-gray-400">Track</p>
              <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight truncate">
                {track.name}
              </h1>
              <p className="mt-1 text-sm text-gray-400 truncate">{artists}</p>

              <div className="mt-3 flex flex-wrap items-center gap-2">
                <span className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-[11px] text-gray-300">
                  {duration}
                </span>
                <span className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-[11px] text-gray-300">
                  Album: {albumName}
                </span>
                {release ? (
                  <span className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-[11px] text-gray-300">
                    Released: {release}
                  </span>
                ) : null}
                {explicit ? (
                  <span className="rounded-full border border-red-500/25 bg-red-500/10 px-3 py-1 text-[11px] text-red-200">
                    Explicit
                  </span>
                ) : null}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {spotifyUrl ? (
              <a
                href={spotifyUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-sm font-medium text-gray-100 hover:bg-white/[0.1] transition"
              >
                Open in Spotify
              </a>
            ) : null}

            {previewUrl ? (
              <a
                href={previewUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-full bg-white text-black px-4 py-2 text-sm font-semibold hover:opacity-95 transition"
              >
                Preview
              </a>
            ) : (
              <span className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-gray-400">
                No preview
              </span>
            )}
          </div>
        </div>

        {typeof popularity === "number" ? (
          <div className="mt-6">
            <div className="flex items-center justify-between">
              <p className="text-xs text-gray-400">Popularity</p>
              <p className="text-xs text-gray-300">{popularity}/100</p>
            </div>
            <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-white/70"
                style={{ width: `${Math.max(0, Math.min(100, popularity))}%` }}
              />
            </div>
          </div>
        ) : null}

        {previewUrl ? (
          <div className="mt-5 rounded-2xl border border-white/10 bg-black/20 p-4">
            <p className="text-xs text-gray-400">Preview player</p>
            <audio className="mt-2 w-full" controls preload="none">
              <source src={previewUrl} />
            </audio>
          </div>
        ) : null}
      </section>

      <div className="mt-6">
        {review ? <ReviewCard review={review} /> : <ReviewForm mediaId={id} />}
      </div>
    </div>
  );
}
