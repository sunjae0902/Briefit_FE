"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";

type PositionedWord = {
  word: string;
  top: number;
  left: number;
  fontSize: number;
  color: string;
};

export default function WordCloudClient({
  positionedWords,
  width,
  height,
}: {
  positionedWords: PositionedWord[];
  width: number;
  height: number;
}) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const router = useRouter();

  return (
    <div
      className="relative pc:mx-auto"
      style={{
        width,
        height,
      }}
    >
      {positionedWords.map(({ word, fontSize, top, left, color }, index) => (
        <span
          key={index}
          className={`absolute ${color} cursor-pointer underline-offset-4 hover:underline`}
          style={{
            top,
            left,
            fontSize,
            fontWeight: 500,
            whiteSpace: "nowrap",
            opacity: hoveredIndex === null || hoveredIndex === index ? 1 : 0.6,
            transition: "opacity 0.2s",
          }}
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
          onClick={() => {router.push(`/search?keyword=${word}`)}}
        >
          {word}
        </span>
      ))}
    </div>
  );
}