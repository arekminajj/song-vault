import { auth } from "@/auth";
import { getUserListeningStats } from "@/lib/spotify/stats";
import { RangeToggle } from "@/components/stats/RangeToggle";
import SignIn from "@/components/Signin";

export default async function StatsPage({
  searchParams,
}: {
  searchParams: Promise<{ range?: string }>;
}) {
  const session = await auth();
  const searchParamsResolved = await searchParams;
  const range =
    (searchParamsResolved.range as
      | "short_term"
      | "medium_term"
      | "long_term") || "medium_term";

  if (!session) {
    return (
      <main className="relative min-h-[calc(100vh-56px)] bg-gray-950 text-white overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 left-1/2 h-[420px] w-[820px] -translate-x-1/2 rounded-full bg-green-500/15 blur-3xl" />
          <div className="absolute top-48 left-1/3 h-[260px] w-[520px] rounded-full bg-indigo-500/10 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-3xl px-4 py-20">
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 text-center backdrop-blur">
            <h1 className="text-3xl font-semibold tracking-tight">
              Listening stats are locked
            </h1>
            <p className="mt-2 text-sm text-gray-400">
              Sign in with Spotify to see your top tracks and artists.
            </p>

            <div className="mt-6 flex items-center justify-center">
              <div className="rounded-full bg-green-500 px-5 py-2.5 text-sm font-semibold text-black hover:bg-green-400 transition">
                <SignIn />
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  const { tracks, artists } = await getUserListeningStats(
    session.accessToken!,
    range,
  );

  const topTrack = tracks[0];

  return (
    <main className="relative min-h-[calc(100vh-56px)] bg-gray-950 text-white overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 left-1/2 h-[420px] w-[820px] -translate-x-1/2 rounded-full bg-green-500/15 blur-3xl" />
        <div className="absolute top-48 left-1/3 h-[260px] w-[520px] rounded-full bg-indigo-500/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-10 sm:py-14">
        <header className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between mb-12">
          <div>
            <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">
              Your listening stats
            </h1>
            <p className="mt-2 text-sm text-gray-400 max-w-xl">
              Insights based on your Spotify listening history.
            </p>
          </div>

          <RangeToggle currentRange={range} />
        </header>

        {topTrack && (
          <section className="mb-16 rounded-3xl border border-white/10 bg-white/[0.03] p-6 md:p-10 backdrop-blur relative overflow-hidden">
            <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10 relative z-10">
              <div className="relative h-48 w-48 md:h-64 md:w-64 shadow-2xl transition-transform duration-500 hover:scale-105 flex-shrink-0">
                <img
                  src={topTrack.album.images[0].url}
                  alt={topTrack.name}
                  className="object-cover rounded-2xl w-full h-full"
                />
                <div className="absolute -top-3 -left-3 bg-green-500 text-black font-bold px-3 py-1 rounded-full shadow-lg text-sm">
                  #1
                </div>
              </div>

              <div className="text-center md:text-left overflow-hidden">
                <span className="text-green-400 uppercase tracking-[0.2em] text-xs font-bold">
                  Top track
                </span>
                <h2 className="text-2xl md:text-5xl font-semibold mb-2 mt-1 truncate">
                  {topTrack.name}
                </h2>
                <p className="text-lg md:text-xl text-gray-300 truncate">
                  {topTrack.artists.map((a) => a.name).join(", ")}
                </p>
              </div>
            </div>

            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-green-500/10 blur-[100px] rounded-full" />
          </section>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          <section className="lg:col-span-5">
            <h3 className="text-xl font-semibold mb-6">Heavy rotation</h3>

            <div className="space-y-2">
              {tracks.slice(1, 11).map((track, i) => (
                <div
                  key={track.id}
                  className="flex items-center gap-4 p-3 rounded-2xl border border-white/10 bg-white/[0.02]
                             hover:bg-white/[0.06] transition"
                >
                  <span className="text-gray-500 font-mono w-5 text-sm">
                    {i + 2}
                  </span>

                  <img
                    src={track.album.images[0].url}
                    className="rounded-xl h-12 w-12 object-cover"
                    alt=""
                  />

                  <div className="flex-1 min-w-0">
                    <p className="font-semibold truncate text-sm md:text-base">
                      {track.name}
                    </p>
                    <p className="text-xs md:text-sm text-gray-400 truncate">
                      {track.artists[0].name}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="lg:col-span-7">
            <h3 className="text-xl font-semibold mb-6">Top artists</h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-8 md:gap-8">
              {artists.slice(0, 9).map((artist) => (
                <div key={artist.id} className="text-center group">
                  <div className="relative aspect-square mb-4 overflow-hidden rounded-full shadow-xl">
                    <img
                      src={artist.images[0]?.url}
                      alt={artist.name}
                      className="object-cover w-full h-full grayscale group-hover:grayscale-0 transition-all duration-700"
                    />
                  </div>

                  <p className="font-semibold text-sm md:text-base group-hover:text-green-400 transition truncate px-2">
                    {artist.name}
                  </p>

                  <p className="text-[10px] md:text-xs text-gray-500 uppercase tracking-tight mt-1">
                    {artist.genres[0] || "Artist"}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
