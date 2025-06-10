import RecommendedNewsCardList from "@/features/recommended-news/components/RecommendedNewsCardList";

const categories = ["정치", "경제"];

export default function RecommendedNewsPage() {
  
  return (
    <div className="space-y-15">
      <div className="font-title-24">나의 추천 뉴스</div>
      {categories.map((category, index) => (
        <RecommendedNewsCardList key={index} category={category} />
      ))}
    </div>
  );
}
