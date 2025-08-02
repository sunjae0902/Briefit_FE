import apiClient from "@/utils/api/apiClient";

export default async function postScrap({ id }: { id: number }) {
  try {
    const response = await apiClient.post(`/users/scrap?article-id=${id}`);
    alert("뉴스 스크랩에 성공했습니다.");
    return response.data;
  } catch (error) {
    alert("뉴스 스크랩에 실패했습니다.");
    console.log(error);
    return;
  }
}

export async function deleteScrap({ id }: { id: number }) {
  try {
    const response = await apiClient.delete(`/users/scraps`, {
      data: [id] // 스크랩 ID를 직접 리스트 형태로 전송
    });
    alert("뉴스 스크랩 해제에 성공했습니다.");
    return response.data;
  } catch (error) {
    alert("뉴스 스크랩 해제에 실패했습니다.");
    console.log(error);
    return;
  }
}
