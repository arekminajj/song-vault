import "server-only";
import { SpotifyApi } from "@spotify/web-api-ts-sdk";

let client: SpotifyApi | null = null;

export function getSpotifyClient() {
  if (!client) {
    client = SpotifyApi.withClientCredentials(
      process.env.SPOTIFY_CLIENT_ID!,
      process.env.SPOTIFY_CLIENT_SECRET!
    );
  }
  return client;
}
