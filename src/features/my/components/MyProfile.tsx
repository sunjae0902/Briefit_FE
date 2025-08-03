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
import { withdraw } from "../api/user";
import Dialog from "@/features/common/Dialog";
import { useResetUserInfo } from "@/hooks/useResetUserInfo";
import { useRouter } from "next/navigation";
import { useNavStore } from "@/stores/navigation/useNavStrore";

export default function MyProfile() {
  const router = useRouter();
  const resetUserInfo = useResetUserInfo();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [name, setName] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const nickname = useUserStore((state) => state.nickname);
  const categories = useUserStore((state) => state.categories);
  const profileUrl = useUserStore((state) => state.profileUrl);
  const profileImageFile = useUserStore((state) => state.profileImageFile);
  const setSelectedPath = useNavStore((state) => state.setSelectedPath);

  useEffect(() => {
    const token = getCookie("accessToken");
    setIsLoggedIn(!!token);
  }, []);

  useEffect(() => {
    setName(nickname);
  }, [nickname]);

  useEffect(() => {
    setSelectedCategories(categories);
  }, [categories]);

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category],
    );
  };

  const handleUpdate = async () => {
    await registerUser(
      name,
      selectedCategories,
      profileImageFile ??
        (await convertAssetToFile({ path: "/assets/profile/pink.png" })),
    );

    await setUserInfoToStore(); // 유저 정보 세팅
  };

  const confirmWithdraw = async () => {
    setShowDialog(false);
    const response = await withdraw();
    if (response) {
      resetUserInfo();
      router.replace("/");
      setSelectedPath("/today-news");
    }
  };

  const cancelWithdraw = () => {
    setShowDialog(false);
  };

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
          <Button
            className="mt-15 cursor-pointer bg-transparent font-small-14 text-red-100 hover:bg-transparent"
            onClick={() => setShowDialog(true)}
          >
            회원 탈퇴하기
          </Button>
          {showDialog && (
            <Dialog
              title="회원을 탈퇴하시겠습니까?"
              description="기존 회원 정보는 모두 삭제되며, 복구할 수 없습니다."
              iconComponent={
                <div className="relative flex h-40 w-40 items-center justify-center rounded-full bg-purple-50">
                  <div className="relative h-[19.5px] w-[16.5px]">
                    <Image
                      src="/assets/trash.png"
                      alt="아이콘"
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
              }
              leftButton={{ label: "아니요", onClick: cancelWithdraw }}
              rightButton={{ label: "네", onClick: confirmWithdraw }}
            />
          )}
        </div>
      ) : (
        <NoContent message="로그인 후 사용 가능해요." />
      )}
    </div>
  );
}
