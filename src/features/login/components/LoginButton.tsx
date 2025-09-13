"use client";

import { useState } from "react";
import { useDeviceStore } from "@/stores/device/useDeviceStore";
import { UserRound } from "lucide-react";
import MobileLoginPopup from "./popup/MobileLoginPopup";
import DesktopLoginPopup from "./popup/DesktopLoginPopup";

export default function LoginButton() {
  const [showPopup, setShowPopup] = useState(false);
  const isMobile = useDeviceStore((s) => s.isMobile);

  return (
    <div className="relative">
      {isMobile ? (
        <UserRound
          size={24}
          onClick={() => setShowPopup(true)}
          className="cursor-pointer"
        />
      ) : (
        <button
          className="aspect-[80/20] w-[6vw] max-w-80 rounded-full border border-purple-500 p-10 font-basic-16 text-purple-500"
          onClick={() => setShowPopup(true)}
        >
          로그인
        </button>
      )}

      {showPopup &&
        (isMobile ? (
          // 모바일 풀스크린 모달
          <MobileLoginPopup onClose={() => setShowPopup(false)} />
        ) : (
          // 데스크탑 팝업
          <DesktopLoginPopup onClose={() => setShowPopup(false)} />
        ))}
    </div>
  );
}
