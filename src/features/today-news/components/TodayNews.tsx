import { DetailPageType } from "@/constants/detailPageType";
import PaginatedNewsCardGrid from "@/features/common/PaginatedNewsCardGrid";
import fetchNewsCardList from "../api/news";
import NoContent from "@/features/common/NoContent";
import SignUpModalWrapper from "@/features/signup/components/SignUpModalWrapper";
import { isLoggedIn } from "@/utils/auth/cookie";
import { NewsSummary } from "@/types/news/newsSummary";
import { NewsCarousel } from "@/features/common/NewsCarousel";

const ITEMS_PER_PAGE = 9;

export default async function TodayNews({
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
    <div className="pc:mt-45 sm:mt-15">
      {!Array.isArray(newsList) || newsList.length === 0 ? (
        <NoContent message="불러올 뉴스가 없어요." />
      ) : (
        <>
          <div className="mt-30 sm:hidden">
            <PaginatedNewsCardGrid
              newsList={newsList}
              itemsPerPage={ITEMS_PER_PAGE}
              categoryLabel={categoryLabel}
              type={DetailPageType.TODAY}
            />
          </div>
          <div className="pc:hidden">
            <NewsCarousel
              newsList={newsList}
              categoryLabel={categoryLabel}
              type={DetailPageType.TODAY}
            />
          </div>
        </>
      )}
      <SignUpModalWrapper />
    </div>
  );
}
