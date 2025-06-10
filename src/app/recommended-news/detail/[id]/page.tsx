"use client";

import { Button } from "@/components/ui/button";
import Divider from "@/features/common/Divider";
import ResponsiveImage from "@/features/common/ResponsiveImage";
import NewsContent from "@/features/detail/components/NewsContent";
import NewsPageHeader from "@/features/detail/components/NewsPageHeader";
import NewsSourceCardList from "@/features/detail/components/NewsSourceCardList";
import NewsTitle from "@/features/detail/components/NewsTitle";
import { useRouter } from "next/navigation";
import { use } from "react";

type Props = {
  params: Promise<{
    id: number;
  }>;
};

export default function RecommendedNewsDetailPage(props: Props) {
  const router = useRouter();
  const { id } = use(props.params);

  return (
    <div className="flex space-x-20">
      <Button
        onClick={() => router.back()}
        variant="ghost"
        className="aspect-square w-46 hover:bg-transparent"
      >
        <img src={"/assets/back-arrow.png"} alt="뒤로가기" />
      </Button>
      <div className="w-full">
        <NewsPageHeader />
        <NewsTitle />
        <Divider />
        <ResponsiveImage
          src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
          alt="뉴스 기사 이미지"
          className="mx-auto my-60 h-470 w-710"
        />
        <NewsContent />
        <Divider />
        <NewsSourceCardList />
      </div>
    </div>
  );
}
