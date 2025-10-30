import { newsCategories } from "@/constants/newsCategries";
import { NewsCategory } from "@/types/news/newsCategory";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type UserState = {
  nickname: string;
  setNickname: (nickname: string) => void;

  profileUrl: string;
  setProfileUrl: (profileUrl: string) => void;

  profileImageFile: File | null;
  setProfileImageFile: (file: File) => void;

  categories: NewsCategory[];
  setCategories: (categories: string[]) => void;
  addCategory: (category: string) => void;
  removeCategory: (category: string) => void;

  reset: () => void;
};

// persist할 state의 타입 정의
type PersistedState = {
  nickname: string;
  profileUrl: string;
  categories: NewsCategory[];
};

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      nickname: "",
      setNickname: (nickname) => set({ nickname }),

      profileUrl: "",
      setProfileUrl: (profileUrl) => set({ profileUrl }),

      profileImageFile: null,
      setProfileImageFile: (file) => set({ profileImageFile: file }),

      categories: [],
      setCategories: (labels) =>
        set({
          categories: newsCategories.filter((cat) =>
            labels.includes(cat.label),
          ),
        }),

      addCategory: (label) =>
        set((state) => {
          const category = newsCategories.find((c) => c.label === label);
          if (!category) return state;
          if (state.categories.some((c) => c.label === label)) return state;
          return { categories: [...state.categories, category] };
        }),

      removeCategory: (label) =>
        set((state) => ({
          categories: state.categories.filter((c) => c.label !== label),
        })),

      reset: () =>
        set({
          nickname: "",
          profileUrl: "",
          profileImageFile: null,
          categories: [],
        }),
    }),
    {
      name: "user-store",
      version: 2,
      partialize: (state) => ({
        nickname: state.nickname,
        profileUrl: state.profileUrl,
        categories: state.categories,
      }),
      migrate: (persistedState: unknown) => {
        console.log("🔍 [MIGRATE] 시작 - persistedState:", persistedState);

        const state = persistedState as Partial<PersistedState> & {
          categories?: (NewsCategory | string)[];
        };

        if (!state || !state.categories) {
          console.log("⚠️ [MIGRATE] state 또는 categories 없음");
          return persistedState as UserState;
        }

        console.log("📊 [MIGRATE] categories:", state.categories);
        console.log("📊 [MIGRATE] categories 길이:", state.categories.length);
        console.log(
          "📊 [MIGRATE] 첫번째 요소 타입:",
          typeof state.categories[0],
        );

        // categories가 string 배열인 경우 NewsCategory 배열로 변환
        if (
          state.categories.length > 0 &&
          typeof state.categories[0] === "string"
        ) {
          console.log("✅ [MIGRATE] string[] 감지 - 변환 시작");
          console.log("📝 [MIGRATE] 변환 전:", state.categories);

          const converted = newsCategories.filter((cat) =>
            (state.categories as string[]).includes(cat.label),
          );

          console.log("✅ [MIGRATE] 변환 완료:", converted);

          return {
            ...state,
            categories: converted,
          } as UserState;
        }

        console.log("ℹ️ [MIGRATE] 변환 불필요 - 이미 올바른 형식");
        return persistedState as UserState;
      },
    },
  ),
);