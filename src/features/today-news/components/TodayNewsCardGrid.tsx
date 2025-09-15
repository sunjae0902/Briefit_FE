import { DetailPageType } from "@/constants/detailPageType";
import PaginatedNewsCardGrid from "@/features/common/PaginatedNewsCardGrid";
import fetchNewsCardList from "../api/news";
import NoContent from "@/features/common/NoContent";
import SignUpModalWrapper from "@/features/signup/components/SignUpModalWrapper";
import { isLoggedIn } from "@/utils/auth/cookie";
import { NewsSummary } from "@/types/news/newsSummary";

const ITEMS_PER_PAGE = 9;

export default async function TodayNewsCardGrid({
  categoryLabel,
  selectedPressCompanyName,
  className,
}: {
  categoryLabel: string | null;
  selectedPressCompanyName: string;
  className?: string;
}) {
  const isUserLoggedIn = await isLoggedIn();

  const newsList = (await fetchNewsCardList({
    selectedCategory: categoryLabel ?? "전체",
    selectedPressCompanyName: selectedPressCompanyName,
    containsAuthHeader: isUserLoggedIn,
  })) as NewsSummary[];

  return (
    <div className="mt-45">
      {!Array.isArray(newsList) || newsList.length === 0 ? (
        <NoContent message="불러올 뉴스가 없어요." />
      ) : (
        <PaginatedNewsCardGrid
          newsList={newsList}
          itemsPerPage={ITEMS_PER_PAGE}
          categoryLabel={categoryLabel}
          type={DetailPageType.TODAY}
          className={className}
        />
      )}
      <SignUpModalWrapper />
    </div>
  );
}
