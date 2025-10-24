"use client";

import { useState } from "react";
import { NewsCard } from "@/features/common/news-card/NewsCard";
import { DetailPageType } from "@/constants/detailPageType";
import { NewsSummary } from "@/types/news/newsSummary";
import NewsPagination from "@/features/common/NewsPagination";

interface NewsCardGridProps {
  newsList: NewsSummary[];
  categoryLabel: string | null;
  itemsPerPage: number;
  type: DetailPageType;
}

export default function PaginatedNewsCardGrid({
  newsList,
  categoryLabel,
  itemsPerPage = 9,
  type,
}: NewsCardGridProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalCount = newsList.length;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedNews = newsList.slice(startIndex, endIndex);

  return (
    <div className="space-y-40">
      <div
        className="grid grid-cols-1 gap-20 pc:grid-cols-3"
      >
        {paginatedNews.map((news, index) => (
          <NewsCard
            key={index}
            type={type}
            categoryLabel={categoryLabel}
            newsSummary={news}
            className="hover-card-purple"
          />
        ))}
      </div>
      <NewsPagination
        totalCount={totalCount}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}