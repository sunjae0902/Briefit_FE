"use client";

import Image from "next/image";
import { useState } from "react";
import { X, Check } from "lucide-react";
import { profileImagePaths } from "@/features/signup/components/SignUpStepInfo";
import { useUserStore } from "@/stores/auth/useUserStore";
import registerUser from "@/features/signup/api/signup";
import { setUserInfoToStore } from "@/utils/user/setUserInfoToStore";
import convertAssetToFile from "@/utils/image/convertAssetToFile";

export function EditProfileImagePopup({ onClose }: { onClose: () => void }) {
  const nickname = useUserStore((state) => state.nickname);
  const categories = useUserStore((state) => state.categories);
  const [profileImagePath, setProfileImagePath] = useState("");
  const [loading, setLoading] = useState(false); // 로딩 상태

  const handleSave = async () => {
    if (!profileImagePath) return;
    setLoading(true);
    await registerUser(
      nickname,
      categories.map((cat) => cat.label),
      await convertAssetToFile({ path: profileImagePath }),
    );
    await setUserInfoToStore();
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={onClose}
    >
      <div
        className="relative w-[80%] max-w-sm space-y-30 rounded-20 bg-white p-30 shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute -top-24 right-0 text-white"
        >
          <X size={24} />
        </button>

        <div className="font-title-20">프로필 사진</div>

        <div className="grid grid-cols-3 place-items-center gap-10 sm:gap-24">
          {profileImagePaths.map((path) => {
            const isSelected = profileImagePath === path;
            return (
              <div
                key={path}
                onClick={() => setProfileImagePath(path)}
                className="relative flex h-50 w-50 cursor-pointer items-center justify-center overflow-hidden rounded-full"
              >
                <Image src={path} alt="프로필 이미지" width={50} height={50} />
                <div
                  className={`absolute inset-0 rounded-full transition-colors duration-200 ${
                    isSelected ? "bg-black/20" : "bg-transparent"
                  }`}
                />
                {isSelected && (
                  <Check
                    className="absolute text-white transition-opacity duration-800"
                    size={24}
                  />
                )}
              </div>
            );
          })}
        </div>

        <button
          onClick={handleSave}
          disabled={loading} // 로딩 중 비활성화
          className={`w-full rounded-10 py-10 font-basic-16 text-white ${
            loading ? "cursor-not-allowed bg-purple-300" : "bg-purple-500"
          }`}
        >
          {loading ? "저장 중..." : "완료"}
        </button>
      </div>
    </div>
  );
}
