"use client";

import { NewsCard } from "@/features/common/news-card/NewsCard";
import { DetailPageType } from "@/constants/detailPageType";
import { NewsSummary } from "@/types/news/newsSummary";
import NewsPagination from "@/features/common/NewsPagination";

export interface NewsCardGridProps {
  newsList: NewsSummary[];
  categoryLabel: string | null;
  type: DetailPageType;
  totalCount: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChanged: (page: number) => void;
}

export default function PaginatedNewsCardGrid({
  newsList,
  categoryLabel,
  type,
  totalCount,
  itemsPerPage,
  currentPage,
  onPageChanged,
}: NewsCardGridProps) {

  return (
    <div className="space-y-40">
      <div className="grid grid-cols-1 gap-20 pc:grid-cols-3">
        {newsList.map((news, index) => (
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
        itemCount={itemsPerPage}
        stepCount={9}
        onPageChange={onPageChanged}
        currentPage={currentPage}
      />
    </div>
  );
}