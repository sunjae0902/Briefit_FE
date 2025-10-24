import ApiException from "@/exception/apiException";
import apiClient from "@/utils/api/apiClient";
import { NewsSummary } from "@/types/news/newsSummary";

export default async function fetchNewsCardListByKeywordClient({
  keyword,
  selectedPressCompanyName,
}: {
    keyword: string;
    selectedPressCompanyName: string;
}): Promise<NewsSummary[]> {
  const params = { string: keyword, company: selectedPressCompanyName };
  try {
    const response = await apiClient.get("/articles/search", {
      params,
      headers: {
        "x-auth-not-required": "true", // 인증 헤더 제외
      },
    });
    
    // 응답 데이터가 배열인지 확인
    const data = response.data;
    if (!Array.isArray(data)) {
      console.warn("API 응답이 배열이 아닙니다:", data);
      return [];
    }
    
    return data;
  } catch (error) {
    if (error instanceof ApiException) {
      // 예외 처리
    }
    console.error("검색 API 오류:", error);
    return []; // 오류 발생 시 빈 배열 반환
  }
}
