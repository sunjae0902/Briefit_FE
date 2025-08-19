import RefreshOnBackWrapper from "@/components/RefreshOnBackWrapper";
import RecommendedNews from "@/features/recommended-news/components/RecommendedNews";

// recommended-news/page.tsx
export default function RecommendedNewsPage({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  return (
    <div className="space-y-15">
      <div className="font-title-24">나의 추천 뉴스</div>
      <RefreshOnBackWrapper>
        <RecommendedNews />
      </RefreshOnBackWrapper>
    </div>
  );
}