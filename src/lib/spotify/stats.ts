import { getUserSpotifyClient } from "./userClient";

export async function getUserListeningStats(
  token: string,
  timestamp: "short_term" | "medium_term" | "long_term",
) {
  const client = getUserSpotifyClient(token);

  const [tracks, artists] = await Promise.all([
    client.currentUser.topItems("tracks", timestamp, 10),
    client.currentUser.topItems("artists", timestamp, 10),
  ]);

  return {
    tracks: tracks.items,
    artists: artists.items,
  };
}
