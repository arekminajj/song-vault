import Link from "next/link";
import { auth } from "@/auth";
import WebPlayer from "@/components/WebPlayer";
import SignIn from "@/components/Signin";
import StatCard from "@/components/homepage/StatCard";
import FeatureCard from "@/components/homepage/FeatureCard";

export default async function Page() {
  const session = await auth();
  const user = session?.user;

  return (
    <main className="relative min-h-[calc(100vh-56px)] bg-gray-950 text-white overflow-hidden">
      {/* tło / glowy */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 left-1/2 h-[420px] w-[820px] -translate-x-1/2 rounded-full bg-green-500/15 blur-3xl" />
        <div className="absolute top-48 left-1/3 h-[260px] w-[520px] rounded-full bg-indigo-500/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-10 sm:py-14">
        {/* HERO */}
        <section className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] items-start">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-gray-300">
              <span className="h-2 w-2 rounded-full bg-green-400" />
              Spotify search + recenzje + statystyki
            </div>

            <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight leading-[1.05]">
              SoundVault <span className="text-green-400">dla</span> muzyki,
              którą kochasz.
            </h1>

            <p className="text-gray-300 max-w-xl leading-relaxed">
              Wyszukuj utwory, albumy i artystów przez Spotify, zapisuj
              wrażenia, oceniaj w skali 1–5 i buduj swój profil recenzenta.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              {session ? (
                <>
                  <Link
                    href="/explore"
                    className="rounded-full bg-green-500 px-5 py-2.5 text-sm font-semibold text-black hover:bg-green-400 transition"
                  >
                    Przejdź do Explore
                  </Link>
                  <Link
                    href="/stats"
                    className="rounded-full border border-white/15 bg-white/[0.03] px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/[0.06] transition"
                  >
                    Zobacz statystyki
                  </Link>
                </>
              ) : (
                <>
                  {/* SignIn ma swój button w środku, więc opakowanie traktuj jako “badge” */}
                  <div className="rounded-full bg-green-500 px-4 py-2 text-sm font-semibold text-black hover:opacity-95 transition">
                    <SignIn />
                  </div>

                  <Link
                    href="/explore"
                    className="rounded-full border border-white/15 bg-white/[0.03] px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/[0.06] transition"
                  >
                    Zobacz jak to działa
                  </Link>
                </>
              )}
            </div>

            <div className="flex flex-wrap gap-3 text-xs text-gray-400">
              <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1">
                🔎 Szybkie wyszukiwanie
              </span>
              <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1">
                ⭐ Oceny 1–5
              </span>
              <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1">
                📈 Listening stats
              </span>
              <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1">
                💬 Społeczność
              </span>
            </div>
          </div>

          {/* RIGHT PANEL */}
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
                    <p className="text-sm text-gray-400">Zalogowano jako</p>
                    <p className="font-semibold truncate">
                      {user?.name ?? "Użytkownik"}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <Link
                    href="/profile"
                    className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 hover:bg-white/[0.06] transition"
                  >
                    <p className="text-sm font-semibold">Profil</p>
                    <p className="mt-1 text-xs text-gray-400">
                      Recenzje, ulubione
                    </p>
                  </Link>

                  <Link
                    href="/explore"
                    className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 hover:bg-white/[0.06] transition"
                  >
                    <p className="text-sm font-semibold">Explore</p>
                    <p className="mt-1 text-xs text-gray-400">
                      Wyszukuj muzykę
                    </p>
                  </Link>
                </div>

                <div className="pt-2">
                  <WebPlayer session={session} />
                </div>

                <p className="text-xs text-gray-500">
                  Tip: odpal coś na Spotify (telefon/desktop), a player pokaże
                  co leci.
                </p>
              </>
            ) : (
              <>
                <p className="text-sm text-gray-300">
                  Zaloguj się, żeby zobaczyć player, statystyki i swój profil
                  recenzji.
                </p>

                <div className="grid gap-3">
                  <StatCard
                    title="Explore"
                    value="Spotify Search"
                    hint="utwory • albumy • artyści"
                  />
                  <StatCard
                    title="Reviews"
                    value="1–5 ⭐"
                    hint="pisz recenzje i oceniaj"
                  />
                </div>
              </>
            )}
          </div>
        </section>

        {/* STATS */}
        <section className="mt-10 grid gap-4 sm:grid-cols-3">
          <StatCard
            title="Szybkość"
            value="Instant search"
            hint="wyniki od razu w Explore"
          />
          <StatCard
            title="Twoja historia"
            value="Profil recenzji"
            hint="zapisuj ulubione albumy"
          />
          <StatCard
            title="Statystyki"
            value="Top Artists/Tracks"
            hint="różne zakresy czasu"
          />
        </section>

        {/* FEATURES */}
        <section className="mt-10">
          <h2 className="text-xl font-semibold text-white">
            Co tu fajnego zrobimy
          </h2>
          <p className="mt-2 text-sm text-gray-400 max-w-2xl">
            Strona główna ma wyglądać jak nowoczesny produkt: jasny przekaz +
            konkretne moduły, a po zalogowaniu — szybkie wejścia do
            najważniejszych sekcji.
          </p>

          <div className="mt-5 grid gap-4 md:grid-cols-3">
            <FeatureCard
              title="Karty wyników jak w Spotify"
              desc="Siatka coverów, hover, płynne przejścia i sekcje (Explore)."
            />
            <FeatureCard
              title="Recenzje i community"
              desc="Oceny, komentarze, polubienia i feed aktywności."
            />
            <FeatureCard
              title="Listening stats"
              desc="4 tygodnie / 6 miesięcy / all time — i ładne wizualizacje."
            />
          </div>
        </section>

        <footer className="mt-14 border-t border-white/10 pt-8 text-sm text-gray-500">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p>© {new Date().getFullYear()} SoundVault</p>
            <div className="flex gap-4">
              <Link className="hover:text-gray-300 transition" href="/explore">
                Explore
              </Link>
              <Link className="hover:text-gray-300 transition" href="/stats">
                Stats
              </Link>
              <Link className="hover:text-gray-300 transition" href="/profile">
                Profile
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}
