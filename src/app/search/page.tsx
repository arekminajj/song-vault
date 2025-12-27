import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { searchAll } from "@/lib/spotify/spotify";

import { getServerSession } from "next-auth";


interface Props {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}

export default async function SearchPage({ searchParams }: Props) {
  const session = await getServerSession(authOptions);

  const filters = await searchParams; 
  const query = filters.query ?? '';
  
  const serachResults = await searchAll(query, 0)

  return <div>{serachResults[0].name}</div>;
}