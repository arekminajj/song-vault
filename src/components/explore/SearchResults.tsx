import Section from "./Section";
import type { Track, SimplifiedAlbum, Artist } from "@spotify/web-api-ts-sdk";

type SearchResultItem = Track | SimplifiedAlbum | Artist;

function getImageUrl(item: SearchResultItem): string | undefined {
  if ("images" in item && Array.isArray(item.images)) {
    return item.images[0]?.url;
  }

  if ("album_type" in item) {
    return item.images[0]?.url;
  }

  if ("album" in item && item.album?.images) {
    return item.album.images[0]?.url;
  }

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
    <Section title={`Results for "${query}"`}>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
        {results.length === 0 ? (
          <p className="col-span-full text-center text-gray-400 py-10">
            No results found for "{query}"
          </p>
        ) : (
          results.map((item) => (
            <a href={item.type === "track" ? `/track/${item.id}` : ""}>
              <div
                key={item.id}
                className="group cursor-pointer space-y-3 transition-transform hover:scale-105"
              >
                <div className="aspect-square overflow-hidden rounded-xl bg-white/5 shadow-lg transition group-hover:bg-white/10">
                  <img
                    src={getImageUrl(item) || "/No-Image-Placeholder.svg"}
                    alt={item.name}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>

                <div className="space-y-1">
                  <p className="font-medium text-white truncate">{item.name}</p>
                  <p className="text-sm text-gray-400 capitalize">
                    {getItemType(item)}
                    {"artists" in item && item.artists && (
                      <span className="block text-xs text-gray-500 truncate">
                        {item.artists.map((a) => a.name).join(", ")}
                      </span>
                    )}
                  </p>
                </div>
              </div>
            </a>
          ))
        )}
      </div>
    </Section>
  );
}
