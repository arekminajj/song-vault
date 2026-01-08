import { auth } from "@/auth";
import SignIn from "./Signin";
import SignOut from "./Signout";
import Link from "next/link";

const navLinkClass =
  "cursor-pointer rounded-full px-4 py-2 text-sm font-semibold transition " +
  "text-gray-300 hover:text-white hover:bg-white/[0.06] border border-transparent hover:border-white/10";

export default async function Navbar() {
  const session = await auth();

  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-gray-900/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <div className="flex items-center gap-8">
          <Link
            href="/"
            className="cursor-pointer text-lg font-semibold tracking-tight text-white transition hover:text-green-400"
          >
            Song Vault
          </Link>

          <div className="hidden md:flex items-center gap-2">
            <Link href="/explore" className={navLinkClass}>
              Explore
            </Link>
            <Link href="/stats" className={navLinkClass}>
              Listening stats
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {session ? (
            <>
              <Link
                href="/profile"
                className="group cursor-pointer flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-2 transition
                           hover:bg-white/[0.06] hover:border-white/20"
              >
                {session.user?.image ? (
                  <img
                    src={session.user.image}
                    alt="Profile"
                    className="h-8 w-8 rounded-full object-cover border border-white/10"
                  />
                ) : (
                  <div className="h-8 w-8 rounded-full bg-white/10 border border-white/10" />
                )}

                <span className="hidden sm:inline text-sm font-semibold text-gray-200 group-hover:text-white transition">
                  {session.user?.name ?? "Profile"}
                </span>
              </Link>

              <SignOut />
            </>
          ) : (
            <SignIn />
          )}
        </div>
      </div>
    </nav>
  );
}
