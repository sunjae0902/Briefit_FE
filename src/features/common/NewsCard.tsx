import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { DetailPageType } from "@/constants/detailPageType";
import Link from "next/link";
import ResponsiveImage from "./ResponsiveImage";
import { NewsSummary } from "@/types/news/newsSummary";

function NewsCardCategoryTag({ label }: { label: string }) {
  return (
    <div className="font-basic-16 rounded-full bg-purple-100 px-12 py-4 whitespace-nowrap">
      {label}
    </div>
  );
}

export function NewsCard({
  type,
  categoryLabel,
  newsSummary,
  className,
}: {
  type: DetailPageType;
  categoryLabel: string | null;
  newsSummary: NewsSummary;
  className?: string;
  }) {

  return (
    <Link href={`${type}/detail/${newsSummary.articleId}`}>
      <Card className={`${className ?? ""} card-hover-effect rounded-20 p-20`}>
        <CardHeader>
          <div className="flex items-center gap-16">
            <NewsCardCategoryTag
              label={categoryLabel ?? newsSummary.categories[0]}
            />
            <div className="font-light-16 text-gray-400">
              {newsSummary.pressCompanies.join(", ")}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="font-title-24 mb-12">{newsSummary.title}</div>
          <div className="font-light-16 h-80 overflow-hidden text-justify">
            {newsSummary.body}
          </div>
          <ResponsiveImage
            src={newsSummary.imageUrl}
            alt="뉴스 기사 이미지"
            ratio={300 / 226}
            className="mx-auto mt-25 w-[15vw] max-w-300"
          />
        </CardContent>
      </Card>
    </Link>
  );
}
