"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { newsCategories } from "@/constants/newsCategries";
import { NewsCategoryItem } from "@/features/common/NewsCategorybar";
import EditableField from "./EditableField";
import NoContent from "@/features/common/NoContent";
import { useUserStore } from "@/stores/auth/useUserStore";
import registerUser from "@/features/signup/api/signup";
import convertAssetToFile from "@/utils/convertAssetToFile";
import { setUserInfoToStore } from "@/utils/user/setUserInfoToStore";
import { getCookie } from "cookies-next";

export default function MyProfile() { 
   const [isLoggedIn, setIsLoggedIn] = useState(false);

   useEffect(() => {
     const token = getCookie("accessToken");
     setIsLoggedIn(!!token);
   }, []);

  const nickname = useUserStore((state) => state.nickname);
  const categories = useUserStore((state) => state.categories);
  const profileUrl = useUserStore((state) => state.profileUrl);
  const profileImageFile = useUserStore((state) => state.profileImageFile);

  const [name, setName] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category],
    );
  };

  useEffect(() => {
    setName(nickname);
  }, [nickname]);

  useEffect(() => {
    setSelectedCategories(categories);
  }, [categories]);

  const handleUpdate = async () => {
    await registerUser(
      name,
      selectedCategories,
      profileImageFile ??
        (await convertAssetToFile({ path: "/assets/profile/pink.png" })),
    );

    await setUserInfoToStore(); // 유저 정보 세팅
  }
 
  return (
    <div>
      <div className="mb-50 font-title-24">나의 프로필</div>
      {isLoggedIn && profileUrl !== "" ? (
        <div className="grid place-items-center gap-20">
          <Image
            src={profileUrl}
            alt="프로필 사진"
            width={150}
            height={150}
            className="mb-40 aspect-square rounded-full"
          />
          <EditableField
            title="이름"
            displayValue={name}
            isActive={name !== ""}
            onSave={handleUpdate}
          >
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`h-48 rounded-10 bg-gray-50 pl-10 font-basic-16 focus-visible:ring-0 ${name === "" ? "" : "focus-visible:border-purple-500"}`}
            />
          </EditableField>

          <EditableField
            title="관심 분야"
            displayValue={selectedCategories.join(", ")}
            isActive={selectedCategories.length !== 0}
            onSave={handleUpdate}
          >
            <div className="grid grid-cols-4 gap-8">
              {newsCategories.slice(1).map((cat) => (
                <NewsCategoryItem
                  key={cat.id}
                  category={cat}
                  isSelected={selectedCategories.includes(cat.label)}
                  onClick={() => toggleCategory(cat.label)}
                />
              ))}
            </div>
          </EditableField>
          <Button className="mt-15 cursor-pointer bg-transparent font-small-14 text-red-100 hover:bg-transparent">
            회원 탈퇴하기
          </Button>
        </div>
      ) : (
        <NoContent message="로그인 후 사용 가능해요." />
      )}
    </div>
  );
}
