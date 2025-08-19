"use client";

import { useEffect, useState } from "react";
import { NewsSummary } from "@/types/news/newsSummary";
import fetchRecommendedNewsCardList from "../api/news";
import RecommendedNewsCardList from "./RecommendedNewsCardList";
import NoContent from "@/features/common/NoContent";

export default function RecommendedNews() {
  const [newsList, setNewsList] = useState<NewsSummary[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchRecommendedNewsCardList({
          selectedCategory: "전체",
        });
        setNewsList(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("추천 뉴스 불러오기 실패", error);
        setNewsList([]);
      } 
    };

    fetchData();
  }, []);

  if (!newsList || newsList.length === 0) {
    return <NoContent message="불러올 추천 뉴스가 없어요." />;
  }

  const newsByCategory: Record<string, NewsSummary[]> = {};

  for (const news of newsList) {
    const category = news.categories[0] || "기타";
    if (!newsByCategory[category]) {
      newsByCategory[category] = [news];
    } else if (newsByCategory[category].length < 14) {
      newsByCategory[category].push(news);
    }
  }

  const sortedCategories = Object.keys(newsByCategory).sort((a, b) =>
    a.localeCompare(b, "ko"),
  );

  return (
    <div>
      {sortedCategories.map((category) => (
        <RecommendedNewsCardList
          key={category}
          category={category}
          newsList={newsByCategory[category] ?? []}
        />
      ))}
    </div>
  );
}
