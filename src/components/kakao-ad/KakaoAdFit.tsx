"use client";

import { useRef, useEffect } from "react";

interface AdFitProps {
  unitId: string;
  width: number;
  height: number;
}

interface Adfit {
  display: (unit: string) => void;
  destroy: (unit: string) => void;
  refresh: (unit: string) => void;
}

declare global {
  interface Window {
    adfit?: Adfit;
  }
}

export default function KakaoAdFit({
  unitId,
  width,
  height,
}: AdFitProps) {
  const scriptElementWrapper = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
      const script = document.createElement("script");
      script.setAttribute("src", "https://t1.daumcdn.net/kas/static/ba.min.js");
      script.setAttribute("async", "true");
      scriptElementWrapper.current?.appendChild(script);

      return () => {
        const globalAdfit = "adfit" in window ? window.adfit : null;
        if (globalAdfit) globalAdfit.destroy(unitId);
      };
  }, []);

  return (
    <div ref={scriptElementWrapper} style={{ width: "100%", height: "100%" }}>
      <ins
        className="kakao_ad_area"
        style={{ display: "none" }}
        data-ad-unit={unitId}
        data-ad-width={width}
        data-ad-height={height}
      />
    </div>
  );
}
