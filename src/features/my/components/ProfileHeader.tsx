"use client";

import ResponsiveImage from "@/features/common/ResponsiveImage";
import { useUserStore } from "@/stores/auth/useUserStore";
import { useDeviceStore } from "@/stores/device/useDeviceStore";
import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function ProfileHeader() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = getCookie("accessToken");
    setIsLoggedIn(!!token);
  }, []);

  const nickname = useUserStore((state) => state.nickname);
  const imageUrl = useUserStore((state) => state.profileUrl);
  const categories = useUserStore((state) => state.categories);
  const isMobile = useDeviceStore((state) => state.isMobile);

  return (
    <>
      {isMobile ? (
        <div className="">
          <h3 className="pt-18 pl-18 font-title-20">마이페이지</h3>
          <div className="flex items-center justify-between px-16 py-13">
            <div className="flex items-center gap-16 pt-8 pl-6">
              {isLoggedIn && imageUrl ? (
                <ResponsiveImage
                  src={imageUrl}
                  alt="프로필 이미지"
                  className="h-40 w-40"
                  rounded="full"
                />
              ) : (
                <div className="h-40 w-40 rounded-full bg-gray-200" />
              )}
              <div>
                <div className="mb-1 font-title-18 text-gray-900">
                  {isLoggedIn ? nickname : "로그인 후 이용해주세요."}
                </div>
                {isLoggedIn && categories.length > 0 && (
                  <div className="mt-1 text-[13px] font-light text-gray-400">
                    관심분야: {categories.join(", ")}
                  </div>
                )}
              </div>
            </div>
            <Link href="/my/profile">
              <Image
                src="/assets/profile/settings.png"
                alt="설정"
                width={23}
                height={23}
                className="mr-4"
              />
            </Link>
          </div>
        </div>
      ) : (
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
      )}
    </>
  );
}
