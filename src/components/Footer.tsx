import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-gray-950 text-sm text-gray-500">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-8">
        <p>© {new Date().getFullYear()} SoundVault</p>

        <nav className="flex gap-4">
          <Link className="hover:text-gray-300 transition" href="/explore">
            Explore
          </Link>
          <Link className="hover:text-gray-300 transition" href="/stats">
            Stats
          </Link>
          <Link className="hover:text-gray-300 transition" href="/profile">
            Profile
          </Link>
        </nav>
      </div>
    </footer>
  );
}
