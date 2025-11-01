import React from "react";
import type { HighlightInfo } from "@/types/custom/highlightInfo";
import { gethWordDefinition } from "../api/newsWordDefinition";
import { WordDefinition } from "@/types/news/newsWordDefinitionData";
import { X } from "lucide-react";
import { useDeviceStore } from "@/stores/device/useDeviceStore";

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
  const [isScrolling, setIsScrolling] = React.useState(false);

  const isMobile = useDeviceStore((state) => state.isMobile);

  // 팝업 ref
  const popupRef = React.useRef<HTMLDivElement>(null);

  // 스크롤 시작 위치 기록
  const scrollStartPosRef = React.useRef<{ x: number; y: number } | null>(null);

  // 단어 뜻 팝업 상태
  const [wordPopup, setWordPopup] = React.useState<{
    word: string;
    definition: WordDefinition | null;
    position: { x: number; y: number };
    isLoading: boolean;
  } | null>(null);

  // 부모 요소 ref
  const contentRef = React.useRef<HTMLDivElement>(null);

  // 팝업 외부 클릭 감지
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        closeWordPopup();
      }
    };
    const handleTouchOutside = (event: TouchEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        closeWordPopup();
      }
    };

    if (wordPopup) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleTouchOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleTouchOutside);
    };
  }, [wordPopup]);

  // activeIcon 'highlight' -> 형광펜 기능 활성화
  const isHighlightMode = activeIcon === "highlighter";
  const isEraserMode = activeIcon === "eraser";
  const isCustomMode =
    activeIcon === "highlighter" ||
    activeIcon === "eraser" ||
    activeIcon === "theme";

  const fetchWordDefinition = async (word: string) => {
    const response = await gethWordDefinition(word);
    return response;
  };

  const handleMouseDown = (index: number) => {
    // 하이라이트 또는 단어 검색 드래그 허용
    setIsDragging(true);
    setDragStart(index);

    // dragRange 설정 (같은 문자 클릭 시에도)
    if (isCustomMode) {
      setDragRange({
        start: index,
        end: index,
      });
    } else {
      setDragRange(null);
    }
  };

  const handleMouseEnter = (index: number) => {
    if (isDragging && dragStart !== null) {
      setDragRange({
        start: Math.min(dragStart, index),
        end: Math.max(dragStart, index),
      });
    }
  };

  // 터치 드래그 (모바일)
  const handleTouchStart = (
    e: React.TouchEvent<HTMLSpanElement>,
    index: number,
  ) => {
    const touch = e.touches[0];
    if (touch) {
      scrollStartPosRef.current = { x: touch.clientX, y: touch.clientY };
    }

    if (isCustomMode) {
      setIsDragging(false);
      setIsScrolling(false);
      setDragStart(index);
      setDragRange(null);
    } else {
      setIsDragging(true);
      setIsScrolling(false);
      setDragStart(index);
      setDragRange(null);
    }
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (dragStart !== null && isCustomMode) {
      const touch = e.touches[0];
      if (!touch) return;

      // 스크롤 감지: 세로 이동이 가로 이동보다 크면 스크롤
      if (scrollStartPosRef.current) {
        const deltaX = Math.abs(touch.clientX - scrollStartPosRef.current.x);
        const deltaY = Math.abs(touch.clientY - scrollStartPosRef.current.y);

        if (deltaY > deltaX && deltaY > 10) {
          // 스크롤 감지
          setIsScrolling(true);
          return; // 스크롤 중에는 드래그 무시
        }
      }

      // 드래그 중일 때만 preventDefault
      if (isDragging) {
        e.preventDefault();
      }

      // 터치 위치에서 elementFromPoint로 현재 span 찾기
      const element = document.elementFromPoint(touch.clientX, touch.clientY);
      if (!element) return;

      // span 요소의 data-index 속성에서 인덱스 가져오기
      const spanElement = element.closest("[data-char-index]");
      if (!spanElement) return;

      const currentIndex = parseInt(
        spanElement.getAttribute("data-char-index") || "0",
        10,
      );

      // 움직임이 감지되면 즉시 드래그 시작
      if (!isDragging) {
        setIsDragging(true);
        e.preventDefault();
      }

      // 드래그 중일 때만 dragRange 업데이트
      if (isDragging && !isScrolling) {
        setDragRange({
          start: Math.min(dragStart, currentIndex),
          end: Math.max(dragStart, currentIndex),
        });
      }
    }
  };

  const handleTouchEnd = async () => {
    await handleMouseUp();
  };

  const handleMouseUp = async () => {
    // 드래그 상태 초기화
    const wasScrolling = isScrolling;
    setIsDragging(false);
    setIsScrolling(false);
    scrollStartPosRef.current = null;

    if (isCustomMode) {
      // 커스텀 모드일 때는 하이라이트/지우개 기능만 동작 (스크롤이었으면 무시)
      if (dragRange && !wasScrolling) {
        if (isHighlightMode && activeHighlightColor) {
          addHighlight(dragRange.start, dragRange.end, activeHighlightColor);
        } else if (isEraserMode) {
          removeHighlight(dragRange.start, dragRange.end);
        }
      }
      setDragStart(null);
      setDragRange(null);
      return;
    }

    // 커스텀 모드가 아닐 때 -> 단어 검색
    const selection = window.getSelection();
    if (selection && selection.toString().trim()) {
      const selectedText = selection.toString().trim();

      // 선택된 텍스트가 1-10자 사이인 경우만 검색
      if (selectedText.length >= 1 && selectedText.length <= 10) {
        // 같은 단어 검색 방지
        if (wordPopup && wordPopup.word === selectedText) {
          return;
        }

        const rect = selection.getRangeAt(0).getBoundingClientRect();

        // 부모 요소 위치 계산
        const parentRect = contentRef.current?.getBoundingClientRect();

        if (parentRect) {
          // 팝업 화면 밖으로 안나가도록 위칮조정
          let x = rect.left - parentRect.left;
          const y = rect.bottom - parentRect.top + 5;

          const popupWidth = 320;

          // 오른쪽 경계 체크
          if (x + popupWidth > parentRect.width) {
            x = parentRect.width - popupWidth - 10; // 10px 여백
          }

          // 왼쪽 경계 체크
          if (x < 10) {
            x = 10;
          }

          setWordPopup({
            word: selectedText,
            definition: null,
            position: { x, y },
            isLoading: true,
          });
        } else {
          setWordPopup({
            word: selectedText,
            definition: null,
            position: {
              x: rect.left,
              y: rect.bottom + 5,
            },
            isLoading: true,
          });
        }

        // API 호출
        const definition = await fetchWordDefinition(selectedText);
        setWordPopup((prev) =>
          prev
            ? {
                ...prev,
                definition,
                isLoading: false,
              }
            : null,
        );
      }
    }
  };

  // 팝업 닫기
  const closeWordPopup = () => {
    setWordPopup(null);
    // 팝업이 닫힐 때 드래그 상태도 초기화
    setDragStart(null);
    setDragRange(null);
    setIsDragging(false);

    // 브라우저 선택 영역 해제
    const selection = window.getSelection();
    if (selection) {
      selection.removeAllRanges();
    }
  };

  // 하이라이트 범위 확인
  const highlightedRanges = new Set<number>();
  highlights.forEach(({ startPoint, endPoint }) => {
    for (let i = startPoint; i <= endPoint; i++) {
      highlightedRanges.add(i);
    }
  });

  return (
    <div
      className={`relative mb-55 ${isMobile ? "font-basic-16-m" : "font-basic-20-m"} ${themeTextColor1 ?? ""}`}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchMove={handleTouchMove}
      style={{
        userSelect: wordPopup ? "none" : "auto", // 팝업이 열려있으면 텍스트 선택 방지
      }}
      ref={contentRef}
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

        // 드래그 중인 텍스트에 배경색 적용
        const isDragging =
          dragRange && index >= dragRange.start && index <= dragRange.end;
        const dragClass = isDragging ? "bg-purple-200" : "";

        return (
          <span
            key={index}
            data-char-index={index}
            className={`inline-block ${highlightClass ? `bg-${highlightClass}` : ""} ${dragClass} whitespace-pre-line`}
            onMouseDown={() => handleMouseDown(index)}
            onMouseEnter={() => handleMouseEnter(index)}
            onTouchStart={(e) => handleTouchStart(e, index)}
            onTouchEnd={handleTouchEnd}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        );
      })}

      {/* 단어 뜻 팝업 */}
      {wordPopup && (
        <div
          ref={popupRef}
          className="absolute z-50 w-200 rounded-lg border bg-white p-14 shadow-lg"
          style={{
            left: wordPopup.position.x,
            top: wordPopup.position.y,
          }}
        >
          <div className="mb-2 flex items-center justify-between">
            <div className="flex flex-row gap-10">
              <h3 className="font-semibold text-gray-800">{wordPopup.word}</h3>
              <p className="text-13 text-gray-400">
                {wordPopup.definition?.pos}
              </p>
            </div>
            <X
              size={25}
              onClick={closeWordPopup}
              className="pr-2 pb-4 text-gray-400 hover:text-gray-600"
            />
          </div>

          {wordPopup.isLoading ? (
            <div className="text-sm text-gray-500">검색 중...</div>
          ) : (
            <div>
              <div className="text-sm font-light text-gray-700">
                {wordPopup.definition?.definition?.map((def, index) =>
                  def ? (
                    <div key={index} className="mb-1">
                      {def}
                    </div>
                  ) : (
                    <div key={index} className="text-sm text-gray-500">
                      사전에 없는 단어입니다.
                    </div>
                  ),
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
