"use client";

import { useDeviceStore } from "@/stores/device/useDeviceStore";
import { useEffect } from "react";

export function DeviceProvider({ children }: { children: React.ReactNode }) {
  const setIsMobile = useDeviceStore((s) => s.setIsMobile);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 849px)");
    const handler = () => setIsMobile(media.matches);

    handler(); // 최초 실행
    media.addEventListener("change", handler);
    return () => media.removeEventListener("change", handler);
  }, [setIsMobile]);

  return <>{children}</>;
}
