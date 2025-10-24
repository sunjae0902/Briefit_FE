import { Card, CardContent } from "@/components/ui/card";
import { DetailPageType } from "@/constants/detailPageType";
import { cn } from "@/lib/utils";
import { NewsSummary } from "@/types/news/newsSummary";
import { getPressCompanyNameString } from "@/utils/news/getPressCompanyNameString";
import { memo, useState } from "react";
import { NewsCardCategoryTag } from "../news-card/NewsCard";
import ResponsiveImage from "../ResponsiveImage";
import Image from "next/image";
import Link from "next/link";

export const MobileNewsCard = memo(function MobileNewsCard({
  type,
  categoryLabel,
  newsSummary,
  className,
  themeColor,
  children,
}: {
  type: DetailPageType;
  categoryLabel: string | null;
  newsSummary: NewsSummary;
  className?: string;
  themeColor?: string | null;
  children?: React.ReactNode;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const themeBgColor = themeColor ? `bg-${themeColor}` : "bg-white";
  const themeText1Color = themeColor ? `text-${themeColor}-text1` : "";
  const themeText2Color = themeColor
    ? `text-${themeColor}-text2`
    : "text-gray-400";
  const hasImage = newsSummary.imgUrls && newsSummary.imgUrls.length > 0;

  return (
    <Link
      prefetch={true}
      href={`${type}/detail?articleId=${newsSummary.articleId ?? "null"}&scrapId=${newsSummary.scrapId ?? "null"}&customId=${newsSummary.customId}`}
    >
      <Card
        className={cn(
          "relative flex flex-row gap-20 overflow-visible rounded-20 p-20",
          className,
          themeBgColor,
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* 왼쪽 이미지 영역 */}
        {hasImage && (
          <ResponsiveImage
            src={newsSummary.imgUrls[0]}
            alt="뉴스 기사 이미지"
            className="size-90 rounded-12"
            rounded="12"
          />
        )}

        {/* 오른쪽 콘텐츠 영역 */}
        <CardContent className="flex flex-col px-0 py-4">
          {/* 카테고리 태그 */}
          <div className="mb-5 w-min">
            <NewsCardCategoryTag
              label={categoryLabel ?? newsSummary.categories[0]}
              isMobile={true}
            />
          </div>
          {/* 제목 */}
          <div
            className={cn("mb-6 line-clamp-2 font-title-16", themeText1Color)}
          >
            {newsSummary.title}
          </div>

          {/* 언론사 정보와 아이콘 */}
          <div className="flex items-center justify-between">
            <div
              className={cn(
                "overflow-hidden font-light-14 overflow-ellipsis whitespace-nowrap",
                themeText2Color,
              )}
            >
              {getPressCompanyNameString(newsSummary.pressCompanies)}
            </div>
            <div className="flex items-center gap-8">
              {newsSummary.customId && (
                <Image
                  src="/assets/custom-mark.png"
                  alt="커스텀"
                  width={14}
                  height={14}
                />
              )}
              {newsSummary.scrapId && (
                <Image
                  src="/assets/scrap-mark.png"
                  alt="스크랩"
                  width={11}
                  height={15}
                />
              )}
            </div>
          </div>
        </CardContent>
        {children && isHovered && (
          <div className="pointer-events-none absolute inset-0 right-20 bottom-15 z-10 flex items-end justify-end">
            <div className="pointer-events-auto">{children}</div>
          </div>
        )}
      </Card>
    </Link>
  );
});
