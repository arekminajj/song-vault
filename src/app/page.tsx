import Link from "next/link";
import { auth } from "@/auth";
import WebPlayer from "@/components/WebPlayer";
import SignIn from "@/components/Signin";
import StatCard from "@/components/homepage/StatCard";
import FeatureCard from "@/components/homepage/FeatureCard";
import Icon from "@/components/Icon";

export default async function Page() {
  const session = await auth();
  const user = session?.user;

  return (
    <main className="relative min-h-[calc(100vh-56px)] bg-gray-950 text-white overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 left-1/2 h-[420px] w-[820px] -translate-x-1/2 rounded-full bg-green-500/15 blur-3xl" />
        <div className="absolute top-48 left-1/3 h-[260px] w-[520px] rounded-full bg-indigo-500/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-10 sm:py-14">
        <section className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] items-start">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-gray-300">
              <Icon name="search" className="h-4 w-4 text-green-400" />
              Spotify search, reviews and stats
            </div>

            <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight leading-[1.05]">
              SoundVault <span className="text-green-400">for</span> music you
              love.
            </h1>

            <p className="text-gray-300 max-w-xl leading-relaxed">
              Search tracks, albums and artists using Spotify, save your
              impressions, rate from 1 to 5 and build your reviewer profile.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              {session ? (
                <>
                  <Link
                    href="/explore"
                    className="rounded-full bg-green-500 px-5 py-2.5 text-sm font-semibold text-black hover:bg-green-400 transition"
                  >
                    Go to Explore
                  </Link>
                  <Link
                    href="/stats"
                    className="rounded-full border border-white/15 bg-white/[0.03] px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/[0.06] transition"
                  >
                    View stats
                  </Link>
                </>
              ) : (
                <>
                  <div className="rounded-full bg-green-500 px-4 py-2 text-sm font-semibold text-black hover:opacity-95 transition">
                    <SignIn />
                  </div>

                  <Link
                    href="/explore"
                    className="rounded-full border border-white/15 bg-white/[0.03] px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/[0.06] transition"
                  >
                    See how it works
                  </Link>
                </>
              )}
            </div>

            <div className="flex flex-wrap gap-3 text-xs text-gray-400">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1">
                <Icon name="search" className="h-4 w-4 text-gray-300" />
                Fast search
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1">
                <Icon name="star" className="h-4 w-4 text-gray-300" />
                Ratings 1–5
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1">
                <Icon name="insights" className="h-4 w-4 text-gray-300" />
                Listening stats
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1">
                <Icon name="forum" className="h-4 w-4 text-gray-300" />
                Community
              </span>
            </div>
          </div>

          <div className="space-y-4 rounded-3xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur">
            {session ? (
              <>
                <div className="flex items-center gap-3">
                  {user?.image ? (
                    <img
                      src={user.image}
                      alt="Profile"
                      className="h-10 w-10 rounded-full object-cover"
                    />
                  ) : (
                    <div className="h-10 w-10 rounded-full bg-white/10" />
                  )}

                  <div className="min-w-0">
                    <p className="text-sm text-gray-400">Signed in as</p>
                    <p className="font-semibold truncate">
                      {user?.name ?? "User"}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <Link
                    href="/profile"
                    className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 hover:bg-white/[0.06] transition"
                  >
                    <p className="text-sm font-semibold">Profile</p>
                    <p className="mt-1 text-xs text-gray-400">
                      Reviews and favorites
                    </p>
                  </Link>

                  <Link
                    href="/explore"
                    className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 hover:bg-white/[0.06] transition"
                  >
                    <p className="text-sm font-semibold">Explore</p>
                    <p className="mt-1 text-xs text-gray-400">Search music</p>
                  </Link>
                </div>

                <div className="pt-2">
                  <WebPlayer session={session} />
                </div>

                <p className="text-xs text-gray-500">
                  Tip: start playing something in Spotify (phone/desktop) and
                  the player will show what is currently playing.
                </p>
              </>
            ) : (
              <>
                <p className="text-sm text-gray-300">
                  Sign in to see the player, stats and your review profile.
                </p>

                <div className="grid gap-3">
                  <StatCard
                    title="Explore"
                    value="Spotify Search"
                    hint="tracks • albums • artists"
                  />
                  <StatCard
                    title="Reviews"
                    value="1–5"
                    hint="write reviews and rate music"
                  />
                </div>
              </>
            )}
          </div>
        </section>

        <section className="mt-10 grid gap-4 sm:grid-cols-3">
          <StatCard
            title="Speed"
            value="Instant search"
            hint="results appear immediately in Explore"
          />
          <StatCard
            title="Your history"
            value="Review profile"
            hint="save your favorite albums"
          />
          <StatCard
            title="Stats"
            value="Top Artists/Tracks"
            hint="multiple time ranges"
          />
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-semibold text-white">What you can do</h2>
          <p className="mt-2 text-sm text-gray-400 max-w-2xl">
            A modern landing page with a clear message and useful modules, plus
            quick entry points to the most important sections after signing in.
          </p>

          <div className="mt-5 grid gap-4 md:grid-cols-3">
            <FeatureCard
              title="Spotify-like result cards"
              desc="Cover grid, hover effects, smooth transitions and sections (Explore)."
            />
            <FeatureCard
              title="Reviews and community"
              desc="Ratings, comments, likes and an activity feed."
            />
            <FeatureCard
              title="Listening stats"
              desc="4 weeks / 6 months / all time, with clean visualizations."
            />
          </div>
        </section>
      </div>
    </main>
  );
}
