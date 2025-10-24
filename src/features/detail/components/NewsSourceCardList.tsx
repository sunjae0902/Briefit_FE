import { Card } from "@/components/ui/card";
import { NewsSource } from "@/types/news/newsData";
import { useDeviceStore } from "@/stores/device/useDeviceStore";

function NewsSourceCard({
  company,
  title,
  themeCardColor,
  themeTextColor1,
  themeBorderColor,
}: {
  company: string;
  title: string;
  themeCardColor: string | null;
  themeTextColor1: string | null;
  themeBorderColor: string | null;
}) {
  const isMobile = useDeviceStore((state) => state.isMobile);
  return (
    <Card
      className={`card-hover-effect h-150 w-280 cursor-pointer rounded-10 p-20 transition-colors duration-200 sm:h-130 sm:w-250 ${themeCardColor ?? ""} ${themeBorderColor ?? ""}`}
    >
      <div
        className={`space-y-15 ${isMobile ? "font-title-18" : "font-title-20"} ${themeTextColor1 ?? ""}`}
      >
        {company}
      </div>
      <div
        className={`${isMobile ? "font-basic-18" : "font-basic-20"} ${themeTextColor1 ?? ""}`}
      >
        {title}
      </div>
    </Card>
  );
}

export default function NewsSourceCardList({
  newsSourceList,
  themeCardColor,
  themeTextColor1,
  themeBorderColor,
}: {
  newsSourceList: NewsSource[];
  themeCardColor: string | null;
  themeTextColor1: string | null;
  themeBorderColor: string | null;
}) {
  const isMobile = useDeviceStore((state) => state.isMobile);
  return (
    <div className="space-y-30">
      <div
        className={`pt-50 ${isMobile ? "font-title-20" : "font-title-24"} ${themeTextColor1 ?? ""}`}
      >
        이런 기사들을 모았어요
      </div>
      <div className="overflow-x-auto">
        <div className="flex gap-10 pb-80">
          {newsSourceList.map((newsSource, index) => (
            <a key={index} href={newsSource.url} target="_blank">
              <NewsSourceCard
                company={newsSource.pressCompany}
                title={newsSource.sourceTitle}
                themeCardColor={themeCardColor}
                themeTextColor1={themeTextColor1}
                themeBorderColor={themeBorderColor}
              />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
