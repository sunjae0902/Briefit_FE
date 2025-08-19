export const dynamic = "force-dynamic";

import { NewsSummary } from "@/types/news/newsSummary";
import fetchRecommendedNewsCardList from "../api/news";
import RecommendedNewsCardList from "./RecommendedNewsCardList";
import NoContent from "@/features/common/NoContent";

export default async function RecommendedNews() {
  const newsList = (await fetchRecommendedNewsCardList({
    selectedCategory: "전체",
  })) as NewsSummary[];

  const newsByCategory: Record<string, NewsSummary[]> = {};

  if (!Array.isArray(newsList)) {
    return <NoContent message="불러올 추천 뉴스가 없어요." />;
  }

  for (const news of newsList) {
    const category = news.categories[0];

    if (!newsByCategory[category]) {
      newsByCategory[category] = [news];
    } else if (newsByCategory[category].length < 14) {
      newsByCategory[category].push(news);
    }
  }

  // 카테고리 정렬 (가나다순)
  const sortedCategories = Object.keys(newsByCategory).sort((a, b) =>
    a.localeCompare(b, "ko"),
  );

  return (
    <div>
      {newsList.length === 0 ? (
        <NoContent message={"불러올 뉴스가 없어요."} />
      ) : (
        sortedCategories.map((category) => (
          <RecommendedNewsCardList
            key={category}
            category={category}
            newsList={newsByCategory[category] ?? []}
          />
        ))
      )}
    </div>
  );
}
