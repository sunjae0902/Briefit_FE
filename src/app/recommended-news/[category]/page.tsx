import { newsCategories } from "@/constants/newsCategries";
import RecommendedNewsCardGrid from "@/features/recommended-news/components/RecommendedNewsCardGrid";
import Link from "next/link";
import { use } from "react";
import Image from "next/image";
import RefreshOnBackWrapper from "@/components/RefreshOnBackWrapper";

type Props = {
  params: Promise<{
    category: string;
  }>;
};

export default function RecommendedNewsByCategory(props: Props) {
  const { category } = use(props.params);

  const categoryLabel = category
    ? (newsCategories.find((e) => e.name === category)?.label ?? null)
    : null;

  return (
    <div className="space-y-45">
      <div className="flex items-center gap-10">
        <Link prefetch={true} href={"/recommended-news"}>
          <div className="font-title-24">나의 추천 뉴스</div>
        </Link>
        <Image
          src={"/assets/right-arrow.png"}
          alt="분류"
          width={20}
          height={20}
        />
        <div className="font-title-24">{categoryLabel}</div>
      </div>
      <RefreshOnBackWrapper>
        <RecommendedNewsCardGrid categoryLabel={categoryLabel} />
      </RefreshOnBackWrapper>
    </div>
  );
}
