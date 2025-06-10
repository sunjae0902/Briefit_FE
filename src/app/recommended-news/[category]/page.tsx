import { newsCategories } from "@/constants/newsCategries";
import RecommendedNewsCardGrid from "@/features/recommended-news/components/RecommendedNewsCardGrid";
import Link from "next/link";
import { use } from "react";

type Props = {
  params: Promise<{
    category: string;
  }>;
};

export default function RecommendedNewsDetailPage(props: Props) {
  const { category } = use(props.params);
  const categoryLabel =
    newsCategories.find((e) => e.name == category)?.label ?? null;
  return (
    <div className="space-y-45">
      <div className="flex items-center gap-10">
        <Link href={"/recommended-news"}>
          <div className="font-title-24">나의 추천 뉴스</div>
        </Link>
        <div className="aspect-square w-20">
          <img src={"/assets/right-arrow.png"} />
        </div>
        <div className="font-title-24">{categoryLabel}</div>
      </div>
      <RecommendedNewsCardGrid categoryLabel={null}/>
    </div>
  );
}
