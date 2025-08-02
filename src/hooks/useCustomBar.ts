import { useState, useCallback } from "react";

export interface Highlight {
  id: string;
  startPoint: number;
  endPoint: number;
  highlightsColor: string;
  highlightsFontColor: string;
  highlightsFontSize: number;
  isBold: boolean;
}

export function useCustomBar() {
  const [isCustomBarVisible, setIsCustomBarVisible] = useState(false);
  const [activeThemeColor, setActiveThemeColor] = useState<string>("white-theme");
  const [themeBgColor, setThemeBgColor] = useState<string>("");
  const [themeTextColor1, setThemeTextColor1] = useState<string>("");
  const [themeTextColor2, setThemeTextColor2] = useState<string>("");
  const [themeBorderColor, setThemeBorderColor] = useState<string>("");
  const [themeDividerColor, setThemeDividerColor] = useState<string>("");
  const [themeCardColor, setThemeCardColor] = useState<string>("");

  const [activeHighlightColor, setActiveHighlightColor] = useState<string>("yellow-highlight");
  const [showHighlightPalette, setShowHighlightPalette] = useState(false);
  const [showThemePalette, setShowThemePalette] = useState(false);
  const [activeIcon, setActiveIcon] = useState<"highlighter" | "eraser" | "theme" | "undo" | "redo" | "done" | "">("");
  const [highlights, setHighlights] = useState<Highlight[]>([]);

  const [undoStack, setUndoStack] = useState<{highlights: Highlight[]}[]>([]);
  const [redoStack, setRedoStack] = useState<{highlights: Highlight[]}[]>([]);

  // 커스텀바가 열릴 때 팔레트 상태를 초기화하는 함수
  const resetPalettes = useCallback(() => {
    setShowHighlightPalette(false);
    setShowThemePalette(false);
    setActiveIcon("");
  }, []);

  // 상태 스냅샷 저장
  const saveState = useCallback(() => {
    setUndoStack((prev) => [...prev, { highlights: [...highlights] }]);
    setRedoStack([]); // 새 작업 시 redo 스택 초기화
  }, [highlights]);

  // 하이라이트 추가/제거 함수
  const addHighlight = useCallback((start: number, end: number, color: string) => {
    saveState();
    const newHighlight: Highlight = {
      id: Date.now().toString(),
      startPoint: start,
      endPoint: end,
      highlightsColor: color,
      highlightsFontColor: "black",
      highlightsFontSize: 12,
      isBold: false,
    };
    setHighlights((prev) => [...prev, newHighlight]);
  }, [saveState]);

  // 하이라이트 삭제
  const removeHighlight = useCallback((start: number, end: number) => {
    saveState();
    setHighlights((prev) =>
      prev.filter(
        (highlight) =>
          !(start <= highlight.endPoint && end >= highlight.startPoint) &&
          !(highlight.startPoint <= end && highlight.endPoint >= start)
      )
    );
  }, [saveState]);

  // undo/redo
  const undo = useCallback(() => {
    if (undoStack.length === 0) return;
    setRedoStack((r) => [...r, { highlights: [...highlights] }]);
    const prev = undoStack[undoStack.length - 1];
    setHighlights(prev.highlights);
    setUndoStack((u) => u.slice(0, -1));
  }, [undoStack, highlights]);

  const redo = useCallback(() => {
    if (redoStack.length === 0) return;
    setUndoStack((u) => [...u, { highlights: [...highlights] }]);
    const next = redoStack[redoStack.length - 1];
    setHighlights(next.highlights);
    setRedoStack((r) => r.slice(0, -1));
  }, [redoStack, highlights]);

  return {
    isCustomBarVisible,
    setIsCustomBarVisible,
    activeThemeColor,
    themeBgColor,
    themeTextColor1,
    themeTextColor2,
    themeBorderColor,
    themeDividerColor,
    themeCardColor,
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
    setHighlights,
    addHighlight,
    removeHighlight,
    resetPalettes, // 커스텀바 열릴 때 호출 필요
    saveState,
    undo,
    redo,
  };
}