import ApiException from "@/exception/apiException";
import { PressCompany } from "@/types/news/pressCompany";
import { WordCloudData } from "@/types/wordcloud/wordCloudData";
import apiServer from "@/utils/api/apiServer";

// server
export default async function fetchNewsCardList({
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

export async function fetchPressCompanyList(): Promise<PressCompany[]> {
  type ServerResponse = {
    company: string;
    count: number;
  };

  try {
    const response = await apiServer.get("/source/company/category", {
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
