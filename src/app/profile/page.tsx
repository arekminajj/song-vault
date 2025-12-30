import { auth } from "@/auth";
import WebPlayer from "@/components/WebPlayer";

export default async function ProfilePage() {
  const session = await auth()

  if (!session)
    return <div className="p-8 text-center text-gray-400">Login required</div>;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <WebPlayer session={session} />
    </div>
  );
}
