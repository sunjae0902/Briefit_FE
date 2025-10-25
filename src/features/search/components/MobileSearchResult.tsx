import { DetailPageType } from "@/constants/detailPageType";
import fetchNewsCardListByKeyword from "../api/search";
import { CircleAlert } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import PressCompanyFilterWrapper from "@/features/common/PressCompanyFilterWrapper";
import PaginatedNewsCardListClient from "@/features/today-news/components/PaginatedNewsCardListClient";

type SearchProps = {
  keyword: string;
  selectedPressCompanyName: string | null;
  page: number;
};

export default async function MobileSearchResult({
  keyword,
  selectedPressCompanyName,
  page,
}: SearchProps) {
  const newsData = await fetchNewsCardListByKeyword({
    keyword: keyword,
    selectedPressCompanyName: selectedPressCompanyName ?? "전체",
    page: page,
  });

  // 배열이 아닌 경우 빈 배열로 처리
  const safeNewsList = Array.isArray(newsData.articleInfos) ? newsData.articleInfos : [];

  return (
    <div>
      <div className="mx-20 mt-10">
        {safeNewsList.length === 0 ? (
          <div className="mt-72 flex flex-col items-center justify-center">
            <CircleAlert
              strokeWidth={1.5}
              size={72}
              color="#5D5D5D"
              className="mb-14"
            />
            <p className="mb-5 text-xl font-medium text-gray-600">
              검색 결과가 없습니다.
            </p>
            <p className="text-sm font-light text-gray-400">
              다른 사이트에서 검색 결과를 확인해보세요!
            </p>
            <div className="mt-25 flex flex-row gap-18">
              <Link
                href={`https://www.google.com/search?q=${encodeURIComponent(keyword)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-pointer transition-transform hover:scale-110"
              >
                <Image
                  src="/assets/search/google-icon.png"
                  alt="google"
                  width={40}
                  height={40}
                />
              </Link>
              <Link
                href={`https://search.naver.com/search.naver?query=${encodeURIComponent(keyword)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-pointer transition-transform hover:scale-110"
              >
                <Image
                  src="/assets/search/naver-icon.png"
                  alt="naver"
                  width={40}
                  height={40}
                />
              </Link>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex items-center justify-between">
              <div className="my-15 font-title-20">
                &quot;{keyword}&quot; 검색 결과
              </div>
              <PressCompanyFilterWrapper />
            </div>
            <PaginatedNewsCardListClient
              newsList={safeNewsList}
              categoryLabel={null}
              itemsPerPage={newsData.limit}
              totalCount={newsData.totalCount}
              currentPage={page}
              type={DetailPageType.TODAY}
            />
          </div>
        )}
      </div>
    </div>
  );
}
