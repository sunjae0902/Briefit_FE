import { newsCategories } from "@/constants/newsCategries";
import NewsCategorybar from "@/features/common/NewsCategorybar";
import TodayAINews from "@/features/today-news/components/TodayNewsCardGrid";
import TodayIssue from "@/features/today-news/components/TodayIssue";
import { use } from "react";
import TodayNewsCardGrid from "@/features/today-news/components/TodayNewsCardGrid";

type Props = {
  params: Promise<{
    category: string;
  }>;
};

export default function TodayNewsPage(props: Props) {
  const { category } = use(props.params);
  const categoryLabel =
    newsCategories.find((e) => e.name == category)?.label ?? null;
  return (
    <div>
      <div className="flex items-center space-x-50">
        <div className="font-title-24">오늘의 AI 뉴스</div>
        <NewsCategorybar />
      </div>
      <div>
        <TodayNewsCardGrid categoryLabel={categoryLabel} className="mt-30"/>
      </div>
      <div className="mt-70">
        <TodayIssue />
      </div>
    </div>
  );
}
