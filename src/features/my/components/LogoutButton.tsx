"use client";

import { useResetUserInfo } from "@/hooks/useResetUserInfo";
import Image from "next/image";

export default function LogoutButton({
  isActive,
  onClick,
}: {
  isActive: boolean;
  onClick: () => void;
}) {
  const resetUserInfo = useResetUserInfo();
  
  const handleLogout = () => {
    resetUserInfo();
    onClick();
  };

  return (
    <div
      className={`flex h-55 w-194 items-center rounded-10 px-10 py-5 hover:shadow-[0_0_3px_#B0B0B0] ${
        isActive ? "bg-purple-50" : "bg-white"
      }`}
      onClick={handleLogout}
    >
      <Image
        src="/assets/logout.png"
        className="mr-12"
        alt="로그아웃"
        width={45}
        height={45}
      />
      <div
        className={`font-title-16 ${
          isActive ? "text-purple-500" : "text-gray-400"
        }`}
      >
        로그아웃
      </div>
    </div>
  );
}
