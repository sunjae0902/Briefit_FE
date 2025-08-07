import apiClient from "@/utils/api/apiClient";

export const gethWordDefinition = async (word: string) => {
    try {
      const response = await apiClient.get(
        `/word?string=${encodeURIComponent(word)}`,
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("단어 뜻 검색 실패 :", error);
    }
    return null;
  };