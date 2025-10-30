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
import { useUserStore } from "@/stores/auth/useUserStore";

export default function RecommendedNews() {
  const isMobile = useDeviceStore((state) => state.isMobile);
  const isUser = useAuthStore(isLoggedInUser);
  const userCategories = useUserStore((state) => state.categories);

  const [newsByCategory, setNewsByCategory] = useState<
    Record<string, NewsSummary[]>
  >({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isUser || !userCategories || userCategories.length === 0) {
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      // 카테고리마다 뉴스 조회 요청 병렬 처리
      const promises = userCategories.map((category) =>
        fetchRecommendedNewsCardList({
          selectedCategory: category.label,
          selectedPressCompanyName: "전체",
          page: 1,
        })
          .then((res) => {
            const articles = Array.isArray(res.articleInfos)
              ? res.articleInfos
              : [];
            // 응답이 오는 즉시 상태 업데이트 (부분 렌더링)
            setNewsByCategory((prev) => ({
              ...prev,
              [category.label]: articles,
            }));
          })
          .catch((error) => {
            console.error(`카테고리 [${category.label}] 뉴스 불러오기 실패`, error);
            setNewsByCategory((prev) => ({
              ...prev,
              [category.label]: [],
            }));
          }),
      );

      // 모든 요청이 끝나면 로딩 false
      await Promise.allSettled(promises);
      setLoading(false);
    };

    fetchData();
  }, [isUser, userCategories]);

  if (!isUser) return <NoContent message="로그인 후 이용할 수 있어요." />;

  const categoryKeys = Object.keys(newsByCategory);
  const hasAnyNews = categoryKeys.some(
    (key) => newsByCategory[key]?.length > 0,
  );

  if (!loading && !hasAnyNews)
    return <NoContent message="불러올 추천 뉴스가 없어요." />;

  return (
    <div>
      {userCategories.map((category, index) =>
        isMobile ? (
          <RecommendedNewsCarouselList
            key={index}
            categoryLabel={category.label}
            newsList={newsByCategory[category.label] ?? []}
          />
        ) : (
          <RecommendedNewsCardList
            key={index}
            categoryLabel={category.label}
            newsList={newsByCategory[category.label] ?? []}
          />
        ),
      )}
      {loading && <LoadingSpinner />}
    </div>
  );
}