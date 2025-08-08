"use client";

import { useState } from "react";
import { useAuthStore, isLoggedInUser } from "@/stores/auth/useAuthStore";
import IconButton from "@/features/common/IconButton";
import { useCustomBar } from "@/hooks/useCustomBar";
import postScrap, { deleteScrap } from "../api/newsDetailIScrap";
import { Trash2 } from "lucide-react";
import Dialog from "@/features/common/Dialog";
import Image from "next/image";
import { deleteCustom } from "../api/newsDetailCustom";

type NewsPageHeaderProps = {
  articleId: number;
  scrapId: number | null; // 스크랩 ID 추가
  customId: number | null;
  isScrapped: boolean;
  customBar: ReturnType<typeof useCustomBar>;
  isCustomized: boolean;
  deleteButtonThemeColor: string;
  onRefresh: () => void;
};

const ActiveButton = {
  SCRAP: "scrap",
  SHARE: "share",
  CUSTOM: "custom",
} as const;

type ActiveButtonType = (typeof ActiveButton)[keyof typeof ActiveButton];

function CustomDeleteButton({
  borderColor,
  textColor,
  onClick,
}: {
  borderColor: string;
  textColor: string;
  onClick: () => void;
}) {
  return (
    <div
      className={`flex h-45 w-170 rounded-10 border ${borderColor} items-center justify-center gap-12`}
      onClick={onClick}
    >
      <Trash2 className={`${textColor}`} />
      <div className={`font-basic-16 ${textColor}`}>커스텀 삭제하기</div>
    </div>
  );
}

export default function NewsPageHeader({
  articleId,
  scrapId,
  customId,
  isScrapped,
  customBar,
  isCustomized,
  deleteButtonThemeColor,
  onRefresh
}: NewsPageHeaderProps) {
  const [active, setActive] = useState<ActiveButtonType | null>(null);
  const isActive = (key: ActiveButtonType) => active === key;
  const isUser = useAuthStore(isLoggedInUser);
  const [isScrappedNew, setIsScrappedNew] = useState(false);
  const [newScrapId, setNewScrapId] = useState<number | null>(null);

  const { setIsCustomBarVisible } = customBar;

  const deleteButtonBorderStyle = deleteButtonThemeColor.replace(
    /^text-/,
    "border-",
  );
  const [showDialog, setShowDialog] = useState(false);

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

  const confirmDelete = async () => {
    setShowDialog(false);
    const result = await deleteCustom([customId!]);
    if (result) {
      onRefresh?.();
    }
  };

  const cancelDelete = () => {
    setShowDialog(false);
  };

  return (
    <div className="flex items-baseline justify-between">
      <div className="mt-10 flex items-center gap-10">
        {isUser && (
          <IconButton
            iconName={"scrap"}
            onClick={scrapHandler}
            isActive={
              isScrapped || isScrappedNew || isActive(ActiveButton.SCRAP)
            }
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
      {isCustomized && (
        <CustomDeleteButton
          borderColor={deleteButtonBorderStyle}
          textColor={deleteButtonThemeColor}
          onClick={() => {
            setShowDialog(true);
          }}
        />
      )}
      {showDialog && (
        <Dialog
          title="커스텀 정보를 삭제하시겠습니까?"
          description="현재 적용된 모든 커스텀 정보는 삭제됩니다."
          iconComponent={
            <div className="relative flex h-40 w-40 items-center justify-center rounded-full bg-purple-50">
              <div className="relative h-[19.5px] w-[16.5px]">
                <Image
                  src="/assets/trash.png"
                  alt="아이콘"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          }
          leftButton={{ label: "아니요", onClick: cancelDelete }}
          rightButton={{ label: "네", onClick: confirmDelete }}
          onClose={cancelDelete}
        />
      )}
    </div>
  );
}
