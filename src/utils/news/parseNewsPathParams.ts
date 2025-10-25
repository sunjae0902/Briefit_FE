import { newsCategories } from "@/constants/newsCategries";
import { NewsPathParams } from "@/types/news/newsPathParams";

export async function parseNewsPathParams({ params, searchParams }: NewsPathParams) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  // 카테고리 이름 → 라벨 변환
  const categoryLabel = resolvedParams.category
    ? (newsCategories.find((e) => e.name === resolvedParams.category[0])?.label ?? null)
    : null;

  // 더보기 여부 
  const extended = resolvedSearchParams?.extended === "true";
  // 언론사 이름 추출
  const selectedPressCompanyName = resolvedSearchParams?.company ?? "전체";
  const page = parseInt(resolvedSearchParams?.page ?? "1");

  return {
    categoryLabel,
    extended,
    selectedPressCompanyName,
    page
  };
}
