"use client";

import { useEffect, useState } from "react";
import WordCloudClient from "./WordCloudClient";
import { WordCloudData } from "@/types/wordcloud/wordCloudData";

type PositionedWord = {
  word: string;
  top: number;
  left: number;
  fontSize: number;
  color: string;
};

type DOMRectLike = {
  top: number;
  left: number;
  width: number;
  height: number;
};

// 시드 기반 랜덤
function seededRandom(seed: number): () => number {
  return function () {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
}

function getRandomColor(rand: () => number) {
  const colors = ["text-orange-100", "text-purple-500", "text-green-500"];
  return colors[Math.floor(rand() * colors.length)];
}

function isOverlapping(
  newRect: DOMRectLike,
  existingRects: DOMRectLike[],
  margin: number,
) {
  return existingRects.some((rect) => {
    return !(
      newRect.left + newRect.width + margin < rect.left ||
      newRect.left > rect.left + rect.width + margin ||
      newRect.top + newRect.height + margin < rect.top ||
      newRect.top > rect.top + rect.height + margin
    );
  });
}

function normalizeScoreToFontSize(
  score: number,
  min: number,
  max: number,
  minScore: number,
  maxScore: number,
) {
  if (maxScore === minScore) return (min + max) / 2;
  return ((score - minScore) / (maxScore - minScore)) * (max - min) + min;
}

export default function WordCloudResponsive({
  wordCloudData,
  minFontSize,
  maxFontSize,
}: {
  wordCloudData: WordCloudData;
  minFontSize: number;
  maxFontSize: number;
}) {
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    const updateWidth = () => setWindowWidth(window.innerWidth);
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  if (!windowWidth) return null;

  // 최대 너비 제한
  const containerWidth = Math.min(windowWidth * 0.9, 800);
  // 최대/최소 높이 제한
  const containerHeight = Math.max(Math.min(containerWidth * 0.625, 500), 183); // 800*0.625=500 기준

  const wordList = wordCloudData.words;
  const seed = new Date(wordCloudData.createdAt).getTime();
  const rand = seededRandom(seed);

  const positionedWords: PositionedWord[] = [];
  const existingRects: DOMRectLike[] = [];

  const scores = wordList.map((w) => w.score);
  const minScore = Math.min(...scores);
  const maxScore = Math.max(...scores);

  for (let i = 0; i < wordList.length; i++) {
    const { word, score } = wordList[i];
    const fontSize = normalizeScoreToFontSize(
      score,
      minFontSize,
      maxFontSize,
      minScore,
      maxScore,
    );
    const width = word.length * (fontSize * 0.6);
    const height = fontSize * 1.2;
    const margin = 15;
    const color = getRandomColor(rand);

    let attempts = 0;
    let position: { top: number; left: number };

    while (true) {
      const left = rand() * (containerWidth - width - margin);
      const top = rand() * (containerHeight - height - margin);
      const newRect = { top, left, width, height };

      if (!isOverlapping(newRect, existingRects, margin) || attempts > 20) {
        existingRects.push(newRect);
        position = { top, left };
        break;
      }
      attempts++;
    }

    positionedWords.push({
      word,
      fontSize,
      top: position.top,
      left: position.left,
      color,
    });
  }

  return (
    <WordCloudClient
      positionedWords={positionedWords}
      width={containerWidth}
      height={containerHeight}
    />
  );
}