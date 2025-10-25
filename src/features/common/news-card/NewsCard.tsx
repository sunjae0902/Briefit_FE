import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { DetailPageType } from "@/constants/detailPageType";
import Link from "next/link";
import ResponsiveImage from "../ResponsiveImage";
import { NewsSummary } from "@/types/news/newsSummary";
import { cn } from "@/lib/utils";
import { getPressCompanyNameString } from "@/utils/news/getPressCompanyNameString";
import Image from "next/image";

export function NewsCardCategoryTag({
  label,
  isMobile,
}: {
  label: string;
  isMobile: boolean;
}) {
  const responsiveStyle = isMobile
    ? "font-basic-10 px-5"
    : "font-basic-16 px-12";
  return (
    <div
      className={`rounded-full bg-purple-100 py-4 whitespace-nowrap ${responsiveStyle}`}
    >
      {label}
    </div>
  );
}

export function NewsCard({
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
  const themeBgColor = themeColor ? `bg-${themeColor}` : "";
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
          "relative flex h-full flex-col overflow-hidden rounded-20 p-20",
          themeBgColor,
          className,
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <CardHeader className="flex-shrink-0">
          <div className="flex h-30 items-center justify-between gap-x-20">
            <div className="flex items-center gap-16">
              <NewsCardCategoryTag
                label={categoryLabel ?? newsSummary.categories[0]}
                isMobile={false}
              />
              <div
                className={cn(
                  "w-190 overflow-hidden font-light-16 overflow-ellipsis whitespace-nowrap",
                  themeText2Color,
                )}
              >
                {getPressCompanyNameString(newsSummary.pressCompanies)}
              </div>
            </div>
            <div className="flex items-end gap-12">
              {newsSummary.customId && (
                <Image
                  src="/assets/custom-mark.png"
                  alt="커스텀"
                  width={20}
                  height={20}
                ></Image>
              )}
              {newsSummary.scrapId && (
                <Image
                  src="/assets/scrap-mark.png"
                  alt="스크랩"
                  width={15}
                  height={21}
                />
              )}
            </div>
          </div>
        </CardHeader>

        <CardContent className="flex flex-grow flex-col">
          <div
            className={cn(
              "mb-12 h-48 flex-shrink-0 overflow-hidden font-title-24",
              themeText1Color,
            )}
          >
            {newsSummary.title}
          </div>

          <div
            className={cn(
              "overflow-hidden text-justify font-light-16",
              themeText1Color,
              // 이미지 유무에 관계없이 남은 공간을 채우도록 설정
              "flex-grow",
              // 텍스트가 넘칠 경우 스크롤이나 말줄임 처리
              hasImage ? "line-clamp-4" : "line-clamp-8",
            )}
          >
            {newsSummary.body}
          </div>

          {/* 이미지가 있을 경우에만 ResponsiveImage 컴포넌트를 렌더링 */}
          {hasImage && (
            <div className="mt-25 flex flex-shrink-0 justify-center">
              <ResponsiveImage
                src={newsSummary.imgUrls[0]}
                alt="뉴스 기사 이미지"
                ratio={300 / 226}
                className="w-[15vw] max-w-300"
              />
            </div>
          )}
        </CardContent>

        {children && isHovered && (
          <div className="pointer-events-none absolute inset-0 right-20 bottom-15 z-10 flex items-end justify-end">
            <div className="pointer-events-auto">{children}</div>
          </div>
        )}
      </Card>
    </Link>
  );
}
