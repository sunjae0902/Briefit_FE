import Searchbar from "@/components/Searchbar";
import { DetailPageType } from "@/constants/detailPageType";
import Divider from "@/features/common/Divider";
import PaginatedNewsCardGrid from "@/features/common/PaginatedNewsCardGrid";
import fetchNewsCardListByKeyword from "../api/search";
// import NoContent from "@/features/common/NoContent";
import { CircleAlert } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type SearchProps = {
  keyword: string;
};

export default async function SearchResult({ keyword }: SearchProps) {
  const newsList = await fetchNewsCardListByKeyword({ keyword: keyword });

  return (
    <div>
      <Searchbar
        id="search"
        className="mx-auto h-48 w-[35vw]"
        searchIconSize={35}
      />
      <div className="my-35 font-title-24">
        &quot;{keyword}&quot;에 대한 검색 결과
      </div>
      <Divider />
      <div className="mx-20 mt-80">
        {newsList.length === 0 ? (
          <div className="flex flex-col items-center justify-center">
            <CircleAlert
              strokeWidth={1.5}
              size={80}
              color="#5D5D5D"
              className="mb-14"
            />
            {/* <NoContent message="검색 결과가 없습니다." /> */}
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
            itemsPerPage={6}
            newsList={newsList}
            categoryLabel={null}
            type={DetailPageType.TODAY}
          />
        )}
      </div>
    </div>
  );
}
