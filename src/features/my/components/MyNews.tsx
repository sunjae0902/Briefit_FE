"use client";

import { useEffect, useState } from "react";
import { DetailPageType } from "@/constants/detailPageType";
import { NewsCard } from "@/features/common/NewsCard";
import NewsCategoryBar from "@/features/common/NewsCategorybar";
import { fetchCustomNewsList, fetchScrapedNewsList } from "../api/myNews";
import { MyNewsType } from "@/constants/myNewsType";
import { NewsSummary } from "@/types/news/newsSummary";
import NoContent from "@/features/common/NoContent";
import { NewsCardActions } from "./NewsCardActions";
import { getCookie } from "cookies-next";

export default function MyNews({
  myNewsType,
  categoryLabel,
}: {
  myNewsType: MyNewsType;
  categoryLabel: string | null;
  }) {
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = getCookie("accessToken");
    setIsLoggedIn(!!token);
  }, []);
  const [newsList, setNewsList] = useState<NewsSummary[] | null>(null);

  useEffect(() => {
    if (!isLoggedIn) {
      setNewsList(null);
      return;
    }

    const fetchNews = async () => {
      let result;

      if (myNewsType === MyNewsType.SCRAP) {
        const response = await fetchScrapedNewsList({
          selectedCategory: categoryLabel ?? "전체",
        });

        // isCustomized === false인 항목만 보이게끔
        result = response.filter(
          (item: NewsSummary) => item.isCustomize === false,
        );
      } else {
        result = await fetchCustomNewsList({
          selectedCategory: categoryLabel ?? "전체",
        });
      }

      setNewsList(result);
    };

    fetchNews();
  }, [isLoggedIn, myNewsType, categoryLabel]);

  const title =
    myNewsType === MyNewsType.SCRAP ? "스크랩한 기사" : "커스텀한 기사";

  if (!isLoggedIn) {
    return (
      <div className="space-y-30">
        <div className="flex gap-50">
          <div className="font-title-24">{title}</div>
          <NewsCategoryBar basePath={myNewsType} />
        </div>
        <NoContent message="로그인 후 사용 가능해요." />
      </div>
    );
  }

  if (!newsList || newsList.length === 0) {
    return (
      <div className="space-y-30">
        <div className="flex gap-50">
          <div className="font-title-24">{title}</div>
          <NewsCategoryBar basePath={myNewsType} />
        </div>
        <NoContent message="불러올 나의 뉴스가 없어요." />
      </div>
    );
  }

  return (
    <div className="space-y-30">
      <div className="flex gap-50">
        <div className="font-title-24">{title}</div>
        <NewsCategoryBar basePath={myNewsType} />
      </div>
      <div className="grid grid-cols-1 gap-20 sm:grid-cols-2 lg:grid-cols-3">
        {newsList.map((news, index) => {
          return (
            <NewsCard
              key={index}
              type={DetailPageType.MY}
              categoryLabel={categoryLabel}
              newsSummary={news}
              themeColor={news.backgroundColor}
              className={`hover-card-gradient relative overflow-hidden`}
            >
              <NewsCardActions
                onScrapClick={() => {
                  // 기사 스크랩
                }}
                onEditClick={() => {
                  // 커스텀 페이지로 이동
                }}
              />
            </NewsCard>
          );
        })}
      </div>
    </div>
  );
}
