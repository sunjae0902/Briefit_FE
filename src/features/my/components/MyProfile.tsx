"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { newsCategories } from "@/constants/newsCategries";
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
import { DesktopNewsCategoryItem } from "@/features/common/categorybar/DesktopNewsCategorybar";
import { useDeviceStore } from "@/stores/device/useDeviceStore";

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
  const isMobile = useDeviceStore((state) => state.isMobile);

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
      <div
        className={`${isMobile ? "mb-24 pt-18 pl-16 font-title-20" : "mb-50 font-title-24"}`}
      >
        나의 프로필
      </div>
      {isLoggedIn && profileUrl !== "" ? (
        <>
          {isMobile ? (
            <div className="grid place-items-center gap-14">
              <Image
                src={profileUrl}
                alt="프로필 사진"
                width={90}
                height={90}
                className="aspect-square rounded-full"
              />
              <p className="mb-40 inline-block border-b border-purple-500 text-purple-500">
                프로필사진 편집
              </p>
              <button
                onClick={() => router.push("/my/profile/edit-name")}
                className="mx-10 flex w-[80%] items-center justify-between rounded-8 bg-gray-50 px-16 py-12 transition-colors hover:bg-gray-100"
              >
                <p className="text-gray-600">이름</p>
                <div className="flex items-center gap-8">
                  <p className="font-basic-16">{name}</p>
                  <Image
                    src="/assets/right-arrow.png"
                    alt="편집"
                    width={16}
                    height={16}
                  />
                </div>
              </button>
              <button
                onClick={() => router.push("/my/profile/edit-interests")}
                className="mx-10 flex w-[80%] items-center justify-between rounded-8 bg-gray-50 px-16 py-12 transition-colors hover:bg-gray-100"
              >
                <p className="text-gray-600">관심 분야</p>
                <div className="flex items-center gap-8">
                  <p className="font-basic-16">
                    {selectedCategories.join(", ")}
                  </p>
                  <Image
                    src="/assets/right-arrow.png"
                    alt="편집"
                    width={16}
                    height={16}
                  />
                </div>
              </button>
              <Button
                variant="ghost"
                className="mt-15 cursor-pointer bg-transparent font-small-14 text-red-100 hover:bg-transparent hover:text-red-100"
                onClick={() => setShowDialog(true)}
              >
                회원 탈퇴하기
              </Button>
            </div>
          ) : (
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
                    <DesktopNewsCategoryItem // TODO: - 반응형 수정 필요
                      key={cat.id}
                      category={cat}
                      isSelected={selectedCategories.includes(cat.label)}
                      onClick={() => toggleCategory(cat.label)}
                    />
                  ))}
                </div>
              </EditableField>
              <Button
                variant="ghost"
                className="mt-15 cursor-pointer bg-transparent font-small-14 text-red-100 hover:bg-transparent hover:text-red-100"
                onClick={() => setShowDialog(true)}
              >
                회원 탈퇴하기
              </Button>
            </div>
          )}
        </>
      ) : (
        <NoContent message="로그인 후 사용 가능해요." />
      )}
      {showDialog && (
        <Dialog
          title="회원을 탈퇴하시겠습니까?"
          description="기존 회원 정보는 모두 삭제되며, 복구할 수 없습니다."
          iconComponent={
            <div className="relative flex h-40 w-40 items-center justify-center rounded-full bg-purple-50">
              <div className="relative h-[19.5px] w-[16.5px]">
                <Image
                  src="/assets/trash.png"
                  alt="삭제"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          }
          leftButton={{
            label: "아니요",
            onClick: cancelWithdraw,
            isPrimary: true,
          }}
          rightButton={{ label: "네", onClick: confirmWithdraw }}
          onClose={() => setShowDialog(false)}
        />
      )}
    </div>
  );
}
