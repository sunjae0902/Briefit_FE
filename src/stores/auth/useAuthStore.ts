import { create } from "zustand";
import { persist } from "zustand/middleware";

// 전역으로 관리할 유저 상태 Store 생성 및 저장

// 유저의 로그인 상태 모델 (토큰 등 인증 정보만 저장)
export type AuthState = {
  isLoggedIn: boolean;
  isNew: boolean;
  accessToken: string | null; // 추후 수정 필요
  expiresAt: number | null;
  setAccessToken: (accessToken: string) => void; // 추후 수정 필요
  login: (accessToken: string, isNew: boolean) => void; // 추후 수정 필요
  logout: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      isNew: true,
      accessToken: null,
      expiresAt: null,
      setAccessToken: (accessToken) => set({ accessToken }),
      login: (accessToken, isNew) =>
        set({
          accessToken,
          isLoggedIn: true,
          isNew,
          expiresAt: Date.now() + 1000 * 60 * 60, // 1시간
        }),
      logout: () =>
        set({
          accessToken: null,
          isLoggedIn: false,
          expiresAt: null,
        }),
    }),
    {
      name: "auth-store",
      partialize: (state) => ({
        accessToken: state.accessToken,
        isLoggedIn: state.isLoggedIn,
        isNew: state.isNew,
        expiresAt: state.expiresAt,
      }),
      // 만료 검사 로직
      onRehydrateStorage: () => (state) => {
        if (!state) return;

        const now = Date.now();
        if (state.expiresAt && state.expiresAt < now) {
          // 만료됨
          state.logout();
        }
      },
    },
  ),
);


const isLoggedIn = (state: AuthState) => state.isLoggedIn;
const isNew = (state: AuthState) => state.isNew;

export const isLoggedInUser = (state: AuthState) =>
  isLoggedIn(state) && !isNew(state) && !!state.accessToken;


