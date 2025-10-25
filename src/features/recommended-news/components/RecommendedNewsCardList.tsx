"use client";

import React, { useEffect, useRef, useState } from "react";
import { DetailPageType } from "@/constants/detailPageType";
import { NewsCard } from "@/features/common/news-card/NewsCard";
import { MoreCardButton } from "@/features/common/MoreCardButton";
import { NewsSummary } from "@/types/news/newsSummary";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { newsCategories } from "@/constants/newsCategries";

export default function RecommendedNewsCardList({
  categoryLabel,
  newsList,
}: {
  categoryLabel: string;
  newsList: NewsSummary[];
}) {
  const categoryName =
    newsCategories.findLast((category) => category.label == categoryLabel)
      ?.name ?? "";

  const scrollRef = useRef<HTMLDivElement>(null);
  const [isScrollableRight, setIsScrollableRight] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    handleScroll();
  }, []);

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setIsScrolled(scrollLeft > 0);
      setIsScrollableRight(scrollLeft + clientWidth < scrollWidth - 1);
    }
  };

  const scrollByCards = (direction: "left" | "right") => {
    const container = scrollRef.current;
    if (!container) return;

    const cardWidth = container.offsetWidth * 0.25; // w-[25vw]
    const scrollAmount = cardWidth * 3;

    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <div className="mb-30">
      <div className="mb-30 font-title-20 text-gray-500">{categoryLabel}</div>

      <div
        className="relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* 카드 리스트 */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex w-[90vw] gap-20 overflow-x-scroll p-2 pr-20"
          style={{
            scrollbarWidth: "none",
          }}
        >
          {newsList.map((news, index) => (
            <NewsCard
              key={index}
              type={DetailPageType.RECOMMENDED}
              categoryLabel={categoryLabel}
              newsSummary={news}
              className="hover-card-purple w-[25vw] shrink-0"
            />
          ))}

          {/* {newsList.length >= itemsPerPage && ( */}
            <MoreCardButton
              type={DetailPageType.RECOMMENDED}
              categoryName={categoryName}
              className="w-[25vw] shrink-0"
            />
          {/* )} */}
        </div>

        {/* 좌우 화살표 */}
        {isHovered && isScrolled && (
          <Button
            onClick={() => scrollByCards("left")}
            variant="ghost"
            className="absolute top-1/2 left-0 -translate-y-1/2 cursor-pointer hover:bg-transparent"
          >
            <Image
              src="/assets/left-arrow.png"
              alt="이전"
              width={38}
              height={38}
            />
          </Button>
        )}
        {isScrollableRight && isHovered && (
          <Button
            onClick={() => scrollByCards("right")}
            variant="ghost"
            className="absolute top-1/2 right-0 -translate-y-1/2 cursor-pointer hover:bg-transparent"
          >
            <Image
              src="/assets/right-arrow.png"
              alt="다음"
              width={38}
              height={38}
            />
          </Button>
        )}
      </div>
    </div>
  );
}
