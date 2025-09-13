"use client";

import { useEffect, useRef, useState } from "react";
import { navItems } from "@/constants/navItems";

export function useNavigation(
  selectedPath: string,
  setSelectedPath: (path: string) => void,
) {
  const containerRef = useRef<HTMLDivElement>(null);
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const [underlineStyle, setUnderlineStyle] = useState({ width: 0, left: 0 });

  const updateUnderline = (index: number) => {
    const container = containerRef.current;
    const link = linkRefs.current[index];
    if (container && link) {
      const containerRect = container.getBoundingClientRect();
      const linkRect = link.getBoundingClientRect();
      setUnderlineStyle({
        width: linkRect.width,
        left: linkRect.left - containerRect.left,
      });
    }
  };

  const handleClick = (index: number, path: string) => {
    setSelectedPath(path); // Zustand store 업데이트
    updateUnderline(index);
  };

  // selectedPath가 바뀌면 underline 위치 업데이트
  useEffect(() => {
    if (selectedPath) {
      const index = navItems.findIndex((item) => item.path === selectedPath);
      if (index !== -1) setTimeout(() => updateUnderline(index), 0);
    }
  }, [selectedPath]);

  return {
    containerRef,
    linkRefs,
    underlineStyle,
    handleClick,
  };
}