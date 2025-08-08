"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

type RefreshOnBackWrapperProps = {
  children: React.ReactNode;
  refreshFlagKey?: string; // sessionStorage 키 이름, 기본값 있음
};

export default function RefreshOnBackWrapper({
  children,
  refreshFlagKey = "needRefresh",
}: RefreshOnBackWrapperProps) {
  const router = useRouter();

  useEffect(() => {
    if (sessionStorage.getItem(refreshFlagKey) === "true") {
      router.refresh();
      sessionStorage.removeItem(refreshFlagKey);
    }
  }, [refreshFlagKey, router]);

  return <>{children}</>;
}
