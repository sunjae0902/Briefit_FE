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
  const { categoryLabel, extended, selectedPressCompanyName } =
    await parseNewsPathParams({
      params,
      searchParams,
    });
  const categoryName = newsCategories.findLast((category) => category.label == categoryLabel)?.name ?? "";

  return extended === true ? (
    <div className="p-20">
      <TodayNewsMore
        categoryLabel={categoryLabel}
        selectedPressCompanyName={selectedPressCompanyName}
      />
    </div>
  ) : (
    <div>
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
          href={`/today-news/${categoryName}?extended=true&company=${selectedPressCompanyName}`}
        >
          <div className="flex w-fit cursor-pointer items-center font-title-20 pc:hidden">
            오늘의 AI 뉴스 <ChevronRight className="text-gray-400" />
          </div>
        </Link>
        <RefreshOnBackWrapper>
          <TodayNews
            categoryLabel={categoryLabel}
            selectedPressCompanyName={selectedPressCompanyName}
          />
        </RefreshOnBackWrapper>
        <div className="sm:mt-30 pc:mt-70">
          <TodayIssue />
        </div>
      </div>
    </div>
  );
}
