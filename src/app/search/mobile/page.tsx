import MobileSearchHeader from "@/features/search/components/MobileSearchHeader";
import MobileSearchResult from "@/features/search/components/MobileSearchResult";

export default async function MobileSearchPage({
  searchParams,
}: {
  searchParams: Promise<{ keyword: string; company: string, page: number }>;
}) {
  const { keyword, company, page } = await searchParams;
  return (
    <div>
      <MobileSearchHeader />
      {keyword && (
        <MobileSearchResult
          keyword={keyword}
          selectedPressCompanyName={company}
          page={page}
        />
      )}
    </div>
  );
}
