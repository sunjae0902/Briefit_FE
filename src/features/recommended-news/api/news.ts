import ApiException from "@/exception/apiException";
import { NewsCardListResponse } from "@/types/news/newsSummary";
import apiClient from "@/utils/api/apiClient";

export default async function fetchRecommendedNewsCardList({
  selectedCategory,
  selectedPressCompanyName,
  page,
}: {
  selectedCategory: string;
  selectedPressCompanyName: string;
  page: number;
}) {
  const params = {
    category: selectedCategory,
    company: selectedPressCompanyName,
    page: page,
  };
  try {
    const response = await apiClient.get("/articles/recommend", {
      params,
    });
    return response.data.data as NewsCardListResponse;
  } catch (error) {
    if (error instanceof ApiException) {
      // 예외 처리
    }
    throw error;
  }
}
