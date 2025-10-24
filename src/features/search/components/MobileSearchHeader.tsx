"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";

export default function MobileSearchHeader() {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    if (searchQuery.trim()) {
      router.push(`/search?keyword=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleClear = () => {
    router.back();
  };

  return (
    <div className="mx-14 mt-20 flex flex-row items-center justify-between">
      <div className="relative w-full">
        <Input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="검색어를 입력해주세요"
          className="w-full rounded-md border-none bg-gray-50 py-24 pl-14 shadow-none placeholder:text-gray-400"
        />
        <Search
          scale={28}
          className="absolute top-1/2 right-14 -translate-y-1/2 cursor-pointer text-gray-500"
          onClick={handleSearch}
        />
      </div>
      <X scale={28} className="ml-8 cursor-pointer" onClick={handleClear} />
    </div>
  );
}
