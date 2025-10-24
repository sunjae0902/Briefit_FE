"use client";

import Divider from "@/features/common/Divider";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import LogoutButton from "./LogoutButton";
import { useNavStore } from "@/stores/navigation/useNavStrore";
import { useDeviceStore } from "@/stores/device/useDeviceStore";
import Image from "next/image";
import { getCookie } from "cookies-next";
import { useState, useEffect } from "react";

function MyMenubarItem({
  iconPath,
  titleText,
  isActive,
  onClick,
}: {
  iconPath: string;
  titleText: string;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <div
      className={`mb-20 flex h-55 w-194 items-center rounded-10 px-10 py-5 hover:shadow-[0_0_3px_#7B47FF] ${
        isActive ? "bg-purple-50" : "bg-white"
      }`}
      onClick={onClick}
    >
      <Image
        src={iconPath}
        className="mr-15"
        alt={iconPath}
        width={45}
        height={45}
      />
      <div
        className={`font-title-16 ${
          isActive ? "text-purple-500" : "text-gray-400"
        }`}
      >
        {titleText}
      </div>
    </div>
  );
}

const MyMenuItems = [
  {
    activeIconPath: "/assets/scrap-active.png",
    inactiveIconPath: "/assets/scrap-inactive-filled.png",
    titleText: "스크랩한 기사",
    path: "/my/scrap",
  },
  {
    activeIconPath: "/assets/pencil-active.png",
    inactiveIconPath: "/assets/pencil-inactive-filled.png",
    titleText: "커스텀한 기사",
    path: "/my/custom",
  },
  {
    activeIconPath: "/assets/profile-active.png",
    inactiveIconPath: "/assets/profile-inactive.png",
    titleText: "나의 프로필",
    path: "/my/profile",
  },
];

export default function MyMenubar() {
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const isMobile = useDeviceStore((state) => state.isMobile);

  useEffect(() => {
    const token = getCookie("accessToken");
    setIsLoggedIn(!!token);
  }, []);

  const router = useRouter();
  const setSelectedPath = useNavStore((state) => state.setSelectedPath);

  // 모바일에서는 '나의 프로필' 제외, 데스크톱에서는 모든 메뉴 표시
  const menuItems = isMobile
    ? MyMenuItems.filter((item) => item.titleText !== "나의 프로필")
    : MyMenuItems;

  if (isMobile) {
    return (
      <div className="px-16 py-12">
        <div className="flex rounded-8 bg-gray-50 p-2">
          {menuItems.map((item, index) => {
            const isActive = pathname.startsWith(item.path);
            return (
              <Link href={item.path} key={index} className="flex-1">
                <div
                  className={`flex items-center justify-center rounded-8 px-8 py-7 transition-all duration-200 ${
                    isActive
                      ? "bg-white font-medium text-gray-900 shadow-sm"
                      : "text-gray-500"
                  }`}
                >
                  <span className="text-sm">{item.titleText}</span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="justify-center">
      {menuItems.map((item, index) => {
        const isActive = pathname.startsWith(item.path);
        return (
          <Link href={item.path} key={index}>
            <MyMenubarItem
              iconPath={isActive ? item.activeIconPath : item.inactiveIconPath}
              titleText={item.titleText}
              isActive={isActive}
              onClick={() => {}}
            />
          </Link>
        );
      })}
      <div className="mt-200 mb-20">
        <Divider />
      </div>
      {isLoggedIn && (
        <LogoutButton
          isActive={false}
          onClick={() => {
            router.replace("/");
            setSelectedPath("/today-news");
          }}
        />
      )}
    </div>
  );
}
