import { DetailPageType } from "@/constants/detailPageType";
import fetchNewsCardList from "../api/news";
import NoContent from "@/features/common/NoContent";
import SignUpModalWrapper from "@/features/signup/components/SignUpModalWrapper";
import { isLoggedIn } from "@/utils/auth/cookie";
import { NewsCarousel } from "@/features/common/NewsCarousel";
import PaginatedNewsCardGridClient from "./PaginatedNewsCardGridClient";

export default async function TodayNews({
  categoryLabel,
  selectedPressCompanyName,
  page,
}: {
  categoryLabel: string | null;
  selectedPressCompanyName: string;
  page: number;
}) {
  const isUserLoggedIn = await isLoggedIn();
  const newsCardListResponse = await fetchNewsCardList({
    selectedCategory: categoryLabel ?? "전체",
    selectedPressCompanyName,
    containsAuthHeader: isUserLoggedIn,
    page,
  });

  const newsList = newsCardListResponse.articleInfos;

  return (
    <div className="pc:mt-45 sm:mt-15">
      {!Array.isArray(newsList) || newsList.length === 0 ? (
        <NoContent message="불러올 뉴스가 없어요." />
      ) : (
        <>
          <div className="mt-30 sm:hidden">
            <PaginatedNewsCardGridClient
              newsList={newsList}
              totalCount={newsCardListResponse.totalCount}
              itemsPerPage={newsCardListResponse.limit}
              currentPage={page}
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
