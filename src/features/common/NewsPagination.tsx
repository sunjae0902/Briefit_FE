"use client";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationLink,
} from "@/components/ui/pagination";
import { useState } from "react";

type NewsPaginationProps = {
    totalCount: number; // 전체 뉴스 개수
    itemsPerPage: number;
  onPageChange: (page: number) => void;
};

export default function NewsPagination({
    totalCount,
    itemsPerPage,
  onPageChange,
}: NewsPaginationProps) {
  const ITEMS_PER_PAGE = itemsPerPage;
  const PAGES_PER_STEP = 9;
  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);
  const totalSteps = Math.ceil(totalPages / PAGES_PER_STEP);
  const [currentPage, setCurrentPage] = useState(1);
  const currentStep = Math.floor((currentPage - 1) / PAGES_PER_STEP);

  // 보여줄 페이지 범위 계산
  const getPageNumbers = () => {
    let start = Math.max(currentStep * (PAGES_PER_STEP + 1), 1);
    let end = Math.min(
      currentStep * (PAGES_PER_STEP + 1) + PAGES_PER_STEP,
      totalPages,
    );
    const pages = [];
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    onPageChange(page);
  };

  return (
    <Pagination>
      <PaginationContent>
        {currentStep > 0 && (
          <PaginationItem className="w-28">
            <PaginationPrevious
              href="#" // 페이지 상단으로 이동
              onClick={() =>
                handlePageChange((currentStep - 1) * (PAGES_PER_STEP + 1) + 1)
              }
            />
          </PaginationItem>
        )}

        {/* 페이지 숫자들 */}
        {getPageNumbers().map((page) => (
          <PaginationItem key={page}>
            <PaginationLink
              href="#"
              isActive={currentPage === page}
              onClick={() => handlePageChange(page)}
              className={`font-basic-20 ${
                currentPage === page ? "text-purple-500" : "text-gray-400"
              }`}
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}

        {/* 다음 페이지 화살표 */}
        {currentStep < totalSteps - 1 && (
          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={() =>
                handlePageChange((currentStep + 1) * (PAGES_PER_STEP + 1))
              }
            />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
}
