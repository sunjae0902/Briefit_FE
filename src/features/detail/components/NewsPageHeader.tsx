"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useAuthStore, isLoggedInUser } from "@/stores/auth/useAuthStore";
import IconButton from "@/features/common/IconButton";

const ActiveButton = {
  SCRAP: "scrap",
  SHARE: "share",
  CUSTOM: "custom",
} as const;

type ActiveButtonType = (typeof ActiveButton)[keyof typeof ActiveButton];

export default function NewsPageHeader() {
  const [active, setActive] = useState<ActiveButtonType | null>(null);
  const isActive = (key: ActiveButtonType) => active === key;
  const isUser = useAuthStore(isLoggedInUser);

  const scrapHandler = () => {
    setActive(active === ActiveButton.SCRAP ? null : ActiveButton.SCRAP);
  };
  const shareHandler = async () => {
    setActive(active === ActiveButton.SHARE ? null : ActiveButton.SHARE);
    try {
      await navigator.clipboard.writeText(window.location.href);
      alert("링크가 복사되었습니다!");
      setActive(null);
    } catch (err) {
      console.error("링크 복사 실패:", err);
    }
  };
  const customHandler = () => {
    setActive(active === ActiveButton.CUSTOM ? null : ActiveButton.CUSTOM);
  };

  return (
    <div className="flex items-center gap-15">
      {isUser && (
        <IconButton
          iconName={"scrap"}
          onClick={scrapHandler}
          isActive={isActive(ActiveButton.SCRAP)}
          alt="스크랩"
        ></IconButton>
      )}
      <IconButton
        iconName={"share"}
        onClick={shareHandler}
        isActive={isActive(ActiveButton.SHARE)}
        alt="공유"
      ></IconButton>
      {isUser && (
        <IconButton
          iconName={"pencil"}
          onClick={customHandler}
          isActive={isActive(ActiveButton.CUSTOM)}
          alt="커스텀"
        ></IconButton>
      )}
    </div>
  );
}
