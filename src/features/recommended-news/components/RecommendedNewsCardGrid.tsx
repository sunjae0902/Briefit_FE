"use client";

import { DetailPageType } from "@/constants/detailPageType";
import { dummyNews } from "@/mock/dummyNews";
import PaginatedNewsCardGrid from "@/features/common/PaginatedNewsCardGrid";

const ITEMS_PER_PAGE = 6;

export default function RecommendedNewsCardGrid({
  categoryLabel,
  className,
}: {
  categoryLabel: string | null;
  className?: string;
}) {
  return (
    <div className="mt-45">
      <PaginatedNewsCardGrid
        newsList={dummyNews}
        itemsPerPage={ITEMS_PER_PAGE}
        categoryLabel={categoryLabel}
        type={DetailPageType.TODAY}
        className={className}
      />
    </div>
  );
}
