"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { newsCategories } from "@/constants/newsCategries";
import { useUserStore } from "@/stores/auth/useUserStore";
import { setUserInfoToStore } from "@/utils/user/setUserInfoToStore";
import { ChevronLeft } from "lucide-react";
import registerUser from "@/features/signup/api/signup";
import convertAssetToFile from "@/utils/convertAssetToFile";

export default function EditInterestsPage() {
  const router = useRouter();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const nickname = useUserStore((state) => state.nickname);
  const categories = useUserStore((state) => state.categories);
  const profileImageFile = useUserStore((state) => state.profileImageFile);

  useEffect(() => {
    setSelectedCategories(categories.map((cat) => cat.label));
  }, [categories]);

  const removeCategory = (category: string) => {
    setSelectedCategories((prev) => prev.filter((c) => c !== category));
  };

  const addCategory = (category: string) => {
    if (!selectedCategories.includes(category)) {
      setSelectedCategories((prev) => [...prev, category]);
    }
  };

  const handleSave = async () => {
    await registerUser(
      nickname,
      selectedCategories,
      profileImageFile ??
        (await convertAssetToFile({ path: "/assets/profile/pink.png" })),
    );
    await setUserInfoToStore();
    router.back();
  };

  const handleBack = () => {
    router.back();
  };

  // 현재 선택된 관심분야와 선택 가능한 관심분야 분리
  const availableCategories = newsCategories.slice(1); // "전체" 제외
  const currentInterests = selectedCategories;
  const addableInterests = availableCategories.filter(
    (cat) => !selectedCategories.includes(cat.label),
  );

  return (
    <div className="mx-16">
      {/* Header */}
      <div className="mb-24 flex items-center justify-between pt-18 font-title-20">
        <ChevronLeft color="#888888" onClick={handleBack} />
        <span className="font-title-18">관심분야</span>
        <Button
          variant="ghost"
          onClick={handleSave}
          className="p-0 font-basic-18 text-purple-500 hover:bg-transparent"
        >
          완료
        </Button>
      </div>

      {/* Content */}
      <div className="mx-2 mt-40 space-y-30">
        {/* 나의 관심 분야 */}
        <div>
          <h3 className="mb-16 font-basic-16 text-gray-900">나의 관심 분야</h3>
          <div className="flex flex-wrap gap-8">
            {currentInterests.map((category) => {
              const categoryInfo = availableCategories.find(
                (cat) => cat.label === category,
              );
              if (!categoryInfo) return null;

              return (
                <div
                  key={category}
                  className="flex items-center gap-8 rounded-2xl bg-purple-50 px-10 py-3"
                >
                  <span className="font-basic-14 text-purple-600">
                    {categoryInfo.label}
                  </span>
                  <button
                    onClick={() => removeCategory(category)}
                    className="flex h-16 w-16 items-center justify-center rounded-full bg-purple-200 hover:bg-purple-300"
                  >
                    <span className="font-basic-12 pb-0.5 text-purple-600">
                      ×
                    </span>
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* 추가할 수 있는 분야 */}
        <div>
          <h3 className="mb-16 font-basic-16 text-gray-900">
            추가할 수 있는 분야
          </h3>
          <div className="flex flex-wrap gap-8">
            {addableInterests.map((category) => (
              <button
                key={category.id}
                onClick={() => addCategory(category.label)}
                className="font-basic-14 rounded-2xl bg-gray-50 px-12 py-4 text-gray-700 hover:bg-gray-100"
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
