import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUserStore } from "@/stores/auth/useUserStore";
import { useSignUpStore } from "@/stores/signup/useSignUpStore";
import convertAssetToFile from "@/utils/convertAssetToFile";
import { Check } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";

const profileImagePathPaths = [
  "/assets/profile/pink.png",
  "/assets/profile/beige.png",
  "/assets/profile/yellow.png",
  "/assets/profile/green.png",
  "/assets/profile/blue.png",
  "/assets/profile/brown.png",
];

export default function SignUpStepInfo({ onNext }: { onNext: () => void }) {
  const [profileImagePath, setProfileImagePath] = useState(
    "/assets/profile/pink.png",
  );

  // zustand에서 상태 가져오기
  const setProfileImageFileToStore = useUserStore((state) => state.setProfileImageFile);
  const setProfileImageFile = useSignUpStore(
    (state) => state.setProfileImageFile,
  );
  const name = useSignUpStore((state) => state.name);
  const setName = useSignUpStore((state) => state.setName);

  // profileImagePath가 바뀔 때마다 File 객체로 변환해서 store에 저장
  useEffect(() => {
    async function profileImageHandler() {
      const file = await convertAssetToFile({
        path: profileImagePath,
      });
      setProfileImageFile(file);
      setProfileImageFileToStore(file);
    }
    profileImageHandler();
  }, [profileImagePath, setProfileImageFile, setProfileImageFileToStore]);

  return (
    <div className="mb-70 flex flex-col items-center">
      {/* 선택된 프로필 이미지 */}
      <div className="relative mx-0 flex size-100 cursor-pointer items-center justify-center overflow-hidden rounded-full">
        <Image
          src={profileImagePath}
          alt="선택된 프로필 이미지"
          width={100}
          height={100}
        />
      </div>

      {/* 이름 입력 */}
      <div className="mb-20 grid w-full items-center gap-3">
        <Label htmlFor="name" className="p-5 font-normal">
          이름
        </Label>
        <Input
          type="text"
          placeholder="이름을 입력해주세요."
          className="rounded-sm border-none bg-gray-50 px-10 py-20"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      {/* 프로필 이미지 선택 */}
      <div className="w-full">
        <p className="my-10 pl-2 text-sm font-normal">프로필 사진</p>
        <div className="grid grid-cols-3 gap-10">
          {profileImagePathPaths.map((path) => {
            const isSelected = profileImagePath === path;
            return (
              <div
                key={path}
                onClick={() => setProfileImagePath(path)}
                className="relative flex size-50 cursor-pointer items-center justify-center overflow-hidden rounded-full"
              >
                <Image src={path} alt="프로필 이미지" width={50} height={50} />
                {/* 오버레이 & 체크 아이콘 */}
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
      </div>

      {/* 다음 버튼 */}
      <Button
        className={`hover:bg-inherited absolute right-30 bottom-30 cursor-pointer rounded-md px-10 py-14 ${
          !name
            ? "cursor-not-allowed bg-gray-100 text-gray-800"
            : "bg-purple-500 text-white"
        }`}
        onClick={onNext}
        disabled={!name}
      >
        다음
      </Button>
    </div>
  );
}
