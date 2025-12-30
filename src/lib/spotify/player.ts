import { getUserSpotifyClient } from "./userClient";

export async function getUserPlaybackState(token: string) {
  const client = getUserSpotifyClient(token);

  return (await client.player.getCurrentlyPlayingTrack())
}

export async function skipToNextTrack(token: string, deviceId?: string) {
  await getUserSpotifyClient(token).player.skipToNext(deviceId ?? "");
}

export async function skipToPreviousTrack(token: string, deviceId?: string) {
  await getUserSpotifyClient(token).player.skipToPrevious(deviceId ?? "");
}

export async function pausePlayback(token: string, deviceId?: string) {
  await getUserSpotifyClient(token).player.pausePlayback(deviceId ?? "");
}

export async function startResumePlayback(token: string, deviceId?: string) {
  await getUserSpotifyClient(token).player.startResumePlayback(deviceId ?? "");
}

export async function seekToPosition(token: string, position_ms: number, deviceId?: string) {
  await getUserSpotifyClient(token).player.seekToPosition(position_ms, deviceId ?? "")
}