import RefreshOnBackWrapper from "@/components/RefreshOnBackWrapper";
import { newsCategories } from "@/constants/newsCategries";
import NewsCategorybar from "@/features/common/NewsCategorybar";
import TodayIssue from "@/features/today-news/components/TodayIssue";
import TodayNewsCardGrid from "@/features/today-news/components/TodayNewsCardGrid";
import { use } from "react";

type Props = {
  params: Promise<{
    category: string;
  }>;
};

export default function TodayNewsPage(props: Props) {
  const { category } = use(props.params);

  const categoryLabel =
  category
    ? newsCategories.find((e) => e.name === category[0])?.label ?? null
    : null;


  return (
    <div>
      <div className="flex items-center space-x-50">
        <div className="font-title-24">오늘의 AI 뉴스</div>
        <NewsCategorybar basePath="today-news" />
      </div>
      <div>
        <RefreshOnBackWrapper>
          <TodayNewsCardGrid categoryLabel={categoryLabel} className="mt-30" />
        </RefreshOnBackWrapper>
      </div>
      <div className="mt-70">
        <TodayIssue />
      </div>
    </div>
  );
}
