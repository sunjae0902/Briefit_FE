"use client";

import { useState } from "react";
import { useAuthStore, isLoggedInUser } from "@/stores/auth/useAuthStore";
import IconButton from "@/features/common/IconButton";
import { useCustomBar } from "@/hooks/useCustomBar";
import postScrap, { deleteScrap } from "../api/newsDetailIScrap";

interface NewsPageHeaderProps {
  articleId: number;
  isScrapped: boolean;
  customBar: ReturnType<typeof useCustomBar>;
  scrapId?: number; // 스크랩 ID 추가
}

const ActiveButton = {
  SCRAP: "scrap",
  SHARE: "share",
  CUSTOM: "custom",
} as const;

type ActiveButtonType = (typeof ActiveButton)[keyof typeof ActiveButton];

export default function NewsPageHeader({
  articleId,
  isScrapped,
  customBar,
  scrapId,
}: NewsPageHeaderProps) {
  const [active, setActive] = useState<ActiveButtonType | null>(null);
  const isActive = (key: ActiveButtonType) => active === key;
  const isUser = useAuthStore(isLoggedInUser);
  const [isScrappedNew, setIsScrappedNew] = useState(false);
  const [newScrapId, setNewScrapId] = useState<number | null>(null);

  const { setIsCustomBarVisible } = customBar;

  const scrapHandler = async () => {
    setActive(active === ActiveButton.SCRAP ? null : ActiveButton.SCRAP);

    if (isScrapped || isScrappedNew) {
      // 스크랩 해제 - scrapId 사용
      const currentScrapId = scrapId || newScrapId;
      if (currentScrapId) {
        await deleteScrap({ id: currentScrapId });
        setIsScrappedNew(false);
        setNewScrapId(null);
      }
    } else {
      // 스크랩 추가
      const result = await postScrap({ id: articleId });
      if (result) {
        setNewScrapId(result);
        setIsScrappedNew(true);
      }
    }
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
    setIsCustomBarVisible((v: boolean) => !v);
  };

  return (
    <div className="mt-10 flex items-center gap-10">
      {isUser && (
        <IconButton
          iconName={"scrap"}
          onClick={scrapHandler}
          isActive={isScrapped || isScrappedNew || isActive(ActiveButton.SCRAP)}
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
