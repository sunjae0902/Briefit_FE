"use client";

import Searchbar from "@/components/Searchbar";
import { DetailPageType } from "@/constants/detailPageType";
import Divider from "@/features/common/Divider";
import PaginatedNewsCardGrid from "@/features/common/PaginatedNewsCardGrid";
import PaginatedNewsCarousel from "@/features/common/PaginatedNewsCarousel";
import fetchNewsCardListByKeywordClient from "../api/searchClient";
import { CircleAlert } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import PressCompanyFilterWrapperClient from "@/features/common/PressCompanyFilterWrapperClient";
import { useDeviceStore } from "@/stores/device/useDeviceStore";
import { useEffect, useState } from "react";
import { NewsSummary } from "@/types/news/newsSummary";
import LoadingSpinner from "@/components/LoadingSpinner";

type SearchProps = {
  keyword: string;
  selectedPressCompanyName: string | null;
};

export default function SearchResult({
  keyword,
  selectedPressCompanyName,
}: SearchProps) {
  const { isMobile } = useDeviceStore();
  const [currentPage, setCurrentPage] = useState(1);
  const [newsList, setNewsList] = useState<NewsSummary[]>([]);
  const [itemsPerPage, setItemsPerPage] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const newsData = await fetchNewsCardListByKeywordClient({
          keyword: keyword,
          selectedPressCompanyName: selectedPressCompanyName ?? "전체",
          page: currentPage,
        });
        setNewsList(Array.isArray(newsData) ? newsData.articleInfos : []);
        setItemsPerPage(newsData?.limit);
        setTotalCount(newsData.totalCount);
      } catch (error) {
        console.error("Error fetching news:", error);
        setNewsList([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [keyword, selectedPressCompanyName, currentPage]);

  // 배열이 아닌 경우 빈 배열로 처리
  const safeNewsList = Array.isArray(newsList) ? newsList : [];

  if (loading) {
    return <LoadingSpinner />;
  }

  if (isMobile) {
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
                <PressCompanyFilterWrapperClient />
              </div>
              <PaginatedNewsCarousel
                itemsPerPage={itemsPerPage}
                newsList={safeNewsList}
                categoryLabel={null}
                type={DetailPageType.TODAY}
                totalCount={totalCount}
                currentPage={currentPage}
                onPageChanged={(page) => setCurrentPage(page)}
              />
            </div>
          )}
        </div>
      </div>
    );
  }

  // PC 버전
  return (
    <div>
      <Searchbar
        id="search"
        selectedPressCompanyName={selectedPressCompanyName ?? "전체"}
        className="mx-auto h-48 w-[35vw]"
        searchIconSize={35}
      />
      <div className="flex items-center justify-between">
        <div className="my-35 font-title-24">
          &quot;{keyword}&quot;에 대한 검색 결과
        </div>
        <PressCompanyFilterWrapperClient />
      </div>
      <Divider />
      <div className="mx-20 mt-80">
        {safeNewsList.length === 0 ? (
          <div className="flex flex-col items-center justify-center">
            <CircleAlert
              strokeWidth={1.5}
              size={80}
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
          <PaginatedNewsCardGrid
            itemsPerPage={itemsPerPage}
            newsList={safeNewsList}
            categoryLabel={null}
            type={DetailPageType.TODAY}
            totalCount={totalCount}
            currentPage={currentPage}
            onPageChanged={(page) => setCurrentPage(page)}
          />
        )}
      </div>
    </div>
  );
}
