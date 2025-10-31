import apiClient from "@/utils/api/apiClient";

export default async function registerUser(
  name: string,
  categories: string[],
  profileImageFile: File | null,
) {
  try {
    if (!profileImageFile) {
      throw new Error("프로필 이미지가 저장되지 않았어요.");
    }

    const formData = new FormData();

    const userinfo = {
      nickname: name,
      categories: categories,
    };

    formData.append(
      "userinfo",
      new Blob([JSON.stringify(userinfo)], { type: "application/json" }),
    );

    formData.append("profile", profileImageFile);

    const response = await apiClient.post(`/users/registration`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    alert(`회원가입에 실패했습니다. ${error}`);
  }
}
