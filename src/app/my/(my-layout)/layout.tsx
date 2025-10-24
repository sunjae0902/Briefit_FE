"use client";

import Divider from "@/features/common/Divider";
import MyMenubar from "@/features/my/components/MyMenubar";
import ProfileHeader from "@/features/my/components/ProfileHeader";
import { useDeviceStore } from "@/stores/device/useDeviceStore";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  const isMobile = useDeviceStore((state) => state.isMobile);
  const pathname = usePathname();

  // 모바일에서 /my/profile 관련 경로일 때는 children만 표시 (헤더 없음)
  if (
    isMobile &&
    (pathname === "/my/profile" ||
      pathname === "/my/profile/edit-name" ||
      pathname === "/my/profile/edit-interests")
  ) {
    return <div>{children}</div>;
  }

  return (
    <div>
      <ProfileHeader />
      {isMobile ? (
        <div className="flex flex-col">
          <MyMenubar />
          <div className="mx-16">{children}</div>
        </div>
      ) : (
        <>
          <div className="mt-20 mb-40">
            <Divider />
          </div>
          <div className="flex gap-40">
            <div className="sticky top-30 h-fit self-start">
              <MyMenubar />
            </div>
            <div className="flex-1">{children}</div>
          </div>
        </>
      )}
    </div>
  );
}
