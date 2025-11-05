"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
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
import IconButton from "@/features/common/IconButton";
import LoadingSpinner from "@/components/LoadingSpinner";
import KakaoAdFit from "@/components/kakao-ad/KakaoAdFit";

type NewsDetailProps = {
  articleId: number; // 마이페이지 -> 커스텀/스크랩 뉴스 목록 조회에서 넘어올 경우 null
  scrapId: number | null;
  customId: number | null;
};

export default function NewsDetail({ articleId, scrapId }: NewsDetailProps) {
  const router = useRouter();
  const [newsData, setNewsData] = useState<NewsData | null>(null);
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
    let isMounted = true;

    const token = getCookie("accessToken");
    const isLoggedIn = !!token;

    const fetchDetail = async () => {
      try {
        // 스크랩된 뉴스도 일반 뉴스 API 사용 (articleId 사용)
        const data = await fetchNewsDetail({
          id: articleId,
          containsAuthHeader: isLoggedIn,
        });

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
  }, [refreshKey]);

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
    <div
      className={`min-h-screen px-20 pt-30 sm:pt-0 ${themeBgColor ?? "bg-white"}`}
    >
      <div className="xl:px-64 sm:px-6 md:px-64">
        <div className="flex flex-row items-baseline space-y-12 sm:hidden">
          <div className="relative flex items-center space-x-12">
            <NewsCustomBar
              customBar={customBar}
              articleId={articleId}
              position="fixed"
              className=""
            />
            <IconButton
              size={36}
              className="mr-14"
              iconName="back-arrow"
              onClick={() => onBackClick()}
            />
          </div>
          <NewsPageHeader
            articleId={articleId}
            scrapId={scrapId}
            customId={newsData?.customId ?? null}
            customBar={customBar}
            isCustomized={!!newsData?.customId}
            deleteButtonThemeColor={themeTextColor2}
            onRefresh={refresh}
          />
        </div>
        <div className="w-full px-0 xl:px-70 md:px-70">
          {newsData ? (
            <div className="w-full">
              <NewsTitle
                categoryLabel={newsData.categories[0]}
                pressCompanies={pressCompanyNameList}
                title={newsData.title}
                createdAt={newsData.createdAt}
                themeTextColor1={themeTextColor1}
                themeTextColor2={themeTextColor2}
              />
              <div className="relative hidden sm:block">
                <NewsCustomBar
                  customBar={customBar}
                  articleId={articleId}
                  position="absolute"
                  // className="top-45 left-[-4px]"
                />
                <NewsPageHeader
                  articleId={articleId}
                  scrapId={scrapId}
                  customId={newsData?.customId ?? null}
                  customBar={customBar}
                  isCustomized={!!newsData?.customId}
                  deleteButtonThemeColor={themeTextColor2}
                  onRefresh={refresh}
                  iconSize={27}
                />
              </div>
              <Divider className={`${themeDividerColor ?? ""} sm:hidden`} />
              {newsData.imgUrls.length != 0 ? (
                <ResponsiveImage
                  src={
                    newsData.imgUrls[0] ??
                    "https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
                  }
                  alt="뉴스 기사 이미지"
                  ratio={4 / 3}
                  className="mx-auto my-40 h-auto pc:max-w-800 sm:w-[80vw]"
                />
              ) : (
                <div className="my-40 sm:my-60"></div>
              )}
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
              <KakaoAdFit
                unitId="DAN-dJp4HDSYvImXXkmd"
                width={320}
                height={100}
              />
            </div>
          ) : (
            <LoadingSpinner />
          )}
        </div>
      </div>
    </div>
  );
}
