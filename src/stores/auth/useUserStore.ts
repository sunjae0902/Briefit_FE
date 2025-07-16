import { create } from "zustand";
import { persist } from "zustand/middleware";

type UserState = {
  nickname: string;
  setNickname: (nickname: string) => void;

  profileUrl: string;
  setProfileUrl: (profileUrl: string) => void;

  profileImageFile: File | null;
  setProfileImageFile: (file: File) => void;

  categories: string[];
  setCategories: (categories: string[]) => void;
  addCategory: (category: string) => void;
  removeCategory: (category: string) => void;

  reset: () => void;
};

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      nickname: "",
      setNickname: (nickname) => set({ nickname }),

      profileUrl: "",
      setProfileUrl: (profileUrl) => set({ profileUrl }),

      profileImageFile: null,
      setProfileImageFile: (file) => set ({ profileImageFile: file }),

      categories: [],
      setCategories: (categories) => set({ categories }),
      addCategory: (category) =>
        set((state) =>
          state.categories.includes(category)
            ? state
            : { categories: [...state.categories, category] },
        ),
      removeCategory: (category) =>
        set((state) => ({
          categories: state.categories.filter((c) => c !== category),
        })),

      reset: () =>
        set({
          nickname: "",
          profileUrl: "",
          categories: [],
        }),
    }),
    {
      name: "user-store", // localStorage key
      partialize: (state) => ({
        nickname: state.nickname,
        profileUrl: state.profileUrl,
        categories: state.categories,
      }),
    },
  ),
);
