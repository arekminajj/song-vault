"use server";

import { auth } from "@/auth";

export default async function Home() {
  const session = await auth();

  const user = session?.user;

  return (
    <div>
      {session ? <p>Hello {user?.name}</p> : <p>Sign in to see your name</p>}
    </div>
  );
}
