import Section from "./Section";
import {
  getFeaturedPlaylists,
  getNewReleases,
  searchArtists,
} from "@/lib/spotify/spotify";

function Card({
  imageUrl,
  title,
  subtitle,
  round,
}: {
  imageUrl?: string;
  title: string;
  subtitle?: string;
  round?: boolean;
}) {
  return (
    <div
      className="group rounded-2xl border border-white/10 bg-white/5 p-3 transition
                 hover:border-[#1DB954]/30 hover:bg-white/10 hover:-translate-y-0.5"
    >
      <div
        className={`relative aspect-square overflow-hidden ${
          round ? "rounded-full" : "rounded-xl"
        }`}
      >
        <img
          src={imageUrl || "/No-Image-Placeholder.svg"}
          alt={title}
          className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
          loading="lazy"
        />
        <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-black/55 to-transparent opacity-80" />
      </div>

      <div className="mt-3 space-y-1">
        <p className="font-semibold text-sm text-white truncate">{title}</p>
        {subtitle ? (
          <p className="text-xs text-white/55 truncate">{subtitle}</p>
        ) : (
          <div className="h-4" />
        )}
      </div>
    </div>
  );
}

export default async function DefaultExplore() {
  // równolegle, żeby było szybciej
  const [featuredPlaylistsRes, newReleasesRes, artists] = await Promise.all([
    getFeaturedPlaylists().catch(() => null),
    getNewReleases().catch(() => null),
    // “Trending” – Spotify API nie daje prostego “trending artists” bez dodatkowych endpointów,
    // więc robimy sensowne “Suggested / Trending” przez search.
    searchArtists("top", 0).catch(() => []),
  ]);

  const playlists = featuredPlaylistsRes?.playlists?.items ?? [];
  const albums = newReleasesRes?.albums?.items ?? [];

  return (
    <div className="space-y-10">
      <Section title="Featured Playlists">
        {playlists.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center text-white/60">
            No data (Spotify).
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6">
            {playlists.slice(0, 12).map((p) => (
              <Card
                key={p.id}
                imageUrl={p.images?.[0]?.url}
                title={p.name}
                subtitle={p.description?.replace(/<[^>]*>/g, "") || " "}
              />
            ))}
          </div>
        )}
      </Section>

      <Section title="New Releases">
        {albums.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center text-white/60">
            Brak danych do wyswietlenia (Spotify).
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6">
            {albums.slice(0, 12).map((a) => (
              <Card
                key={a.id}
                imageUrl={a.images?.[0]?.url}
                title={a.name}
                subtitle={a.artists?.map((x) => x.name).join(", ") || " "}
              />
            ))}
          </div>
        )}
      </Section>

      <Section title="Trending Artists">
        {artists.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center text-white/60">
            Brak danych do wyswietlenia (Spotify).
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6">
            {artists.slice(0, 12).map((a) => (
              <Card
                key={a.id}
                imageUrl={a.images?.[0]?.url}
                title={a.name}
                subtitle={a.genres?.[0] || " "}
                round
              />
            ))}
          </div>
        )}
      </Section>
    </div>
  );
}
