"use client";

import Navigationbar from "../Navigatonbar";
import Searchbar from "../Searchbar";
import LoginButton from "../../features/login/components/LoginButton";
import { useAuthStore, isLoggedInUser } from "@/stores/auth/useAuthStore";
import UserProfileImage from "@/features/common/UserProfileImage";
import LogoButton from "@/components/LogoButton";
import { navItems } from "@/constants/navItems";
import { useNavStore } from "@/stores/navigation/useNavStrore";
import { useNavigation } from "@/hooks/useNavigation";

export default function DesktopHeader() {
  const { selectedPath, setSelectedPath } = useNavStore();
  const { handleClick } = useNavigation(selectedPath, setSelectedPath);
  const isLoggedIn = useAuthStore(isLoggedInUser);
  return (
    <header className="bg-theme-background text-theme-primary relative mx-16 flex justify-between pt-28 xl:mx-100 2xl:mx-150">
      <div className="flex items-center gap-110 pc:pb-20">
        <LogoButton
          width={100}
          height={35}
          onClick={() => handleClick(0, navItems[0].path)}
        />
        <Navigationbar />
      </div>
      <div className="relative mt-[-18px] flex items-center gap-4 xl:gap-25 2xl:gap-35">
        <Searchbar id="header" selectedPressCompanyName="전체" className="aspect-6/1 w-250" />
        {isLoggedIn ? <UserProfileImage /> : <LoginButton />}
      </div>
    </header>
  );
}
