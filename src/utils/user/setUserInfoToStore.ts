import { fetchUserInfo } from "@/features/my/api/user";
import { useAuthStore } from "@/stores/auth/useAuthStore";
import { useUserStore } from "@/stores/auth/useUserStore";

// 서버에서 유저 정보 조회 후 userStore에 저장

export async function setUserInfoToStore() {
  try {
    const userInfo = await fetchUserInfo();
    const { setNickname, setProfileUrl, setCategories } =
      useUserStore.getState();
    if (userInfo) {
      useAuthStore.setState({ isNew: false }); // 로컬 스토리지 상태 업데이트
      setNickname(userInfo.nickname);
      setProfileUrl(userInfo.profileUrl);
      setCategories(userInfo.categories);
    }

    return userInfo;
  } catch (error) {
    console.error("유저 정보 설정 실패:", error);
    throw error;
  }
}
