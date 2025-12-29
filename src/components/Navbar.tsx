import { auth } from "@/auth";
import SignIn from "./Signin";
import SignOut from "./Signout";

export default async function Navbar() {
  const session = await auth();

  return (
    <nav className="bg-gray-800 p-4 flex justify-between items-center text-white">
      <div className="text-lg font-bold">Song Vault</div>
      <div>
        {session ? (
          <div className="bg-red-500 hover:bg-red-700 px-4 py-2 rounded">
            <SignOut />
          </div>
        ) : (
          <div className="bg-red-500 hover:bg-red-700 px-4 py-2 rounded">
            <SignIn />
          </div>
        )}
      </div>
    </nav>
  );
}
