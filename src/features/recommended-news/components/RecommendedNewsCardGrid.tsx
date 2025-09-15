"use client";

import { useEffect, useState } from "react";
import { DetailPageType } from "@/constants/detailPageType";
import PaginatedNewsCardGrid from "@/features/common/PaginatedNewsCardGrid";
import fetchRecommendedNewsCardList from "../api/news";
import NoContent from "@/features/common/NoContent";
import { NewsSummary } from "@/types/news/newsSummary";
import LoadingSpinner from "@/components/LoadingSpinner";

const ITEMS_PER_PAGE = 6;

export default function RecommendedNewsCardGridByCategory({
  categoryLabel,
  selectedPressCompanyName,
  className,
}: {
  categoryLabel: string | null;
    selectedPressCompanyName: string | null;
  className?: string;
}) {
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
    <div className="mt-45">
      {newsList.length === 0 ? (
        <NoContent message="불러올 뉴스가 없어요." />
      ) : (
        <PaginatedNewsCardGrid
          newsList={newsList}
          itemsPerPage={ITEMS_PER_PAGE}
          categoryLabel={categoryLabel}
          type={DetailPageType.TODAY}
          className={className}
        />
      )}
    </div>
  );
}