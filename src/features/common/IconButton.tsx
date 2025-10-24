"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import React from "react";

type IconButtonProps = {
  iconName: string; // assets/ 아래 파일 이름 (확장자 제외)
  isActive?: boolean; // optional
  onClick: (e: React.MouseEvent) => void;
  alt?: string;
  className?: string;
  style?: React.CSSProperties;
  size?: number; // width/height 직접 조절
};

export default function IconButton({
  iconName,
  isActive,
  onClick,
  alt = iconName,
  className = "cursor-pointer", // Tailwind 기본
  style = {},
  size = 40, // 기본값 40
}: IconButtonProps) {
  const imgSrc =
    isActive === undefined
      ? `/assets/${iconName}.png`
      : `/assets/${iconName}-${isActive ? "active" : "inactive"}.png`;

  return (
    <Button
      variant="ghost"
      className={`${className} hover:bg-transparent`}
      onClick={(e: React.MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();
        onClick(e);
      }}
      style={style}
    >
      <Image src={imgSrc} alt={alt} width={size} height={size} />
    </Button>
  );
}
