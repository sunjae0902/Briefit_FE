// import RefreshOnBackWrapper from "@/components/RefreshOnBackWrapper";
import fetchRecommendedNewsCardList from "@/features/recommended-news/api/news";
import RecommendedNews from "@/features/recommended-news/components/RecommendedNews";
import { NewsSummary } from "@/types/news/newsSummary";

export default async function RecommendedNewsPage() {
   const newsList = (await fetchRecommendedNewsCardList({
     selectedCategory: "전체",
   })) as NewsSummary[];
  
  return (
    <div className="space-y-15">
      <div className="font-title-24">나의 추천 뉴스</div>
      {/* <RefreshOnBackWrapper> */}
      <RecommendedNews data={newsList}/>
      {/* </RefreshOnBackWrapper> */}
    </div>
  );
}
