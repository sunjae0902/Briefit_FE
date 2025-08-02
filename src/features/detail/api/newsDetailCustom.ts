import apiClient from "@/utils/api/apiClient";
import { HighlightInfo } from "@/types/custom/highlightInfo";

interface CustomRequestInfoDTO {
  backgroundColor: string;
  customInfos: HighlightInfo[];
}

export async function postNewsDetailCustom(
  articleId: number,
  customRequestInfo: CustomRequestInfoDTO,
): Promise<boolean> {
  try {
    const response = await apiClient.post(
      `/users/custom?article-id=${articleId}`,
      customRequestInfo,
    );
    
    if (response.status >= 200 && response.status < 300) {
      return true;
    }
    
    return false;
  } catch (e) {
    console.error(e);
    throw e;
  }
}
