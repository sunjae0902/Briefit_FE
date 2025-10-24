import SearchResult from "@/features/search/components/SearchResult";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ keyword: string; company: string }>;
}) {
  const { keyword, company } = await searchParams;

  return <SearchResult keyword={keyword} selectedPressCompanyName={company} />;
}
