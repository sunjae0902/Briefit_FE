"use client";

import { useDeviceStore } from "@/stores/device/useDeviceStore";
import { useEffect, useState } from "react";
import MobileLayout from "../layouts/MobileLayout";
import DesktopLayout from "../layouts/DesktopLayout";

export function DeviceProvider({ children }: { children: React.ReactNode }) {
  const setIsMobile = useDeviceStore((s) => s.setIsMobile);
  const isMobile = useDeviceStore((s) => s.isMobile);

  const [mounted, setMounted] = useState(false); // 클라이언트 렌더링 완료 여부

  useEffect(() => {
    const media = window.matchMedia("(max-width: 849px)");
    const handler = () => setIsMobile(media.matches);

    handler(); // 최초 실행
    media.addEventListener("change", handler);

    setMounted(true); // mounted 상태 true로

    return () => media.removeEventListener("change", handler);
  }, [setIsMobile]);

  // mounted 전에는 렌더링하지 않음
  if (!mounted) return null;

  return (
    <>
      {isMobile ? (
        <MobileLayout>{children}</MobileLayout>
      ) : (
        <DesktopLayout>{children}</DesktopLayout>
      )}
    </>
  );
}
