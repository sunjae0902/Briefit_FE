import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { DetailPageType } from "@/constants/detailPageType";
import Link from "next/link";
import ResponsiveImage from "./ResponsiveImage";
import { NewsSummary } from "@/types/news/newsSummary";
import { cn } from "@/lib/utils";
import { getPressCompanyNameString } from "@/utils/news/getPressCompanyNameString";
import Image from "next/image";

function NewsCardCategoryTag({ label }: { label: string }) {
  return (
    <div className="rounded-full bg-purple-100 px-12 py-4 font-basic-16 whitespace-nowrap">
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
  const themeText2Color = themeColor ? `text-${themeColor}-text2` : "";

  return (
    <Link
      prefetch={true}
      href={`${type}/detail?articleId=${newsSummary.articleId ?? "null"}&scrapId=${newsSummary.scrapId ?? "null"}&customId=${newsSummary.customId}`}
    >
      <Card
        className={cn(
          "relative h-full overflow-hidden rounded-20 p-20",
          themeBgColor,
          className,
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <CardHeader>
          <div className="flex h-30 items-center justify-between">
            <div className="flex gap-16">
              <NewsCardCategoryTag
                label={categoryLabel ?? newsSummary.categories[0]}
              />
              <div
                className={cn(
                  "font-light-16 overflow-ellipsis whitespace-nowrap",
                  themeText2Color,
                )}
              >
                {getPressCompanyNameString(newsSummary.pressCompanies)}
              </div>
            </div>
            <div className="flex items-end gap-12">
             {newsSummary.customId && <Image
                src="/assets/custom-mark.png"
                alt="커스텀"
                width={20}
                height={20}
              ></Image>}
              {newsSummary.scrapId && <Image
                src="/assets/scrap-mark.png"
                alt="스크랩"
                width={15}
                height={21}
              />}
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <div
            className={cn(
              "mb-12 h-48 overflow-hidden font-title-24",
              themeText1Color,
            )}
          >
            {newsSummary.title}
          </div>
          <div
            className={cn(
              "h-80 overflow-hidden text-justify font-light-16",
              themeText1Color,
            )}
          >
            {newsSummary.body}
          </div>
          <ResponsiveImage
            src={
              newsSummary.imgUrls[0] ??
              "https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
            }
            alt="뉴스 기사 이미지"
            ratio={300 / 226}
            className="mx-auto mt-25 w-[15vw] max-w-300"
          />
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
