import ApiException from "@/exception/apiException";
import { WordCloudData } from "@/types/wordcloud/wordCloudData";
import apiServer from "@/utils/api/apiServer";

export default async function fetchNewsCardList({
  selectedCategory,
  containsAuthHeader
}: {
    selectedCategory: string;
  containsAuthHeader: boolean
  }) {
  const params = { category: selectedCategory };
  try {
    const response = await apiServer.get("/articles", {
      params,
      headers: containsAuthHeader ? {} : { 
        "x-auth-not-required": "true", // 인증 헤더 제외
      },
    });
    return response.data;
  } catch (error) {
    if (error instanceof ApiException) {
      // 예외 처리
    }
    throw error;
  }
}

export async function fetchWordList() {
  try {
    const response = await apiServer.get("/word/wordcloud", {
      headers: {
        "x-auth-not-required": "true", // 인증 헤더 제외
      },
    });
    return response.data as WordCloudData;
  } catch (error) {
    if (error instanceof ApiException) {
      // 예외 처리
    }
    throw error;
  }
}
