import { signIn } from "@/auth";

export default function SignIn() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("spotify");
      }}
    >
      <button
        type="submit"
        className="cursor-pointer rounded-full bg-green-500 px-4 py-2 text-sm font-semibold text-black transition
                   hover:bg-green-400 focus:outline-none focus:ring-2 focus:ring-green-500/40"
      >
        Sign in
      </button>
    </form>
  );
}
