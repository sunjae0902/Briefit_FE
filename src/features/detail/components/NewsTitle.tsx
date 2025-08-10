import { formatKoreanDateTime } from "@/utils/dateTimeStringFormatter";
import { getPressCompanyNameString } from "@/utils/news/getPressCompanyNameString";

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
  return (
    <div className="mt-50 gap-20">
      <div className="mb-16 flex items-center gap-30">
        <div className={`font-title-24-m ${themeTextColor1 ?? ""}`}>
          {categoryLabel}
        </div>
        <div className={`font-basic-20 ${!!themeTextColor2 ? themeTextColor2 : "text-gray-400"}`}>
          {getPressCompanyNameString(pressCompanies)}
        </div>
      </div>
      <div className={`mb-50 font-title-40 ${themeTextColor1 ?? ""}`}>
        {title}
      </div>
      <div
        className={`mb-17 flex justify-end font-basic-16 ${themeTextColor2 ?? "text-gray-600"}`}
      >
        생성일자: {formatKoreanDateTime({ isoString: createdAt })}
      </div>
    </div>
  );
}
