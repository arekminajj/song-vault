import { auth } from "@/auth";
import SignIn from "./Signin";
import SignOut from "./Signout";
import Link from "next/link";

export default async function Navbar() {
  const session = await auth();

  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-gray-900/80 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4">
        <div className="flex items-center space-x-8">
          <Link
            href="/"
            className="text-lg font-semibold tracking-tight hover:text-green-400 transition"
          >
            Song Vault
          </Link>

          <div className="hidden md:flex items-center space-x-6 text-sm">
            <Link
              href="/explore"
              className="text-gray-300 hover:text-white transition"
            >
              Explore
            </Link>
            <Link
              href="/top"
              className="text-gray-300 hover:text-white transition"
            >
              Listening stats
            </Link>
          </div>
        </div>

        <div className="flex items-center space-x-4 text-sm">
          {session ? (
            <>
              <Link
                href="/profile"
                className="flex items-center space-x-2 rounded-full px-3 py-1 hover:bg-white/10 transition"
              >
                {session.user?.image ? (
                  <img
                    src={session.user.image}
                    alt="Profile"
                    className="h-7 w-7 rounded-full"
                  />
                ) : (
                  <div className="h-7 w-7 rounded-full bg-gray-600" />
                )}

                <span className="hidden sm:inline text-gray-200">
                  {session.user?.name ?? "Profile"}
                </span>
              </Link>

              <span className="text-gray-400 hover:text-white transition cursor-pointer">
                <SignOut />
              </span>
            </>
          ) : (
            <span className="text-gray-300 hover:text-white transition cursor-pointer">
              <SignIn />
            </span>
          )}
        </div>
      </div>
    </nav>
  );
}
