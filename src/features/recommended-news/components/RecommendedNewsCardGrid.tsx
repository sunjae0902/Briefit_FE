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
  const [currentPage, setCurrentPage] = useState(1);
  const [newsList, setNewsList] = useState<NewsSummary[]>([]);
  const [itemsPerPage, setItemsPerPage] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function loadNews() {
      setLoading(true);
      try {
        const newsCardListResponse = await fetchRecommendedNewsCardList({
          selectedCategory: categoryLabel ?? "",
          selectedPressCompanyName: selectedPressCompanyName ?? "전체",
          page: currentPage,
        });
        if (mounted) {
          setNewsList(newsCardListResponse.articleInfos);
          setItemsPerPage(newsCardListResponse.limit);
          setTotalCount(newsCardListResponse.totalCount);
        }
      } finally {
        if (mounted) setLoading(false);
      }
    }

    loadNews();

    return () => {
      mounted = false;
    };
  }, [categoryLabel, selectedPressCompanyName, currentPage]);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="pc:mt-45 sm:mt-15">
      {newsList.length === 0 ? (
        <NoContent message="불러올 뉴스가 없어요." />
      ) : isMobile ? (
        <PaginatedNewsCarousel
            newsList={newsList}
            itemsPerPage={itemsPerPage} 
            categoryLabel={categoryLabel}
            type={DetailPageType.TODAY}
            totalCount={totalCount}
            currentPage={currentPage}
            onPageChanged={(page) => setCurrentPage(page)} />
      ) : (
        <PaginatedNewsCardGrid
          newsList={newsList}
          totalCount={totalCount}
          itemsPerPage={itemsPerPage}
          categoryLabel={categoryLabel}
          currentPage={currentPage}
          onPageChanged={(page) => setCurrentPage(page)}
          type={DetailPageType.TODAY}
        />
      )}
    </div>
  );
}
