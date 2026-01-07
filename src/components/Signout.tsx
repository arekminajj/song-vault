import { signOut } from "@/auth";

export default function SignOut() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <button
        type="submit"
        className="cursor-pointer rounded-full border border-white/15 bg-white/[0.03] px-4 py-2 text-sm font-semibold text-white transition
                   hover:bg-white/[0.06] hover:border-white/25 focus:outline-none focus:ring-2 focus:ring-white/20"
      >
        Sign out
      </button>
    </form>
  );
}
