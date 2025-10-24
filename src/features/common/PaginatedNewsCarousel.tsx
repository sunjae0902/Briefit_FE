"use client";

import { useState } from "react";
import { DetailPageType } from "@/constants/detailPageType";
import { NewsSummary } from "@/types/news/newsSummary";
import NewsPagination from "@/features/common/NewsPagination";
import { MobileNewsCard } from "./news-card/MobileNewsCard";

interface NewsCardGridProps {
  newsList: NewsSummary[];
  categoryLabel: string | null;
  itemsPerPage: number;
  type: DetailPageType;
}

export default function PaginatedNewsCarousel({
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
    <div className="space-y-10">
      <div
        className="grid grid-cols-1 gap-14"
      >
        {paginatedNews.map((news, index) => (
          <MobileNewsCard
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