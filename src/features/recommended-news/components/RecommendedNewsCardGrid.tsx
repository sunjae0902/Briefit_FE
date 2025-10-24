"use client";

import { useEffect, useState } from "react";
import { DetailPageType } from "@/constants/detailPageType";
import PaginatedNewsCardGrid from "@/features/common/PaginatedNewsCardGrid";
import fetchRecommendedNewsCardList from "../api/news";
import NoContent from "@/features/common/NoContent";
import { NewsSummary } from "@/types/news/newsSummary";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useDeviceStore } from "@/stores/device/useDeviceStore";
import PaginatedNewsCarousel from "@/features/common/PaginatedNewsCarousel";


export default function RecommendedNewsCardGridByCategory({
  categoryLabel,
  selectedPressCompanyName,
}: {
  categoryLabel: string | null;
    selectedPressCompanyName: string | null;
  className?: string;
  }) {
  const isMobile = useDeviceStore((state) => state.isMobile);

  const [newsList, setNewsList] = useState<NewsSummary[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function loadNews() {
      setLoading(true);
      try {
        const result = await fetchRecommendedNewsCardList({
          selectedCategory: categoryLabel ?? "",
          selectedPressCompanyName: selectedPressCompanyName ?? "전체",
        });
        if (mounted) setNewsList(result);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    loadNews();

    return () => {
      mounted = false;
    };
  }, [categoryLabel, selectedPressCompanyName]);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="sm:mt-15 pc:mt-45">
      {newsList.length === 0 ? (
        <NoContent message="불러올 뉴스가 없어요." />
      ) : isMobile ? (
        <PaginatedNewsCarousel
          newsList={newsList}
          itemsPerPage={10} // 추후 변경 가능
          categoryLabel={categoryLabel}
          type={DetailPageType.TODAY}
        />
      ) : (
        <PaginatedNewsCardGrid
          newsList={newsList}
          itemsPerPage={6}
          categoryLabel={categoryLabel}
          type={DetailPageType.TODAY}
        />
      )}
    </div>
  );
}