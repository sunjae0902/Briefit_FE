"use client";

import { useEffect, useState } from "react";
import { DetailPageType } from "@/constants/detailPageType";
import { NewsCard } from "@/features/common/news-card/NewsCard";
import { fetchCustomNewsList, fetchScrapedNewsList } from "../api/myNews";
import { MyNewsType } from "@/constants/myNewsType";
import { NewsSummary } from "@/types/news/newsSummary";
import NoContent from "@/features/common/NoContent";
import { NewsCardActions } from "./NewsCardActions";
import postScrap, { deleteScrap } from "@/features/detail/api/newsDetailIScrap";
import NewsCategoryBar from "@/features/common/categorybar/NewsCategorybar";
import { useDeviceStore } from "@/stores/device/useDeviceStore";
import { isLoggedInUser, useAuthStore } from "@/stores/auth/useAuthStore";
import { MobileNewsCard } from "@/features/common/news-card/MobileNewsCard";
import { newsCategories } from "@/constants/newsCategries";
import { useNavStore } from "@/stores/navigation/useNavStrore";

export default function MyNews({
  myNewsType,
  categoryLabel,
}: {
  myNewsType: MyNewsType;
  categoryLabel: string | null;
}) {
  const isLoggedIn = useAuthStore(isLoggedInUser);
  const isMobile = useDeviceStore((state) => state.isMobile);
  const setSelectedPath = useNavStore((state) => state.setSelectedPath);
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
    if (!isMobile) return;
    if (myNewsType === MyNewsType.SCRAP) {
      setSelectedPath(MyNewsType.SCRAP);
    } else if (myNewsType === MyNewsType.CUSTOM) {
      setSelectedPath(MyNewsType.CUSTOM);
    }
  }, [myNewsType, setSelectedPath]);

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
      return;
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
        {isMobile ? (
          <div className="mt-30 flex justify-center">
            <NoContent message="로그인 후 사용 가능해요." />
          </div>
        ) : (
          <div className="space-y-30">
            <div className="flex gap-50">
              <div className="font-title-24">{title}</div>
              <NewsCategoryBar
                basePath={myNewsType}
                categories={newsCategories}
              />
            </div>
            <NoContent message="로그인 후 사용 가능해요." />
          </div>
        )}
      </div>
    );
  }

  if (!newsList || newsList.length === 0) {
    return (
      <div className="space-y-30">
        {isMobile ? (
          <div className="mt-30 flex justify-center">
            <NoContent message="불러올 나의 뉴스가 없어요." />
          </div>
        ) : (
          <div className="space-y-30">
            <div className="flex gap-50">
              <div className="font-title-24">{title}</div>
              <NewsCategoryBar
                basePath={myNewsType}
                categories={newsCategories}
              />
            </div>
            <NoContent message="불러올 나의 뉴스가 없어요." />
          </div>
        )}
      </div>
    );
  }

  return (
    <div>
      {isMobile ? (
        <div>
          {newsList.map((news, index) => (
            <MobileNewsCard
              key={index}
              type={DetailPageType.MY}
              categoryLabel={categoryLabel}
              newsSummary={news}
              className="hover-card-purple mb-15"
            />
          ))}
        </div>
      ) : (
        <div className="space-y-30">
          <div className="flex gap-35">
            <div className="font-title-24 whitespace-nowrap">{title}</div>
            <NewsCategoryBar
              basePath={myNewsType}
              categories={newsCategories}
            />
          </div>
          <div className="grid grid-cols-1 gap-20 sm:grid-cols-2 lg:grid-cols-3">
            {newsList.map((news, index) => {
              const isScrapped = news.scrapId !== null;
              return (
                <NewsCard
                  key={index}
                  type={DetailPageType.MY}
                  categoryLabel={categoryLabel}
                  newsSummary={news}
                  themeColor={
                    myNewsType === MyNewsType.SCRAP
                      ? null
                      : news.backgroundColor
                  }
                  className={`hover-card-gradient relative overflow-hidden`}
                >
                  <NewsCardActions
                    actions={[
                      {
                        iconName: isScrapped
                          ? "scrap-active"
                          : "scrap-inactive",
                        alt: "스크랩",
                        onClick: () =>
                          scrapHandler(
                            isScrapped,
                            isScrapped ? news.scrapId : news.articleId,
                          ),
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
      )}
    </div>
  );
}
