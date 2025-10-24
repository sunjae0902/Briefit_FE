"use client";

import { DetailPageType } from "@/constants/detailPageType";
import { NewsSummary } from "@/types/news/newsSummary";
import { NewsCarousel } from "@/features/common/NewsCarousel";
import { useRouter } from "next/navigation";
import { newsCategories } from "@/constants/newsCategries";

export default function RecommendedNewsCarouselList({
  categoryLabel,
  newsList,
}: {
  categoryLabel: string;
  newsList: NewsSummary[];
}) {
    const router = useRouter();
    const categoryName = newsCategories.findLast((category) => category.label == categoryLabel)?.name;
  return (
    <div className="mb-30">
      <div className="mb-10 font-title-16 text-gray-500" onClick={() => router.push(`/recommended-news/${categoryName}`)}>
        {categoryLabel}
      </div>
      <NewsCarousel
        type={DetailPageType.RECOMMENDED}
        categoryLabel={categoryLabel}
        newsList={newsList}
      />
    </div>
  );
}
