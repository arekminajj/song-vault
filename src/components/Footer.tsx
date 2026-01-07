import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-gray-950 text-sm text-gray-400 overflow-hidden">
      {/* subtle background glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -bottom-24 left-1/2 h-[260px] w-[620px] -translate-x-1/2 rounded-full bg-green-500/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-10 md:grid-cols-3">
          {/* Brand / description */}
          <div>
            <p className="text-base font-semibold text-white tracking-tight">
              Song Vault
            </p>
            <p className="mt-3 max-w-sm text-sm text-gray-400 leading-relaxed">
              Discover, review and track your music taste using Spotify data.
              Song Vault lets you explore albums, artists and tracks while
              keeping your listening history in one place.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-xs uppercase tracking-widest text-gray-500">
              Navigation
            </p>
            <nav className="mt-4 flex flex-col gap-3">
              <Link
                href="/explore"
                className="w-fit transition hover:text-white"
              >
                Explore
              </Link>
              <Link href="/stats" className="w-fit transition hover:text-white">
                Listening stats
              </Link>
              <Link
                href="/profile"
                className="w-fit transition hover:text-white"
              >
                Profile
              </Link>
            </nav>
          </div>

          {/* Meta / legal */}
          <div>
            <p className="text-xs uppercase tracking-widest text-gray-500">
              About
            </p>
            <p className="mt-4 text-sm leading-relaxed text-gray-400">
              Built as a personal project using the Spotify Web API.
              <br />
              This app is not affiliated with or endorsed by Spotify.
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} Song Vault. All rights reserved.
          </p>

          <div className="flex gap-4 text-xs">
            <a
              href="https://developer.spotify.com/"
              target="_blank"
              rel="noreferrer"
              className="transition hover:text-white"
            >
              Spotify API
            </a>
            <a
              href="https://github.com/"
              target="_blank"
              rel="noreferrer"
              className="transition hover:text-white"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
