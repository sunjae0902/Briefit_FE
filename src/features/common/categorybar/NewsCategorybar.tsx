"use client";

import { useRouter, usePathname } from "next/navigation";
import { useNavStore } from "@/stores/navigation/useNavStrore";
import { useDeviceStore } from "@/stores/device/useDeviceStore";
import MobileNewsCategoryBar from "./MobileNewsCategorybar";
import DesktopNewsCategoryBar from "./DesktopNewsCategorybar";
import { NewsCategory } from "@/types/news/newsCategory";

export default function NewsCategoryBar({
  basePath,
  categories,
}: {
  basePath: string;
  categories: NewsCategory[];
}) {
  const router = useRouter();
  const pathname = usePathname();
  const setSelectedPath = useNavStore((state) => state.setSelectedPath);
  const isMobile = useDeviceStore((state) => state.isMobile);

  // 공통 로직: 현재 카테고리 계산
  const baseSegments = basePath.split("/").filter(Boolean);
  const pathSegments = pathname.split("/").filter(Boolean);
  const categorySegment = pathSegments[baseSegments.length]; // basePath 다음 segment

  const currentCategory =
    pathSegments.slice(0, baseSegments.length).join("/") ===
      basePath.substring(1) && categorySegment
      ? decodeURIComponent(categorySegment)
      : "";

  // 공통 로직: 카테고리 선택 핸들러 정의
  const handleCategorySelect = (name: string) => {
    router.push(
      `${basePath}/${name}${isMobile && name !== "" ? "?extended=true" : ""}`,
    );
    setSelectedPath(`/${pathSegments[0]}`);
  };

  const sharedProps = {
    basePath,
    categories: categories,
    currentCategory,
    onCategorySelect: handleCategorySelect,
  };

  return (
    <div className="scrollbar-hide overflow-x-auto">
      {isMobile ? (
        <MobileNewsCategoryBar {...sharedProps} />
      ) : (
        <DesktopNewsCategoryBar {...sharedProps} />
      )}
    </div>
  );
}
