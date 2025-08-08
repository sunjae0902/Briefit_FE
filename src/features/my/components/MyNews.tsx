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
import postScrap, { deleteScrap } from "@/features/detail/api/newsDetailIScrap";

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

  const fetchNews = async () => {
    let result;

    if (myNewsType === MyNewsType.SCRAP) {
      result = await fetchScrapedNewsList({
        selectedCategory: categoryLabel ?? "전체",
      });
    } else {
      result = await fetchCustomNewsList({
        selectedCategory: categoryLabel ?? "전체",
      });
    }

    setNewsList(result);
  };

  useEffect(() => {
    if (!isLoggedIn) {
      setNewsList(null);
      return;
    }
    fetchNews();
  }, [isLoggedIn, myNewsType, categoryLabel]);

  const title =
    myNewsType === MyNewsType.SCRAP ? "스크랩한 기사" : "커스텀한 기사";

  const scrapHandler = async (isScrapped: boolean, id?: number | null) => {
    if (id && isScrapped) {
      await deleteScrap({ id: id });
      await fetchNews();
    } else if (id && !isScrapped) {
      await postScrap({ id: id });
      await fetchNews();
    } else {
      return
    }
  };

  const shareHandler = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      alert("링크가 복사되었습니다!");
    } catch (err) {
      console.error("링크 복사 실패:", err);
    }
  };

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
          const isScrapped = news.scrapId !== null 
          return (
            <NewsCard
              key={index}
              type={DetailPageType.MY}
              categoryLabel={categoryLabel}
              newsSummary={news}
              themeColor={
                myNewsType === MyNewsType.SCRAP ? null : news.backgroundColor
              }
              className={`hover-card-gradient relative overflow-hidden`}
            >
              <NewsCardActions
                actions={[
                  {
                    iconName: isScrapped ? "scrap-active" : "scrap-inactive",
                    alt: "스크랩",
                    onClick: () => scrapHandler(isScrapped, isScrapped ? news.scrapId : news.articleId),
                  },
                  {
                    iconName: "share-active",
                    alt: "공유하기",
                    onClick: shareHandler,
                  },
                ]}
              />
            </NewsCard>
          );
        })}
      </div>
    </div>
  );
}
