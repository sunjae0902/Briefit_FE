"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { NewsSummary } from "@/types/news/newsSummary";
import { DetailPageType } from "@/constants/detailPageType";
import PaginatedNewsCarousel from "@/features/common/PaginatedNewsCarousel";

interface Props {
  newsList: NewsSummary[];
  categoryLabel: string | null;
  itemsPerPage: number;
  totalCount: number;
  currentPage: number;
  type: DetailPageType;
}

export default function PaginatedNewsCardListClient({
  newsList,
  categoryLabel,
  itemsPerPage,
  totalCount,
  currentPage,
  type,
}: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <PaginatedNewsCarousel
      newsList={newsList}
      itemsPerPage={itemsPerPage}
      categoryLabel={categoryLabel}
      type={type}
      totalCount={totalCount}
      currentPage={currentPage}
      onPageChanged={handlePageChange}
    />
  );
}