import ApiException from "@/exception/apiException";
import apiClient from "@/utils/api/apiClient";

export async function fetchScrapedNewsList({
  selectedCategory,
}: {
  selectedCategory: string;
}) {
  const params = { category: selectedCategory };
  try {
    const response = await apiClient.get("/users/scraps", {
      params,
    });
    return response.data;
  } catch (error) {
    if (error instanceof ApiException) {
      // 예외 처리
    }
    alert("뉴스 목록 조회에 실패했습니다.");
    return;
  }
}

export async function fetchCustomNewsList({
  selectedCategory,
}: {
  selectedCategory: string;
}) {
  const params = { category: selectedCategory };
  try {
    const response = await apiClient.get("/users/customs", {
      params,
    });
    return response.data;
  } catch (error) {
    if (error instanceof ApiException) {
      // 예외 처리
    }
    alert("뉴스 목록 조회에 실패했습니다.");
    return;
  }
}
