import { Artist, SimplifiedAlbum, Track } from "@spotify/web-api-ts-sdk";

type SearchResultItem = Track | SimplifiedAlbum | Artist;

export function rankSearchResults(items: SearchResultItem[], query: string) {
  const lowerQuery = query.toLowerCase();

  return items.sort((a, b) => {
    const aName = a.name.toLowerCase();
    const bName = b.name.toLowerCase();

    // exact match score
    const aExact = aName === lowerQuery ? 100 : 0;
    const bExact = bName === lowerQuery ? 100 : 0;

    // starts with query score
    const aStarts = aName.startsWith(lowerQuery) ? 60 : 0;
    const bStarts = bName.startsWith(lowerQuery) ? 60 : 0;

    // conatins query score
    const aContains = aName.includes(lowerQuery) ? 25 : 0;
    const bContains = bName.includes(lowerQuery) ? 25 : 0;

    const aScore = aExact + aStarts + aContains;
    const bScore = bExact + bStarts + bContains;

    if (aScore !== bScore) return bScore - aScore;

    // popularity
    return b.popularity - a.popularity;
  });
}
