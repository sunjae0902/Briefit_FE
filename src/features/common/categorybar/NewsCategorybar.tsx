"use client";

import { useRouter, usePathname } from "next/navigation";
import { newsCategories } from "@/constants/newsCategries";
import { useNavStore } from "@/stores/navigation/useNavStrore";
import { useDeviceStore } from "@/stores/device/useDeviceStore";
import MobileNewsCategoryBar from "./MobileNewsCategorybar";
import DesktopNewsCategoryBar from "./DesktopNewsCategorybar";

export default function NewsCategoryBar({ basePath }: { basePath: string }) {
   const router = useRouter();
   const pathname = usePathname();
   const setSelectedPath = useNavStore((state) => state.setSelectedPath);
   const isMobile = useDeviceStore((state) => state.isMobile);

   // 공통 로직: 현재 카테고리 계산 
   const baseSegments = basePath.split("/").filter(Boolean);
   const pathSegments = pathname.split("/").filter(Boolean);
   const categorySegment = pathSegments[baseSegments.length]; // basePath 다음 segment

   const currentCategory =
     pathSegments.slice(0, baseSegments.length).join("/") === basePath &&
     categorySegment
       ? decodeURIComponent(categorySegment)
       : "";

   // 공통 로직: 카테고리 선택 핸들러 정의 
  const handleCategorySelect = (name: string) => {
     router.push(`/${basePath}/${name}${isMobile && name !== "" ? "?extended=true" : ""}`);
     setSelectedPath(`/${pathSegments[0]}`);
   };

   const sharedProps = {
     basePath,
     categories: newsCategories,
     currentCategory,
     onCategorySelect: handleCategorySelect,
   };

  return <div className="overflow-x-auto scrollbar-hide">
     {isMobile ? (
     <MobileNewsCategoryBar {...sharedProps} />
   ) : (
     <DesktopNewsCategoryBar {...sharedProps} />
   )}
   </div>
}
