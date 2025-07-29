import { DetailPageType } from "@/constants/detailPageType";
import PaginatedNewsCardGrid from "@/features/common/PaginatedNewsCardGrid";
import fetchNewsCardList from "../api/news";
import NoContent from "@/features/common/NoContent";
import SignUpModalWrapper from "@/features/signup/components/SignUpModalWrapper";
import { isLoggedIn } from "@/utils/auth/cookie";

const ITEMS_PER_PAGE = 9;

export default async function TodayNewsCardGrid({
  categoryLabel,
  className,
}: {
  categoryLabel: string | null;
  className?: string;
  }) {

  const newsList = await fetchNewsCardList({
    selectedCategory: categoryLabel ?? "전체",
    containsAuthHeader: await isLoggedIn()
  });

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
