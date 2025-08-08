import RefreshOnBackWrapper from "@/components/RefreshOnBackWrapper";
import RecommendedNews from "@/features/recommended-news/components/RecommendedNews";

export default function RecommendedNewsPage() {
  
  return (
    <div className="space-y-15">
      <div className="font-title-24">나의 추천 뉴스</div>
      <RefreshOnBackWrapper>
        <RecommendedNews />
      </RefreshOnBackWrapper>
    </div>
  );
}
