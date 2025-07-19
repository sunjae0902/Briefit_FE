import React from "react";
import type { HighlightInfo } from "@/types/custom/highlightInfo";

export default function NewsContent({
  body,
  themeTextColor1,
  activeIcon,
  highlights,
  addHighlight,
  removeHighlight,
  activeHighlightColor,
}: {
  body: string;
  themeTextColor1?: string | null;
  activeIcon?: string | null;
  highlights: HighlightInfo[];
  addHighlight: (start: number, end: number, color: string) => void;
  removeHighlight: (start: number, end: number) => void;
  activeHighlightColor: string;
}) {
  const [isDragging, setIsDragging] = React.useState(false);
  const [dragStart, setDragStart] = React.useState<number | null>(null);
  const [dragRange, setDragRange] = React.useState<{
    start: number;
    end: number;
  } | null>(null);

  // activeIcon이 'highlight'인 경우에만 형광펜 기능 활성화
  const isHighlightMode = activeIcon === "highlighter";
  const isEraserMode = activeIcon === "eraser";

  const handleMouseDown = (index: number) => {
    if (!isHighlightMode && !isEraserMode) return;
    setIsDragging(true);
    setDragStart(index);
    setDragRange(null);
  };

  const handleMouseEnter = (index: number) => {
    if (!isHighlightMode && !isEraserMode) return;
    if (isDragging && dragStart !== null) {
      setDragRange({
        start: Math.min(dragStart, index),
        end: Math.max(dragStart, index),
      });
    }
  };

  const handleMouseUp = () => {
    if (!isHighlightMode && !isEraserMode) return;
    setIsDragging(false);
    if (dragRange) {
      if (isHighlightMode && activeHighlightColor) {
        addHighlight(dragRange.start, dragRange.end, activeHighlightColor);
      } else if (isEraserMode) {
        removeHighlight(dragRange.start, dragRange.end);
      }
    }
    setDragStart(null);
    setDragRange(null);
  };

  // 하이라이트 범위를 빠르게 확인하기 위한 Set 생성
  const highlightedRanges = new Set<number>();
  highlights.forEach(({ startPoint, endPoint }) => {
    for (let i = startPoint; i <= endPoint; i++) {
      highlightedRanges.add(i);
    }
  });

  return (
    <div
      className={`mb-55 font-basic-20-m ${themeTextColor1 ?? ""}`}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {body.split("").map((char, index) => {
        if (char === "\n") {
          return <br key={index} />;
        }

        const isHighlighted = highlightedRanges.has(index);
        const highlightClass = isHighlighted
          ? highlights.find((h) => index >= h.startPoint && index <= h.endPoint)
              ?.highlightsColor
          : null;

        return (
          <span
            key={index}
            className={`inline-block ${highlightClass ? `bg-${highlightClass}` : ""} whitespace-pre-line`}
            onMouseDown={() => handleMouseDown(index)}
            onMouseEnter={() => handleMouseEnter(index)}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        );
      })}
    </div>
  );
}
