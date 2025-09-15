"use client";

import IconButton from "@/features/common/IconButton";
import { useSearchStore } from "@/stores/search/useSearchStore";
import { useRouter } from "next/navigation";

type SearchbarProps = {
  id: string;
  selectedPressCompanyName: string;
  className?: string;
  searchIconSize?: number;
};


export default function Searchbar({
  id,
  selectedPressCompanyName,
  className = "",
  searchIconSize = 27,
}: SearchbarProps) {
  const router = useRouter();

  const queries = useSearchStore((state) => state.queries);
  const setQuery = useSearchStore((state) => state.setQuery);
  const setFocusedSearchBarId = useSearchStore(
    (state) => state.setFocusedSearchBarId,
  );

  const query = queries[id] ?? "";

  const handleSearch = () => {
    const trimmed = query.trim();
    if (trimmed) {
      router.push(`/search?keyword=${trimmed}&company=${selectedPressCompanyName}`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className={`relative ${className}`}>
      <div className="input-gradient-border relative h-full w-full from-purple-500 to-green-500">
        <input
          className="input-inner h-full w-full pr-12 font-basic-16 placeholder-gray-200"
          placeholder="검색어를 입력하세요."
          value={query} // <-- 항상 자신의 쿼리
          onChange={(e) => setQuery(id, e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => setFocusedSearchBarId(id)}
          onBlur={() => setFocusedSearchBarId(null)}
        />
        <IconButton
          iconName="search"
          className="absolute top-1/2 right-16 -translate-y-1/2"
          onClick={handleSearch}
          style={{ width: searchIconSize, height: searchIconSize }}
        />
      </div>
    </div>
  );
}
