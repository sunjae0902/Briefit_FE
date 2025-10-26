import React from "react";
import LogoButton from "../LogoButton";
import Navigationbar from "./Navigatonbar";
import { Search } from "lucide-react";
import { isLoggedInUser, useAuthStore } from "@/stores/auth/useAuthStore";
import UserProfileImage from "@/features/common/UserProfileImage";
import LoginButton from "@/features/login/components/LoginButton";
import { navItems } from "@/constants/navItems";
import { useNavStore } from "@/stores/navigation/useNavStrore";
import { useNavigation } from "@/hooks/useNavigation";
import NewsCategoryBar from "@/features/common/categorybar/NewsCategorybar";
import Link from "next/link";

export default function MobileHeader() {
  const { selectedPath, setSelectedPath } = useNavStore();
  const { handleClick } = useNavigation(selectedPath, setSelectedPath);

  return (
    <header className="mt-10">
      <div className="bg-white relative pb-15 flex w-full items-center px-20">
        <div className="absolute left-1/2 -translate-x-1/2">
          <LogoButton
            width={84}
            height={36}
            onClick={() => handleClick(0, navItems[0].path)}
          />
        </div>
        <div className="ml-auto flex gap-10">
          <Link href="/search/mobile" className="cursor-pointer">
            <Search scale={24} />
          </Link>
          {useAuthStore(isLoggedInUser) ? (
            <UserProfileImage scale={24} />
          ) : (
            <LoginButton />
          )}
        </div>
      </div>
      <Navigationbar />
      <NewsCategoryBar basePath={selectedPath.substring(1)} />
    </header>
  );
}
