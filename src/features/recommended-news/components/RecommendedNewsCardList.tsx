"use client";

import React from "react";
import { DetailPageType } from "@/constants/detailPageType";
import { NewsCard } from "@/features/common/NewsCard";
import { dummyNews } from "@/mock/dummyNews";
import { MoreCardButton } from "@/features/common/MoreCardButton";
import { newsCategories } from "@/constants/newsCategries";

export default function RecommendedNewsCardList({
  category,
}: {
  category: string;
}) {
  const categoryLabel =
    newsCategories.find((cat) => cat.label === category)?.name ?? "";

  return (
    <div className="mb-30 w-screen">
      <div className="font-title-20 text-gray-500">{category}</div>
      <div
        className="mt-30 flex gap-20 overflow-x-scroll p-2 mr-20"
        style={{
          scrollbarWidth: "thin",
        //   msOverflowStyle: "none",
        }}
      >
        {dummyNews.map((news, index) => (
          <NewsCard
            key={index}
            type={DetailPageType.RECOMMENDED}
            categoryLabel={category}
            newsSummary={news}
            className="w-[25vw]"
          />
        ))}

        {dummyNews.length > 15 && (
          <MoreCardButton
            type={DetailPageType.RECOMMENDED}
            categoryLabel={categoryLabel}
            className="w-[25vw]"
          />
        )}
      </div>
    </div>
  );
}
