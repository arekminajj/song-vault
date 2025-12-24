'use client';

import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (!session) {
    return <div>Please sign in to view your Spotify data.</div>;
  }

  const user = session.user;

  return (
    <p>hello {session.user.email}</p>
  );
}