import { getSpotifyClient } from "./client";
import { rankSearchResults } from "@/utils/searchResultRanking";

import { Artist, Track, SimplifiedAlbum } from "@spotify/web-api-ts-sdk";

type SearchResultItem = Track | SimplifiedAlbum | Artist;

export async function searchTracks(query: string, offset: number | undefined) {
  if (!query.trim()) return [];

  const res = await getSpotifyClient().search(
    query,
    ["track"],
    "US",
    50,
    offset,
  );
  return res.tracks.items;
}

export async function searchAlbums(query: string, offset: number | undefined) {
  if (!query.trim()) return [];

  const res = await getSpotifyClient().search(
    query,
    ["album"],
    "US",
    50,
    offset,
  );
  return res.albums.items;
}

export async function searchArtists(query: string, offset: number | undefined) {
  if (!query.trim()) return [];

  const res = await getSpotifyClient().search(
    query,
    ["artist"],
    "US",
    50,
    offset,
  );
  return res.artists.items;
}

export async function searchAll(
  query: string,
  offset: number | undefined,
): Promise<SearchResultItem[]> {
  if (!query.trim()) return [];

  const res = await getSpotifyClient().search(
    query,
    ["album", "artist", "track"],
    "US",
    50,
    offset,
  );

  const items = [
    ...(res.artists?.items ?? []),
    ...(res.albums?.items ?? []),
    ...(res.tracks?.items ?? []),
  ];

  return rankSearchResults(items, query);
}

export function getTract(id: string) {
  return getSpotifyClient().tracks.get(id);
}

export function getAlbum(id: string) {
  return getSpotifyClient().albums.get(id);
}

export function getArtist(id: string) {
  return getSpotifyClient().artists.get(id);
}
