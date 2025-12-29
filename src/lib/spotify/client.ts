import "server-only";
import { SpotifyApi, AccessToken } from "@spotify/web-api-ts-sdk";

let client: SpotifyApi | null = null;

export function getSpotifyClient() {
  if (!client) {
    client = SpotifyApi.withClientCredentials(
      process.env.AUTH_SPOTIFY_ID!,
      process.env.AUTH_SPOTIFY_SECRET!,
    );
  }
  return client;
}

export function getUserSpotifyClient(token: string) {
  const sdkToken: AccessToken = {
    access_token: token,
    token_type: "Bearer",
    expires_in: 3600,
    // refreshing the token is handled by nextauth
    refresh_token: "",
  };

  return SpotifyApi.withAccessToken(process.env.AUTH_SPOTIFY_ID!, sdkToken);
}
