"use client";

import { useState, useEffect } from "react";
import { useAuthStore, isLoggedInUser } from "@/stores/auth/useAuthStore";
import IconButton from "@/features/common/IconButton";
import { useCustomBar } from "@/hooks/useCustomBar";
import postScrap, { deleteScrap } from "../api/newsDetailIScrap";
import { Trash2 } from "lucide-react";
import Dialog from "@/features/common/Dialog";
import Image from "next/image";
import { deleteCustom } from "../api/newsDetailCustom";
import { useDeviceStore } from "@/stores/device/useDeviceStore";

type NewsPageHeaderProps = {
  articleId: number;
  scrapId: number | null; // 스크랩 ID 추가
  customId: number | null;
  customBar: ReturnType<typeof useCustomBar>;
  isCustomized: boolean;
  deleteButtonThemeColor: string;
  iconSize?: number;
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
  const isMobile = useDeviceStore((state) => state.isMobile);
  return (
    <div
      className={`flex rounded-8 border py-7 pc:px-16 sm:px-6 ${borderColor} hover:bor cursor-pointer items-center justify-center pc:gap-12 sm:gap-4`}
      onClick={onClick}
    >
      <Trash2 className={`${textColor} sm:size-20`} />
      <div
        className={`${isMobile ? "font-basic-14" : "font-basic-16"} ${textColor}`}
      >
        커스텀 삭제하기
      </div>
    </div>
  );
}

export default function NewsPageHeader({
  articleId,
  scrapId,
  customId,
  customBar,
  isCustomized,
  deleteButtonThemeColor,
  iconSize,
  onRefresh,
}: NewsPageHeaderProps) {
  const [active, setActive] = useState<ActiveButtonType | null>(null);
  const isActive = (key: ActiveButtonType) => active === key;

  const isUser = useAuthStore(isLoggedInUser);

  const [newScrapId, setNewScrapId] = useState<number | null>(scrapId);

  const { setIsCustomBarVisible, isCustomBarVisible } = customBar;

  useEffect(() => {
    if (!isCustomBarVisible) {
      setActive(active === ActiveButton.CUSTOM ? null : active);
    }
  }, [isCustomBarVisible, active]);

  const deleteButtonBorderStyle = deleteButtonThemeColor.replace(
    /^text-/,
    "border-",
  );
  const [showDialog, setShowDialog] = useState(false);

  const scrapHandler = async () => {
    if (newScrapId) {
      // newScrapId가 있는 경우 -> 스크랩 해제
      setNewScrapId(null); // 임시 (UI먼저 업데이트)
      if (newScrapId !== -1) {
        try {
          await deleteScrap({ id: newScrapId });
        } catch {
          // 실패시 롤백
          setNewScrapId(scrapId);
        }
      }
    } else {
      // newScrapId가 없는 경우 -> 스크랩
      const tempId = -1; // 임시 ID (UI먼저 업데이트)
      setNewScrapId(tempId);

      try {
        const result = await postScrap({ id: articleId });
        if (result) {
          setNewScrapId(result);
        }
      } catch {
        // 실패시 롤백
        setNewScrapId(null);
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
    <div className="flex w-full items-baseline justify-between">
      <div className="mt-10 flex items-center gap-10 sm:gap-0">
        {isUser && (
          <IconButton
            iconName={"scrap"}
            onClick={scrapHandler}
            isActive={Boolean(newScrapId)}
            alt="스크랩"
            size={iconSize}
          ></IconButton>
        )}
        <IconButton
          iconName={"share"}
          onClick={shareHandler}
          isActive={isActive(ActiveButton.SHARE)}
          alt="공유"
          size={iconSize}
        ></IconButton>
        {isUser && (
          <IconButton
            iconName={"pencil"}
            onClick={customHandler}
            isActive={isActive(ActiveButton.CUSTOM)}
            alt="커스텀"
            size={iconSize}
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
            <div className="relative flex size-40 items-center justify-center rounded-full bg-purple-50 sm:size-20">
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
          rightButton={{ label: "네", onClick: confirmDelete, isPrimary: true }}
          onClose={cancelDelete}
        />
      )}
    </div>
  );
}
