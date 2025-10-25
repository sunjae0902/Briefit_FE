import ApiException from "@/exception/apiException";
import apiServer from "@/utils/api/apiServer";
import { NewsCardListResponse } from "@/types/news/newsSummary";

export default async function fetchNewsCardListByKeyword({
  keyword,
  selectedPressCompanyName,
  page,
}: {
    keyword: string;
    selectedPressCompanyName: string;
    page: number;
}): Promise<NewsCardListResponse> {
  const params = { string: keyword, company: selectedPressCompanyName, page: page };
  try {
    const response = await apiServer.get("/articles/search", {
      params,
      headers: {
        "x-auth-not-required": "true", // 인증 헤더 제외
      },
    });
    
    return response.data.data as NewsCardListResponse;
  } catch (error) {
    if (error instanceof ApiException) {
      // 예외 처리
    }
     return {
       articleInfos: [],
       totalCount: 0,
       limit: 0,
       totalPage: 0,
       page: 0,
     };
  }
}
