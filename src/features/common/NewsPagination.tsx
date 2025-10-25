"use client";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationLink,
} from "@/components/ui/pagination";

type NewsPaginationProps = {
  totalCount: number; // 전체 뉴스 개수
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

export default function NewsPagination({
  totalCount,
  itemsPerPage,
  currentPage,
  onPageChange,
}: NewsPaginationProps) {
  const ITEMS_PER_PAGE = itemsPerPage; // 한 페이지 당 보여지는 기사 수
  const PAGES_PER_STEP = 9; // 한 번에 보여지는 최대 페이징 단계 수
  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE); // 필요한 총 페이지 수
  const totalSteps = Math.ceil(totalPages / PAGES_PER_STEP); // 필요한 총 페이징 단계 수
  const currentStep = Math.floor((currentPage - 1) / PAGES_PER_STEP);

  // 보여줄 페이지 범위 계산
  const getPageNumbers = () => {
    const start = currentStep * PAGES_PER_STEP + 1;
    const end = Math.min(start + PAGES_PER_STEP - 1, totalPages);
    const pages = [];
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  const handlePageChange = (page: number) => {
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
                handlePageChange((currentStep - 1) * PAGES_PER_STEP + 1)
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
          <PaginationItem className="w-28">
            <PaginationNext
              href="#"
              onClick={() =>
                handlePageChange((currentStep + 1) * PAGES_PER_STEP + 1)
              }
            />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
}
