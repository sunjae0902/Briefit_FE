"use client";

import NewsPagination from "@/features/common/NewsPagination";
import { MobileNewsCard } from "./news-card/MobileNewsCard";
import { NewsCardGridProps } from "./PaginatedNewsCardGrid";

export default function PaginatedNewsCarousel({
  newsList,
  categoryLabel,
  type,
  totalCount,
  itemsPerPage,
  currentPage,
  onPageChanged,
}: NewsCardGridProps) {

  return (
    <div className="space-y-10">
      <div className="grid grid-cols-1 gap-14">
        {newsList.map((news, index) => (
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
        itemCount={itemsPerPage}
        stepCount={5}
        onPageChange={onPageChanged}
        currentPage={currentPage}
      />
    </div>
  );
}