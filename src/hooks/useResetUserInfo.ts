import { useAuthStore } from "@/stores/auth/useAuthStore";
import { useUserStore } from "@/stores/auth/useUserStore";
import { deleteCookie } from "cookies-next";

export function useResetUserInfo() {
  const logout = useAuthStore((state) => state.logout);
  const reset = useUserStore((state) => state.reset);

  return () => {
    logout();
    reset();
    deleteCookie("accessToken");
  };
}