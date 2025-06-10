import { create } from "zustand";
import { persist } from "zustand/middleware";
import { AuthState } from "../../types/auth/authState";

// 전역으로 관리할 유저 상태 Store 생성 및 저장

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      // StateCreator 콜백
      isLoggedIn: false,
      isNew: true,
      accessToken: null,
      setAccessToken: (accessToken) => set({ accessToken }),
      login: (accessToken, isNew) =>
        set({ accessToken, isLoggedIn: true, isNew: isNew }),
      logout: () => set({ accessToken: null, isLoggedIn: false }),
    }),
    {
      name: "auth-store", // localStorage key
      partialize: (state) => ({
        accessToken: state.accessToken,
        isLoggedIn: state.isLoggedIn,
        isNew: state.isNew,
      }),
    },
  ),
);

const isLoggedIn = (state: AuthState) => state.isLoggedIn;
const isNew = (state: AuthState) => state.isNew;
export const isLoggedInUser = (state: AuthState) => isLoggedIn(state) && !isNew(state);

