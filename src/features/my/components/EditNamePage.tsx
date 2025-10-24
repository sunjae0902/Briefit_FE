"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useUserStore } from "@/stores/auth/useUserStore";
import { setUserInfoToStore } from "@/utils/user/setUserInfoToStore";
import { ChevronLeft } from "lucide-react";
import registerUser from "@/features/signup/api/signup";
import convertAssetToFile from "@/utils/convertAssetToFile";

export default function EditNamePage() {
  const router = useRouter();
  const [name, setName] = useState("");

  const nickname = useUserStore((state) => state.nickname);
  const categories = useUserStore((state) => state.categories);
  const profileImageFile = useUserStore((state) => state.profileImageFile);

  useEffect(() => {
    setName(nickname);
  }, [nickname]);

  const handleSave = async () => {
    await registerUser(
      name,
      categories,
      profileImageFile ??
        (await convertAssetToFile({ path: "/assets/profile/pink.png" })),
    );
    await setUserInfoToStore();
    router.back();
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <div className="mx-16">
      {/* Header */}
      <div className="mb-24 flex items-center justify-between pt-18 font-title-20">
        <ChevronLeft color="#888888" onClick={handleBack} />
        <span className="font-title-18">이름</span>
        <Button
          variant="ghost"
          onClick={handleSave}
          className="p-0 font-basic-18 text-purple-500 hover:bg-transparent"
        >
          완료
        </Button>
      </div>

      {/* Content */}
      <div className="mx-2 mt-40">
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="h-48 rounded-10 bg-gray-50 pl-16 font-basic-16 focus-visible:border-purple-500 focus-visible:ring-0"
          placeholder="이름을 입력하세요"
        />
      </div>
    </div>
  );
}
