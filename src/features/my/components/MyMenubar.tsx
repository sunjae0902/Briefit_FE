"use client";

import Divider from "@/features/common/Divider";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import LogoutButton from "./LogoutButton";
import { useNavStore } from "@/stores/navigation/useNavStrore";
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
    inactiveIconPath: "/assets/scrap-inactive.png",
    titleText: "스크랩한 기사",
    path: "/my/scrap",
  },
  {
    activeIconPath: "/assets/pencil-active.png",
    inactiveIconPath: "/assets/pencil-inactive.png",
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
  
   useEffect(() => {
     const token = getCookie("accessToken");
     setIsLoggedIn(!!token);
   }, []);
  
  const router = useRouter();
  const setSelectedPath = useNavStore((state) => state.setSelectedPath);

  return (
    <div className="justify-center">
      {MyMenuItems.map((item, index) => {
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
      {isLoggedIn && <LogoutButton isActive={false} onClick={() => { router.replace("/");  setSelectedPath("/today-news")}} />}
    </div>
  );
}
