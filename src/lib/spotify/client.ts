import "server-only";
import { SpotifyApi } from "@spotify/web-api-ts-sdk";

let client: SpotifyApi | null = null;

export function getSpotifyClient() {
  if (!client) {
    client = SpotifyApi.withClientCredentials(
      process.env.AUTH_SPOTIFY_ID!,
      process.env.AUTH_SPOTIFY_SECRET!
    );
  }
  return client;
}
