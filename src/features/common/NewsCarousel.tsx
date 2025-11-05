"use client";

import { useState, useEffect } from "react";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { DetailPageType } from "@/constants/detailPageType";
import { NewsSummary } from "@/types/news/newsSummary";
import { cn } from "@/lib/utils";
import { MobileNewsCard } from "./news-card/MobileNewsCard";

export function NewsCarousel({
  type,
  categoryLabel,
  newsList,
  themeColor,
  children,
}: {
  type: DetailPageType;
  categoryLabel: string | null;
  newsList: NewsSummary[];
  themeColor?: string | null;
  children?: React.ReactNode;
}) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  // 추후 수정
  const totalSlides = Math.min(10, Math.ceil(newsList.length / 2));

  useEffect(() => {
    if (!api) {
      return;
    }
    setCurrent(api.selectedScrollSnap());
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  // 2개씩 보여줌
  const groupedNews = [];
  for (let i = 0; i < newsList.length; i += 2) {
    groupedNews.push(newsList.slice(i, i + 2));
  }

  return (
    <>
      <Carousel
        opts={{
          align: "start",
          loop: false,
        }}
        setApi={setApi}
        className="w-full"
      >
        <CarouselContent>
          {groupedNews.map((group, index) => (
            <CarouselItem key={index}>
              <div className="flex flex-col gap-14 mb-6">
                {group.map((newsSummary, subIndex) => (
                  <MobileNewsCard
                    key={subIndex}
                    type={type}
                    categoryLabel={categoryLabel}
                    newsSummary={newsSummary}
                    className="hover-card-purple"
                    themeColor={themeColor}
                  >
                    {children}
                  </MobileNewsCard>
                ))}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      {/* 하단 인디케이터 */}
      <div className="mt-10 flex justify-center gap-6">
        {Array.from({ length: totalSlides }).map((_, index) => (
          <button
            key={index}
            className={cn(
              "size-6 rounded-full transition-colors",
              current === index ? "bg-gray-400" : "bg-gray-100",
            )}
            onClick={() => api?.scrollTo(index)}
          />
        ))}
      </div>
    </>
  );
}
