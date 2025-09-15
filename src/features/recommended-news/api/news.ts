import ApiException from "@/exception/apiException";
import apiClient from "@/utils/api/apiClient";

export default async function fetchRecommendedNewsCardList({
  selectedCategory,
  selectedPressCompanyName
}: {
    selectedCategory: string;
    selectedPressCompanyName: string;
}) {
  const params = { category: selectedCategory, company: selectedPressCompanyName};
  try {
    const response = await apiClient.get("/articles/recommend", {
      params,
    });
    return response.data;
  } catch (error) {
    if (error instanceof ApiException) {
      // 예외 처리
    }
    throw error;
  }
}
