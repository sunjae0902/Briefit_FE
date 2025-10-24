import RefreshOnBackWrapper from "@/components/RefreshOnBackWrapper";
import RecommendedNews from "@/features/recommended-news/components/RecommendedNews";

export default function RecommendedNewsPage() {  
  return (
    <div className="space-y-14 sm:p-20">
      <div className="font-title-24 sm:hidden">나의 추천 뉴스</div>
      <div className="font-title-20 pc:hidden">나의 추천 뉴스</div>
      <RefreshOnBackWrapper>
        <RecommendedNews />
      </RefreshOnBackWrapper>
    </div>
  );
}
