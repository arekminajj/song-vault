import Section from "./Section";
import type { Track, SimplifiedAlbum, Artist } from "@spotify/web-api-ts-sdk";

type SearchResultItem = Track | SimplifiedAlbum | Artist;

function getImageUrl(item: SearchResultItem): string | undefined {
  if ("images" in item && Array.isArray(item.images))
    return item.images[0]?.url;
  if ("album_type" in item) return item.images[0]?.url;
  if ("album" in item && item.album?.images) return item.album.images[0]?.url;
  return undefined;
}

function getItemType(item: SearchResultItem): string {
  if ("album_type" in item) return "album";
  if ("type" in item) return item.type;
  return "track";
}

export default function SearchResults({
  query,
  results,
}: {
  query: string;
  results: SearchResultItem[];
}) {
  return (
    <Section title={`Results for “${query}”`}>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
        {results.length === 0 ? (
          <div className="col-span-full">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center">
              <p className="text-white/70 text-sm">No results found.</p>
              <p className="mt-1 text-white/40 text-xs">
                Try a different spelling or a shorter query.
              </p>
            </div>
          </div>
        ) : (
          results.map((item) => {
            const type = getItemType(item);
            const img = getImageUrl(item) || "/No-Image-Placeholder.svg";

            return (
              <div
                key={item.id}
                className="group cursor-pointer rounded-2xl border border-white/10 bg-white/5 p-3 transition
                           hover:border-[#1DB954]/30 hover:bg-white/10 hover:-translate-y-0.5"
              >
                <a href={type === "track" ? `/track/${item.id}` : ''}>
                <div className="relative aspect-square overflow-hidden rounded-xl">
                  <img
                    src={img}
                    alt={item.name}
                    className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
                    loading="lazy"
                  />

                  <div className="absolute left-2 top-2 rounded-full border border-white/10 bg-black/50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white/80 backdrop-blur">
                    {type}
                  </div>

                  <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-black/55 to-transparent opacity-80" />
                </div>

                <div className="mt-3 space-y-1">
                  <p className="font-semibold text-sm text-white truncate">
                    {item.name}
                  </p>

                  {"artists" in item && item.artists ? (
                    <p className="text-xs text-white/55 truncate">
                      {item.artists.map((a) => a.name).join(", ")}
                    </p>
                  ) : (
                    <p className="text-xs text-white/45 truncate">
                      {"genres" in item && item.genres?.length
                        ? item.genres.slice(0, 2).join(" • ")
                        : " "}
                    </p>
                  )}
                </div>
                </a>
              </div>
            );
          })
        )}
      </div>
    </Section>
  );
}
