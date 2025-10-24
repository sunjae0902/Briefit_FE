import ApiException from "@/exception/apiException";
import { PressCompany } from "@/types/news/pressCompany";
import { WordCloudData } from "@/types/wordcloud/wordCloudData";
import apiClient from "@/utils/api/apiClient";

// client
export default async function fetchNewsCardListClient({
  selectedCategory,
  selectedPressCompanyName,
  containsAuthHeader
}: {
  selectedCategory: string;
  selectedPressCompanyName: string;
  containsAuthHeader: boolean;
}) {
  const params = {
    category: selectedCategory,
    company: selectedPressCompanyName,
  };
  try {
    const response = await apiClient.get("/articles", {
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

export async function fetchWordListClient() {
  try {
    const response = await apiClient.get("/word/wordcloud", {
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

export async function fetchPressCompanyListClient(): Promise<PressCompany[]> {
  type ServerResponse = {
    company: string;
    count: number;
  };

  try {
    const response = await apiClient.get("/source/company/category", {
      headers: {
        "x-auth-not-required": "true",
      },
    });

    return (response.data as ServerResponse[]).map((res) => ({
      name: res.company,
      count: res.count,
    }));
  } catch (error) {
    if (error instanceof ApiException) {
      // 예외 처리
    }
    throw error;
  }
}
