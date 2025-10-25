import { DetailPageType } from "@/constants/detailPageType";
import fetchNewsCardList from "../api/news";
import NoContent from "@/features/common/NoContent";
import SignUpModalWrapper from "@/features/signup/components/SignUpModalWrapper";
import { isLoggedIn } from "@/utils/auth/cookie";
import { MoreNewsHeader } from "@/features/common/MoreNewsHeader";
import PaginatedNewsCardListClient from "./PaginatedNewsCardListClient";

export default async function TodayNewsMore({
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
    selectedPressCompanyName: selectedPressCompanyName,
    containsAuthHeader: isUserLoggedIn,
    page: page
  });
  const newsList = newsCardListResponse.articleInfos;
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
          <PaginatedNewsCardListClient
            newsList={newsList}
            itemsPerPage={newsCardListResponse.limit}
            categoryLabel={categoryLabel}
            type={DetailPageType.TODAY}
            totalCount={newsCardListResponse.totalCount} // 실제 totalCount
            currentPage={page}
          />
        </div>
      )}
      <SignUpModalWrapper />
    </>
  );
}
