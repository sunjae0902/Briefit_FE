"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Divider from "@/features/common/Divider";
import ResponsiveImage from "@/features/common/ResponsiveImage";
import fetchNewsDetail from "@/features/detail/api/newsDetail";
import NewsContent from "@/features/detail/components/NewsContent";
import NewsPageHeader from "@/features/detail/components/NewsPageHeader";
import NewsSourceCardList from "@/features/detail/components/NewsSourceCardList";
import NewsTitle from "@/features/detail/components/NewsTitle";
import { NewsData, NewsSource } from "@/types/news/newsData";
import NewsCustomBar from "./NewsCustomBar";
import { pressCompanyNameMap } from "@/constants/pressCompanyNameMap";
import { useCustomBar } from "@/hooks/useCustomBar";
import { useNewsCustomStore } from "@/stores/detail/useNewsCustomStore";
import { getCookie } from "cookies-next";

type NewsDetailProps = {
  articleId: number; // 마이페이지 -> 커스텀/스크랩 뉴스 목록 조회에서 넘어올 경우 null
  scrapId: number | null;
  customId: number | null;
};

export default function NewsDetail({ articleId, scrapId }: NewsDetailProps) {
  const router = useRouter();
  const [newsData, setNewsData] = useState<NewsData | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [refreshKey, setRefreshKey] = useState(false);
  const refresh = () => setRefreshKey((prev) => !prev);

  const setGlobalBgColor = useNewsCustomStore(
    (state) => state.setGlobalBgColor,
  );
  const setGlobalDividerColor = useNewsCustomStore(
    (state) => state.setGlobalDividerColor,
  );

  const customBar = useCustomBar();

  useEffect(() => {
    const token = getCookie("accessToken");
    setIsLoggedIn(!!token);
  }, []);

  useEffect(() => {
    let isMounted = true;

    const fetchDetail = async () => {
      try {
        // 스크랩된 뉴스도 일반 뉴스 API 사용 (articleId 사용)
        const data = await fetchNewsDetail({
          id: articleId,
          containsAuthHeader: isLoggedIn,
        });

        console.log("API 응답 데이터:", data);

        // 데이터가 없거나 API 호출이 실패한 경우
        if (!data) {
          return;
        }

        if (isMounted) {
          setNewsData(data);
        }

        // 배경색 적용 (데이터가 있을 때만)
        if (data && data.backgroundColor) {
          const themeColor = data.backgroundColor;
          setGlobalBgColor(`bg-${themeColor}`); // 전체 레이아웃에 적용
          setGlobalDividerColor(`bg-${themeColor}-dark`);
          console.log(`배경색 적용: bg-${themeColor}`);

          customBar.setActiveThemeColor(themeColor);
          customBar.setThemeBgColor(`bg-${themeColor}`);
          customBar.setThemeTextColor1(`text-${themeColor}-text1`);
          customBar.setThemeTextColor2(`text-${themeColor}-text2`);
          customBar.setThemeBorderColor(`border-${themeColor}-dark`);
          customBar.setThemeDividerColor(`bg-${themeColor}-dark`);
          customBar.setThemeCardColor(`bg-${themeColor}-light`);
        } else {
          // 스크랩만 한 경우 기본 테마
          console.log("기본 테마 (backgroundColor 없음)");
          setGlobalBgColor(null);
          setGlobalDividerColor(null);

          customBar.setActiveThemeColor("white-theme");
          customBar.setThemeBgColor("");
          customBar.setThemeTextColor1("");
          customBar.setThemeTextColor2("");
          customBar.setThemeBorderColor("");
          customBar.setThemeDividerColor("");
          customBar.setThemeCardColor("");
        }

        // 하이라이트 적용 (커스텀 기사만)
        if (data && Array.isArray(data.customs) && data.customId) {
          // console.log("커스텀 하이라이트", data.customs);
          customBar.setHighlights(data.customs);
        } else {
          // 스크랩만
          console.log("커스텀 하이라이트 없음");
          customBar.setHighlights([]);
        }
      } catch (error) {
        console.error("뉴스 상세 정보 조회 실패:", error);
      }
    };
    fetchDetail();
    return () => {
      // 컴포넌트 언마운트 시 배경, divider 색 초기화
      setGlobalBgColor(null);
      setGlobalDividerColor(null);
      isMounted = false;
    };
  }, [isLoggedIn, refreshKey]);

  const pressCompanyNameList =
    newsData?.sources.map((source: NewsSource) => source.pressCompany) ?? [];

  // customBar에서 반환하는 값 구조 분해
  const {
    themeBgColor,
    themeTextColor1,
    themeTextColor2,
    themeDividerColor,
    themeBorderColor,
    themeCardColor,
    activeIcon,
    activeHighlightColor,
    highlights,
    addHighlight,
    removeHighlight,
  } = customBar;

  const onBackClick = () => {
    sessionStorage.setItem("needRefresh", "true");
    router.back();
  };

  return (
    <div className={`min-h-screen pt-30 ${themeBgColor ?? "bg-white"}`}>
      <div className="flex space-x-20 px-70">
        <NewsCustomBar customBar={customBar} articleId={articleId} />
        <ArrowLeft
          strokeWidth={1.5}
          size={30}
          color="#888888"
          onClick={() => onBackClick()}
          className="mr-15 aspect-square cursor-pointer hover:bg-transparent"
        />
        <div className="w-full">
          <NewsPageHeader
            articleId={articleId}
            scrapId={scrapId}
            customId={newsData?.customId ?? null}
            customBar={customBar}
            isCustomized={!!newsData?.customId}
            deleteButtonThemeColor={themeTextColor2}
            onRefresh={refresh}
          />
          {newsData ? (
            <div className="px-70">
              <NewsTitle
                categoryLabel={newsData.categories[0]}
                pressCompanies={pressCompanyNameList}
                title={newsData.title}
                createdAt={newsData.createdAt}
                themeTextColor1={themeTextColor1}
                themeTextColor2={themeTextColor2}
              />
              <Divider className={themeDividerColor ?? ""} />
              <ResponsiveImage
                src={
                  newsData.imgUrls[0] ??
                  "https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
                }
                alt="뉴스 기사 이미지"
                className="mx-auto my-60 h-470 w-710"
              />
              <NewsContent
                body={newsData.body}
                themeTextColor1={themeTextColor1}
                activeIcon={activeIcon}
                highlights={highlights}
                addHighlight={addHighlight}
                removeHighlight={removeHighlight}
                activeHighlightColor={activeHighlightColor}
              />
              <Divider className={themeDividerColor ?? ""} />
              <NewsSourceCardList
                newsSourceList={newsData.sources.map((source) => ({
                  ...source,
                  pressCompany:
                    pressCompanyNameMap[source.pressCompany] ||
                    source.pressCompany,
                }))}
                themeCardColor={themeCardColor}
                themeTextColor1={themeTextColor1}
                themeBorderColor={themeBorderColor}
              />
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </div>
  );
}
