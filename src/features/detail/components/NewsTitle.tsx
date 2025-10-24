import { formatKoreanDateTime } from "@/utils/dateTimeStringFormatter";
import { getPressCompanyNameString } from "@/utils/news/getPressCompanyNameString";
import { useDeviceStore } from "@/stores/device/useDeviceStore";

export default function NewsTitle({
  categoryLabel,
  pressCompanies,
  title,
  createdAt,
  themeTextColor1,
  themeTextColor2,
}: {
  categoryLabel: string;
  pressCompanies: string[];
  title: string;
  createdAt: string;
  themeTextColor1?: string | null;
  themeTextColor2?: string | null;
}) {
  const isMobile = useDeviceStore((state) => state.isMobile);
  return (
    <div className="mt-50 gap-20">
      <div className="mb-16 flex items-center gap-30 sm:gap-10">
        <div
          className={`${isMobile ? "rounded-full bg-purple-100 px-8 py-2 font-basic-13" : "font-title-24-m"} ${themeTextColor1 ?? ""}`}
        >
          {categoryLabel}
        </div>
        <div
          className={`${isMobile ? "font-light-14" : "font-basic-20"} ${!!themeTextColor2 ? themeTextColor2 : "text-gray-400"}`}
        >
          {getPressCompanyNameString(pressCompanies)}
        </div>
      </div>
      <div
        className={`${isMobile ? "mb-12 font-title-24-m" : "mb-50 font-title-40"} ${themeTextColor1 ?? ""}`}
      >
        {title}
      </div>
      <div
        className={`mb-17 ${isMobile ? "justify-start font-extra-light-10" : "justify-end font-basic-18"} flex ${!!themeTextColor2 ? themeTextColor2 : "text-gray-500"}`}
      >
        생성일자: {formatKoreanDateTime({ isoString: createdAt })}
      </div>
    </div>
  );
}
