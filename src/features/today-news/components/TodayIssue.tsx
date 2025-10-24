import { formatKoreanDateTime } from "@/utils/dateTimeStringFormatter";
import { fetchWordList } from "../api/news";
import NoContent from "@/features/common/NoContent";
import WordCloudResponsive from "./WordCloudResponsive";

export default async function TodayIssue() {
  const wordCloudData = await fetchWordList();

  if (!wordCloudData) {
    return (
      <div className="space-y-7">
        <div className="flex items-center space-x-50">
          <div className="font-title-24 sm:hidden">오늘의 이슈</div>
          <div className="font-title-20 pc:hidden">오늘의 이슈</div>
        </div>
        <NoContent message="불러올 데이터가 없어요." />
      </div>
    );
  }

  const { createdAt } = wordCloudData;
  const baseTimeString = formatKoreanDateTime({
    isoString: createdAt,
    needUnitText: true,
  });
  return (
    <div className="space-y-14">
      <div className="flex items-center">
        <div className="font-title-24 mr-50 sm:hidden">오늘의 이슈</div>
        <div className="font-title-20 mr-20 pc:hidden">오늘의 이슈</div>
        <div className="font-basic-16 text-gray-400 sm:hidden">
          {baseTimeString} 기준
        </div>
        <div className="font-basic-13 text-gray-400 pc:hidden">
          {baseTimeString} 기준
        </div>
      </div>
      <div className="sm:hidden">
        <WordCloudResponsive
          wordCloudData={wordCloudData}
          minFontSize={14}
          maxFontSize={55}
        />
      </div>
      <div className="pc:hidden">
        <WordCloudResponsive
          wordCloudData={wordCloudData}
          minFontSize={10}
          maxFontSize={30}
        />
      </div>
    </div>
  );
}
