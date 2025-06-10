"use client";

import { useState } from "react";
import { NewsCard } from "@/features/common/NewsCard";
import { DetailPageType } from "@/constants/detailPageType";
import { NewsSummary } from "@/types/news/newsSummary";
import NewsPagination from "@/features/common/NewsPagination";

const ITEMS_PER_PAGE = 9;

export default function TodayNewsCardGrid({
  categoryLabel,
  className,
}: {
  categoryLabel: string | null;
  className?: string;
}) {
  const [currentPage, setCurrentPage] = useState(1);

  const dummyNews: NewsSummary[] = Array.from({ length: 50 }, (_, i) => ({
    articleId: i + 1,
    categories: ["정치", "경제"],
    title: `AI 기술로 변화하는 글로벌 뉴스 산업 (${i + 1})`,
    body: "최근 인공지능 기술의 발전으로 뉴스 제작과 편집 과정이 자동화되고 있습니다. 특히 요약, 번역, 추천 시스템에서 두각을 나타내고 있습니다.",
    imageUrl:
      "https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80",
    pressCompanies: ["한국일보", "중앙일보", "국민일보"],
  }));

  const totalCount = dummyNews.length;
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedNews = dummyNews.slice(startIndex, endIndex);

  return (
    <div>
      <div className={`${className} grid grid-cols-1 gap-16 sm:grid-cols-2 lg:grid-cols-3`}>
        {paginatedNews.map((news, index) => (
          <NewsCard
            key={index}
            type={DetailPageType.TODAY}
            categoryLabel={categoryLabel}
            newsSummary={news}
          />
        ))}
      </div>
      <NewsPagination
        totalCount={totalCount}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
}
