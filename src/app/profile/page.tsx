import { auth } from "@/auth";
import WebPlayer from "@/components/WebPlayer";
import SignIn from "@/components/Signin";

function Chip({
  label,
  value,
}: {
  label: string;
  value?: string | number | null;
}) {
  if (value === undefined || value === null || value === "") return null;

  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-gray-300">
      <span className="text-gray-400">{label}</span>
      <span className="font-semibold text-white">{value}</span>
    </div>
  );
}

function InfoCard({
  title,
  value,
  hint,
}: {
  title: string;
  value: React.ReactNode;
  hint?: string;
}) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur">
      <p className="text-xs text-gray-400">{title}</p>
      <div className="mt-2 text-lg font-semibold text-white">{value}</div>
      {hint ? <p className="mt-1 text-xs text-gray-500">{hint}</p> : null}
    </div>
  );
}

function StatCard({
  label,
  value,
  sub,
}: {
  label: string;
  value: React.ReactNode;
  sub?: string;
}) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur transition hover:bg-white/[0.06] hover:border-white/20">
      <p className="text-xs text-gray-400">{label}</p>
      <div className="mt-2 text-2xl font-semibold tracking-tight text-white">
        {value}
      </div>
      {sub ? <p className="mt-1 text-xs text-gray-500">{sub}</p> : null}
    </div>
  );
}

export default async function ProfilePage() {
  const session = await auth();

  if (!session) {
    return (
      <main className="relative min-h-[calc(100vh-56px)] bg-gray-950 text-white overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 left-1/2 h-[420px] w-[820px] -translate-x-1/2 rounded-full bg-green-500/15 blur-3xl" />
          <div className="absolute top-48 left-1/3 h-[260px] w-[520px] rounded-full bg-indigo-500/10 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-3xl px-4 py-14">
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 text-center backdrop-blur">
            <h1 className="text-3xl font-semibold tracking-tight">
              Profile is locked
            </h1>
            <p className="mt-2 text-sm text-gray-400">
              Sign in with Spotify to see your profile details and Web Player.
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

  const user = session.user;

  const avatarUrl = user?.image ?? user?.images?.[0]?.url ?? null;
  const followers = user?.followers?.total ?? null;

  const explicitEnabled = user?.explicit_content?.filter_enabled ?? undefined;
  const explicitLocked = user?.explicit_content?.filter_locked ?? undefined;

  const spotifyUrl = user?.external_urls?.spotify ?? null;

  return (
    <main className="relative min-h-[calc(100vh-56px)] bg-gray-950 text-white overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 left-1/2 h-[420px] w-[820px] -translate-x-1/2 rounded-full bg-green-500/15 blur-3xl" />
        <div className="absolute top-48 left-1/3 h-[260px] w-[520px] rounded-full bg-indigo-500/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-10 sm:py-14">
        <section className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              {avatarUrl ? (
                <img
                  src={avatarUrl}
                  alt="Profile"
                  className="h-16 w-16 rounded-2xl object-cover border border-white/10 shadow-lg"
                />
              ) : (
                <div className="h-16 w-16 rounded-2xl bg-white/10 border border-white/10" />
              )}
              <div className="pointer-events-none absolute -inset-1 rounded-[18px] bg-gradient-to-r from-green-500/20 to-indigo-500/20 blur-md" />
            </div>

            <div className="min-w-0">
              <p className="text-xs text-gray-400">Your profile</p>
              <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight truncate">
                {user?.name ?? "User"}
              </h1>
              <p className="mt-1 text-sm text-gray-400 truncate">
                {user?.email ?? "No email available"}
              </p>
            </div>
          </div>

          <div className="hidden lg:block" />
        </section>

        <section className="mt-8">
          <div className="flex items-end justify-between gap-3">
            <div>
              <h2 className="text-lg font-semibold">Quick overview</h2>
              <p className="mt-1 text-sm text-gray-400">
                A snapshot of your Spotify account details.
              </p>
            </div>
          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            <StatCard
              label="Followers"
              value={followers ?? "—"}
              sub="Total Spotify followers"
            />
            <StatCard
              label="Country"
              value={user?.country ?? "—"}
              sub="Market associated with your profile"
            />
            <StatCard
              label="Plan"
              value={user?.product ?? "—"}
              sub="Spotify subscription tier"
            />
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <Chip label="Type" value={user?.type ?? null} />
            <Chip
              label="Explicit filter"
              value={
                explicitEnabled === undefined
                  ? null
                  : explicitEnabled
                    ? "enabled"
                    : "disabled"
              }
            />
            <Chip
              label="Filter locked"
              value={
                explicitLocked === undefined
                  ? null
                  : explicitLocked
                    ? "yes"
                    : "no"
              }
            />
          </div>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-[1.15fr_0.85fr] items-start">
          <div className="space-y-6">
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur">
              <h2 className="text-lg font-semibold">Account details</h2>
              <p className="mt-1 text-sm text-gray-400">
                These fields come from your Spotify profile (via NextAuth
                session mapping).
              </p>

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <InfoCard
                  title="Spotify profile"
                  value={
                    spotifyUrl ? (
                      <a
                        href={spotifyUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 text-green-300 hover:text-green-200 transition"
                      >
                        Open in Spotify <span className="text-gray-500">↗</span>
                      </a>
                    ) : (
                      <span className="text-gray-400">Not available</span>
                    )
                  }
                  hint="external_urls.spotify"
                />

                <InfoCard
                  title="User ID"
                  value={<span className="break-all">{user?.id ?? "—"}</span>}
                  hint="Spotify user id"
                />

                <InfoCard
                  title="URI"
                  value={<span className="break-all">{user?.uri ?? "—"}</span>}
                  hint="spotify:user:..."
                />

                <InfoCard
                  title="API href"
                  value={<span className="break-all">{user?.href ?? "—"}</span>}
                  hint="Spotify Web API endpoint"
                />
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-lg font-semibold">Recent activity</h2>
                  <p className="mt-1 text-sm text-gray-400">
                    Your latest reviews and likes will show up here.
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-3 py-2 text-xs text-gray-300">
                  Coming soon
                </div>
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-5">
                  <p className="text-sm font-semibold text-white">
                    Latest reviews
                  </p>
                  <p className="mt-1 text-xs text-gray-400">
                    Show the last 3-5 reviews you posted.
                  </p>
                  <div className="mt-4 h-20 rounded-2xl border border-dashed border-white/10 bg-white/[0.01]" />
                </div>

                <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-5">
                  <p className="text-sm font-semibold text-white">
                    Liked items
                  </p>
                  <p className="mt-1 text-xs text-gray-400">
                    Quick access to your saved tracks/albums.
                  </p>
                  <div className="mt-4 h-20 rounded-2xl border border-dashed border-white/10 bg-white/[0.01]" />
                </div>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <InfoCard
                title="Next step"
                value="Write reviews"
                hint="Rate albums / tracks from 1 to 5"
              />
              <InfoCard
                title="Discover"
                value="Search music"
                hint="Find tracks, albums and artists"
              />
              <InfoCard
                title="Insights"
                value="Listening stats"
                hint="Top artists/tracks over time"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="text-lg font-semibold">Web Player</h2>
                  <p className="mt-1 text-sm text-gray-400">
                    Control playback for the currently active device.
                  </p>
                </div>

                {avatarUrl ? (
                  <img
                    src={avatarUrl}
                    alt="Profile"
                    className="h-10 w-10 rounded-xl object-cover border border-white/10"
                  />
                ) : null}
              </div>

              <div className="mt-4">
                <WebPlayer session={session} />
              </div>

              <p className="mt-3 text-xs text-gray-500">
                Tip: start playback in Spotify (mobile/desktop), then come back
                here to see “Now playing”.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
