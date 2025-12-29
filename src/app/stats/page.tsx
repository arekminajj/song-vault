import { auth } from "@/auth";
import { getUserListeningStats } from "@/lib/spotify/spotify";
import { RangeToggle } from "@/components/stats/RangeToggle";

export default async function StatsPage({
  searchParams,
}: {
  searchParams: Promise<{ range?: string }>;
}) {
  const session = await auth();
  const searchParamsResolved = await searchParams;
  const range = (searchParamsResolved.range as "short_term" | "medium_term" | "long_term") || "medium_term";

  if (!session) return <div className="p-8 text-center text-gray-400">Login required</div>;

  const { tracks, artists } = await getUserListeningStats(session.accessToken!, range);
  const topTrack = tracks[0];

  return (
    <div className="min-h-screen p-4 md:p-8 lg:p-12 max-w-7xl mx-auto">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
        <div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-2">Your listening habits</h1>
          <p className="text-gray-400 text-sm md:text-base">
            Your most played tracks and artists based on your spotify history.
          </p>
        </div>
        <RangeToggle currentRange={range} />
      </header>

      {topTrack && (
        <section className="mb-16 bg-gradient-to-br from-[#1DB954]/20 to-zinc-900/50 p-6 md:p-10 rounded-3xl border border-white/5 relative overflow-hidden group">
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10 relative z-10">
            <div className="relative h-48 w-48 md:h-64 md:w-64 shadow-2xl transition-transform duration-500 group-hover:scale-105 flex-shrink-0">
              <img 
                src={topTrack.album.images[0].url} 
                alt={topTrack.name} 
                className="object-cover rounded-xl w-full h-full"
              />
              <div className="absolute -top-3 -left-3 bg-[#1DB954] text-black font-bold px-3 py-1 rounded-full shadow-lg text-sm">
                #1
              </div>
            </div>
            <div className="text-center md:text-left overflow-hidden">
              <span className="text-[#1DB954] uppercase tracking-[0.2em] text-xs md:text-sm font-bold">Top Track</span>
              <h2 className="text-3xl md:text-6xl font-black mb-2 mt-1 truncate">{topTrack.name}</h2>
              <p className="text-xl md:text-2xl text-gray-300 font-medium truncate">
                {topTrack.artists.map(a => a.name).join(", ")}
              </p>
            </div>
          </div>
          <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-[#1DB954]/10 blur-[100px] rounded-full" />
        </section>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        <section className="lg:col-span-5">
          <h3 className="text-2xl font-bold mb-8 flex items-center gap-2">
            Heavy Rotation
          </h3>
          <div className="space-y-2">
            {tracks.slice(1, 11).map((track, i) => (
              <div key={track.id} className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 transition-colors group">
                <span className="text-gray-500 font-mono w-5 text-sm">{i + 2}</span>
                <img 
                  src={track.album.images[0].url} 
                  className="rounded h-12 w-12 object-cover" 
                  alt="" 
                />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold truncate text-sm md:text-base">{track.name}</p>
                  <p className="text-xs md:text-sm text-gray-400 truncate">{track.artists[0].name}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="lg:col-span-7">
          <h3 className="text-2xl font-bold mb-8">Top Artists</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-8 md:gap-8">
            {artists.slice(0, 9).map((artist) => (
              <div key={artist.id} className="text-center group cursor-default">
                <div className="relative aspect-square mb-4 overflow-hidden rounded-full shadow-xl">
                  <img 
                    src={artist.images[0]?.url} 
                    alt={artist.name} 
                    className="object-cover w-full h-full grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
                  />
                </div>
                <p className="font-bold text-sm md:text-base group-hover:text-[#1DB954] transition-colors truncate px-2">
                  {artist.name}
                </p>
                <p className="text-[10px] md:text-xs text-gray-500 uppercase tracking-tighter mt-1">
                  {artist.genres[0] || "Artist"}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}