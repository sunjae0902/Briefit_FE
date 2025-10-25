"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { NewsCard } from "@/features/common/news-card/NewsCard";
import { DetailPageType } from "@/constants/detailPageType";
import { NewsSummary } from "@/types/news/newsSummary";
import NewsPagination from "@/features/common/NewsPagination";

interface NewsCardGridProps {
  newsList: NewsSummary[];
  categoryLabel: string | null;
  totalCount: number;
  itemsPerPage: number;
  currentPage: number;
  type: DetailPageType;
}

export default function PaginatedNewsCardGridClient({
  newsList,
  categoryLabel,
  totalCount,
  itemsPerPage,
  currentPage,
  type,
}: NewsCardGridProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());
    router.push(`${pathname}?${params.toString()}`); // 기존 경로 유지 + page만 변경
  };

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
        itemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
        currentPage={currentPage}
      />
    </div>
  );
}
