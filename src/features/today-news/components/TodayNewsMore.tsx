import { DetailPageType } from "@/constants/detailPageType";
import fetchNewsCardList from "../api/news";
import NoContent from "@/features/common/NoContent";
import SignUpModalWrapper from "@/features/signup/components/SignUpModalWrapper";
import { isLoggedIn } from "@/utils/auth/cookie";
import { NewsSummary } from "@/types/news/newsSummary";
import { MoreNewsHeader } from "@/features/common/MoreNewsHeader";
import PaginatedNewsCarousel from "@/features/common/PaginatedNewsCarousel";

export default async function TodayNewsMore({
  categoryLabel,
  selectedPressCompanyName,
}: {
  categoryLabel: string | null;
  selectedPressCompanyName: string;
}) {
  const isUserLoggedIn = await isLoggedIn();
  const newsList = (await fetchNewsCardList({
    selectedCategory: categoryLabel ?? "전체",
    selectedPressCompanyName: selectedPressCompanyName,
    containsAuthHeader: isUserLoggedIn,
  })) as NewsSummary[];
  return (
    <>
      {!Array.isArray(newsList) || newsList.length === 0 ? (
        <NoContent message="불러올 뉴스가 없어요." />
      ) : (
        <div className="space-y-14">
          <MoreNewsHeader
            title="오늘의 AI 뉴스"
            categoryLabel={categoryLabel}
          />
          <PaginatedNewsCarousel
            newsList={newsList}
            itemsPerPage={10} // 추후 변경 가능
            categoryLabel={categoryLabel}
            type={DetailPageType.TODAY}
          />
        </div>
      )}
      <SignUpModalWrapper />
    </>
  );
}
