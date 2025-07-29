"use client";

import ResponsiveImage from "@/features/common/ResponsiveImage";
import { useUserStore } from "@/stores/auth/useUserStore";
import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";

export default function ProfileHeader() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = getCookie("accessToken");
    setIsLoggedIn(!!token);
  }, []);

  const nickname = useUserStore((state) => state.nickname);
  const imageUrl = useUserStore((state) => state.profileUrl);

  return (
    <div className="flex items-center gap-12">
      {isLoggedIn && imageUrl ? (
        <ResponsiveImage
          src={imageUrl}
          alt="프로필 이미지"
          className="h-50 w-50"
          rounded="full"
        />
      ) : (
        <div className="h-50 w-50 rounded-full bg-gray-100" />
      )}
      <div className="font-title-24">
        {isLoggedIn ? nickname : "로그인 후 이용해주세요."}{" "}
      </div>
    </div>
  );
}
