import apiClient from "@/utils/api/apiClient";

export default async function registerUser(
  name: string,
  categories: string[],
  profileImageFile: File,
) {
  try {
    const formData = new FormData();

    const userinfo = {
      nickname: name,
      categories: categories,
    };

    formData.append(
      "userinfo",
      new Blob([JSON.stringify(userinfo)], { type: "application/json" }),
    );

    if (profileImageFile) {
      formData.append("profile", profileImageFile);
    }

    const response = await apiClient.post(`/users/registration`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    alert("회원가입에 실패했습니다.");
    throw error;
  }
}
