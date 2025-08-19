import ApiException from "@/exception/apiException";
import apiClient from "@/utils/api/apiClient";

export default async function fetchRecommendedNewsCardList({
  selectedCategory,
}: {
  selectedCategory: string;
}) {
  const params = { category: selectedCategory };
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
