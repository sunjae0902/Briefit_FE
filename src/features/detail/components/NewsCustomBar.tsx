"use client";

import Image from "next/image";
import React, { useState, useRef } from "react";
import { Check, Eraser, Palette } from "lucide-react";
import HighlightIcon from "@/features/common/HighlightIcon";
import Divider from "@/features/common/Divider";
import { postNewsDetailCustom } from "@/features/detail/api/newsDetailCustom";
import { useCustomBar } from "@/hooks/useCustomBar";
import { useNewsCustomStore } from "@/stores/detail/useNewsCustomStore";
import { useDeviceStore } from "@/stores/device/useDeviceStore";

interface NewsCustomBarProps {
  customBar: ReturnType<typeof useCustomBar>;
  articleId: number; // articleId를 prop으로
  className?: string; // 위치 조정을 위한 추가 클래스
  position?: "fixed" | "absolute" | "relative"; // 포지션 타입 지정
}

export default function NewsCustomBar({
  customBar,
  articleId,
  className = "",
  position = "fixed",
}: NewsCustomBarProps) {
  const setGlobalBgColor = useNewsCustomStore(
    (state) => state.setGlobalBgColor,
  );
  const setGlobalDividerColor = useNewsCustomStore(
    (state) => state.setGlobalDividerColor,
  );

  const isMobile = useDeviceStore((state) => state.isMobile);

  // 커스텀바 드래그 관련 상태 (모바일)
  const [dragPosition, setDragPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });
  const dragRef = useRef<HTMLDivElement>(null);

  // 커스텀 관련 상태를 customBar에서 가져옴
  const {
    isCustomBarVisible,
    setIsCustomBarVisible,
    activeThemeColor,
    setThemeBgColor,
    setThemeTextColor1,
    setThemeTextColor2,
    setThemeBorderColor,
    setThemeDividerColor,
    setThemeCardColor,
    setActiveThemeColor,
    activeHighlightColor,
    setActiveHighlightColor,
    showHighlightPalette,
    setShowHighlightPalette,
    showThemePalette,
    setShowThemePalette,
    activeIcon,
    setActiveIcon,
    highlights,
    undo,
    redo,
  } = customBar;

  // 팔레트 색상 목록
  const highlightColors = [
    { variable: "yellow-highlight", bg: "bg-yellow-highlight" },
    { variable: "green-highlight", bg: "bg-green-highlight" },
    { variable: "pink-highlight", bg: "bg-pink-highlight" },
    { variable: "blue-highlight", bg: "bg-blue-highlight" },
    { variable: "orange-highlight", bg: "bg-orange-highlight" },
    { variable: "purple-highlight", bg: "bg-purple-highlight" },
  ];

  const themeColors = [
    { variable: "white-theme", bg: "bg-white" },
    { variable: "pink-theme", bg: "bg-pink-theme" },
    { variable: "blue-theme", bg: "bg-blue-theme" },
    { variable: "beige-theme", bg: "bg-beige-theme" },
    { variable: "purple-theme", bg: "bg-purple-theme" },
    { variable: "green-theme", bg: "bg-green-theme" },
  ];

  // 아이콘 클릭 핸들러
  const handleIconClick = (
    iconType: "highlighter" | "eraser" | "theme" | "undo" | "redo" | "done",
  ) => {
    setActiveIcon(iconType);
    if (iconType === "highlighter") {
      setShowHighlightPalette((v) => !v);
      if (!activeHighlightColor) {
        setActiveHighlightColor("yellow-highlight");
      }
      if (showThemePalette) {
        setShowThemePalette(false);
      }
    } else if (iconType === "theme") {
      setShowThemePalette((v) => !v);
      if (!activeThemeColor) {
        setActiveThemeColor("white-theme");
      }
      if (showHighlightPalette) {
        setShowHighlightPalette(false);
      }
    } else {
      if (showHighlightPalette) setShowHighlightPalette(false);
      if (showThemePalette) setShowThemePalette(false);

      if (iconType === "undo") undo();
      if (iconType === "redo") redo();
    }
  };

  const handleThemeColorSelect = (color: string) => {
    setActiveThemeColor(color);

    if (color === "white-theme") {
      setGlobalBgColor(null); // 글로벌하게 적용
      setGlobalDividerColor(null);

      setThemeBgColor("");
      setThemeTextColor1("");
      setThemeTextColor2("");
      setThemeBorderColor("");
      setThemeCardColor("");
    } else {
      setGlobalBgColor(`bg-${color}`); // 글로벌하게 적용
      setGlobalDividerColor(`bg-${color}-dark`);

      setThemeBgColor(`bg-${color}`);
      setThemeTextColor1(`text-${color}-text1`);
      setThemeTextColor2(`text-${color}-text2`);
      setThemeBorderColor(`border-${color}-dark`);
      setThemeDividerColor(`bg-${color}-dark`);
      setThemeCardColor(`bg-${color}-light`);
    }
  };

  // 저장 시 API로 전송할 데이터 생성
  const getCustomRequestInfo = () => {
    return {
      backgroundColor: activeThemeColor,
      customInfos: highlights.map(
        ({
          startPoint,
          endPoint,
          highlightsColor,
          highlightsFontColor,
          highlightsFontSize,
          isBold,
        }) => ({
          startPoint,
          endPoint,
          highlightsColor,
          highlightsFontColor,
          highlightsFontSize,
          isBold,
        }),
      ),
    };
  };

  const handleSaveCustom = async () => {
    try {
      const customRequestInfo = getCustomRequestInfo();
      console.log("저장할 커스텀 정보:", customRequestInfo);

      const result = await postNewsDetailCustom(articleId, customRequestInfo);

      if (result) {
        alert("커스텀 정보가 성공적으로 저장되었습니다.");
      }
      setIsCustomBarVisible(false);
    } catch (e) {
      console.error("커스텀 저장 에러:", e);
      alert("커스텀 정보 저장에 실패했습니다.");
      setIsCustomBarVisible(false);
    }
  };

  // 포지션에 따른 기본 클래스 설정
  const getPositionClass = () => {
    switch (position) {
      case "absolute":
        return "absolute top-325 left-10 z-40";
      case "relative":
        return "relative z-40";
      case "fixed":
      default:
        return "fixed top-500 left-100 z-40 -translate-y-1/2";
    }
  };

  // 터치 이벤트 핸들러들 (모바일에서만)
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!isMobile) return;

    const touch = e.touches[0];
    setIsDragging(true);
    setStartPosition({
      x: touch.clientX - dragPosition.x,
      y: touch.clientY - dragPosition.y,
    });
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isMobile || !isDragging) return;

    e.preventDefault(); // 스크롤 방지
    const touch = e.touches[0];

    // 화면 경계 체크 (전체 화면 높이 기준)
    const newX = Math.max(
      10,
      Math.min(window.innerWidth - 85, touch.clientX - startPosition.x),
    );
    const newY = Math.max(
      10 - document.documentElement.scrollTop,
      Math.min(window.innerHeight - 700, touch.clientY - startPosition.y),
    );

    setDragPosition({ x: newX, y: newY });
  };

  const handleTouchEnd = () => {
    if (!isMobile) return;
    setIsDragging(false);
  };

  // 모바일에서 드래그 위치 스타일 계산
  const getMobileDragStyle = () => {
    if (!isMobile || !isCustomBarVisible) return {};

    return {
      transform: `translate(${dragPosition.x}px, ${dragPosition.y}px)`,
      transition: "none",
      position: "fixed" as const,
      zIndex: 50,
    };
  };

  return (
    <div
      className={`${getPositionClass()} flex flex-col items-center gap-6 ${className}`}
      style={isMobile ? getMobileDragStyle() : { pointerEvents: "none" }}
      ref={dragRef}
    >
      {/* 커스텀바 */}
      {isCustomBarVisible && (
        <div
          className={`flex flex-col items-center gap-20 rounded-lg border bg-white px-10 pt-18 pb-10 shadow-sm ${
            isDragging ? "scale-105 shadow-lg" : ""
          }`}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          style={{
            touchAction: "none",
            cursor: isMobile ? "grab" : "default",
            pointerEvents: "auto",
          }}
        >
          {/* highlighter */}
          <div className="relative">
            <HighlightIcon
              tipColor={activeHighlightColor}
              activeIcon={activeIcon}
              onClick={() => handleIconClick("highlighter")}
            />
            {showHighlightPalette && (
              <div className="absolute top-[-30px] left-50 w-100 rounded-lg border bg-white px-10 py-15 shadow-sm">
                <div className="grid grid-cols-2 justify-items-center gap-x-7 gap-y-15">
                  {highlightColors.map((color) => (
                    <div
                      key={color.variable}
                      className={`h-27 w-27 cursor-pointer rounded-full transition ${color.bg} ${
                        activeHighlightColor === color.variable
                          ? "ring-2 ring-purple-500"
                          : ""
                      }`}
                      onClick={() => setActiveHighlightColor(color.variable)}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* eraser */}
          <Eraser
            strokeWidth={2}
            size={30}
            className={`cursor-pointer rounded-md p-3 text-gray-400 hover:bg-purple-100 hover:text-purple-500 ${activeIcon === "eraser" ? "text-purple-500" : "text-gray-400"}`}
            onClick={() => handleIconClick("eraser")}
          />

          {/* theme */}
          <div className="relative">
            <Palette
              strokeWidth={2}
              size={30}
              className={`cursor-pointer rounded-md p-3 hover:bg-purple-100 hover:text-purple-500 ${activeIcon === "theme" ? "text-purple-500" : "text-gray-400"}`}
              onClick={() => handleIconClick("theme")}
            />
            {showThemePalette && (
              <div className="absolute top-[-30px] left-50 w-100 rounded-lg border bg-white px-10 py-15 shadow-sm">
                <div className="grid grid-cols-2 justify-items-center gap-x-7 gap-y-15">
                  {themeColors.map((color) => (
                    <div
                      key={color.variable}
                      className={`h-27 w-27 cursor-pointer rounded-full transition ${color.bg} border ${
                        activeThemeColor === color.variable
                          ? "ring-2 ring-purple-500"
                          : ""
                      }`}
                      onClick={() => handleThemeColorSelect(color.variable)}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          <Divider className="bg-gray-200" />

          {/* undo & redo */}
          <Image
            src="/assets/custom/undo.png"
            alt="undo"
            width={25}
            height={25}
            onClick={() => handleIconClick("undo")}
            className="cursor-pointer p-3"
          />
          <Image
            src="/assets/custom/redo.png"
            alt="redo"
            width={25}
            height={25}
            onClick={() => handleIconClick("redo")}
            className="cursor-pointer p-3"
          />

          <Check
            strokeWidth={5}
            size={32}
            className="mt-2 cursor-pointer rounded-md bg-purple-500 p-7 text-white transition hover:bg-purple-800"
            onClick={handleSaveCustom}
          />
        </div>
      )}
    </div>
  );
}
