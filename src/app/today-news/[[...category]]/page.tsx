import KakaoAdFit from "@/components/kakao-ad/KakaoAdFit";
import RefreshOnBackWrapper from "@/components/RefreshOnBackWrapper";
import { newsCategories } from "@/constants/newsCategries";
import NewsCategorybar from "@/features/common/categorybar/NewsCategorybar";
import PressCompanyFilterWrapper from "@/features/common/PressCompanyFilterWrapper";
import TodayIssue from "@/features/today-news/components/TodayIssue";
import TodayNews from "@/features/today-news/components/TodayNews";
import TodayNewsMore from "@/features/today-news/components/TodayNewsMore";
import { NewsPathParams } from "@/types/news/newsPathParams";
import { parseNewsPathParams } from "@/utils/news/parseNewsPathParams";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export default async function TodayNewsPage({
  params,
  searchParams,
}: NewsPathParams) {
  const { categoryLabel, extended, selectedPressCompanyName, page } =
    await parseNewsPathParams({
      params,
      searchParams,
    });
  const categoryName =
    newsCategories.findLast((category) => category.label == categoryLabel)
      ?.name ?? "";

  return extended === true ? (
    <div className="p-20">
      <TodayNewsMore
        categoryLabel={categoryLabel}
        selectedPressCompanyName={selectedPressCompanyName}
        page={page}
      />
    </div>
  ) : (
    <div className="relative">
      {/* 사이드 광고 (세로) */}
      <div className="absolute top-100 -left-190 sm:hidden">
        <KakaoAdFit unitId="DAN-YbyXct0uw83W8vir" width={160} height={600} />
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-50 sm:hidden">
          <div className="font-title-24">오늘의 AI 뉴스</div>
          <NewsCategorybar basePath="today-news" />
        </div>
        <div className="sm:hidden">
          <PressCompanyFilterWrapper />
        </div>
      </div>
      <div className="sm:p-20">
        <Link
          href={`/today-news/${categoryName}?extended=true&company=${selectedPressCompanyName}&page=${page}`}
        >
          <div className="flex w-fit cursor-pointer items-center font-title-20 pc:hidden">
            오늘의 AI 뉴스 <ChevronRight className="text-gray-400" />
          </div>
        </Link>
        <RefreshOnBackWrapper>
          <TodayNews
            categoryLabel={categoryLabel}
            selectedPressCompanyName={selectedPressCompanyName}
            page={page}
          />
        </RefreshOnBackWrapper>
      </div>
      <div className="my-30 sm:px-20">
        <KakaoAdFit unitId="DAN-yIPmDE5tGZQC8Iqd" width={320} height={50} />
      </div>
      <div className="pc:mt-70 sm:mt-30 sm:px-20">
        <TodayIssue />
      </div>
    </div>
  );
}
