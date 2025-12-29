import { searchAll } from "@/lib/spotify/spotify";
import SearchBar from "@/components/explore/SearchBar";
import SearchResults from "@/components/explore/SearchResults";
import DefaultExplore from "@/components/explore/DefaultExplore";

type Props = {
  searchParams: Promise<{ query?: string }>;
};

export default async function ExplorePage({ searchParams }: Props) {
  const { query } = await searchParams;
  const trimmedQuery = query?.trim() ?? "";

  const results = trimmedQuery ? await searchAll(trimmedQuery, 0) : null;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <SearchBar initialQuery={trimmedQuery} />

      <div className="mt-10">
        {trimmedQuery && results ? (
          <SearchResults query={trimmedQuery} results={results} />
        ) : (
          <DefaultExplore />
        )}
      </div>
    </div>
  );
}