"use client";

import { useEffect, useState } from "react";
import { NewsSummary } from "@/types/news/newsSummary";
import fetchRecommendedNewsCardList from "../api/news";
import RecommendedNewsCardList from "./RecommendedNewsCardList";
import NoContent from "@/features/common/NoContent";
import LoadingSpinner from "@/components/LoadingSpinner";
import { isLoggedInUser, useAuthStore } from "@/stores/auth/useAuthStore";
import { useDeviceStore } from "@/stores/device/useDeviceStore";
import RecommendedNewsCarouselList from "./RecommendedNewsCarouselList";

export default function RecommendedNews() {
  const isMobile = useDeviceStore((state) => state.isMobile);

  const isUser = useAuthStore(isLoggedInUser);
  const [newsList, setNewsList] = useState<NewsSummary[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isUser) return;
    const fetchData = async () => {
      try {
        const data = await fetchRecommendedNewsCardList({
          selectedCategory: "전체",
          selectedPressCompanyName: "전체",
        });
        setNewsList(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("추천 뉴스 불러오기 실패", error);
        setNewsList([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (!isUser) {
    return <NoContent message="로그인 후 이용할 수 있어요." />;
  }
  if (loading) {
    return <LoadingSpinner />;
  }
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
      {sortedCategories.map((categoryLabel) =>
        isMobile ? (
          <RecommendedNewsCarouselList
            key={categoryLabel}
            categoryLabel={categoryLabel}
            newsList={newsByCategory[categoryLabel] ?? []}
          />
        ) : (
          <RecommendedNewsCardList
            key={categoryLabel}
            categoryLabel={categoryLabel}
            newsList={newsByCategory[categoryLabel] ?? []}
          />
        ),
      )}
    </div>
  );
}
