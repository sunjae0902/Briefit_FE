import React from "react";
import { X } from "lucide-react";

type DialogProps = {
  iconComponent?: React.ReactNode;
  title: string;
  description: string;
  leftButton?: {
    label: string;
    onClick: () => void;
  };
  rightButton?: {
    label: string;
    onClick: () => void;
  };
  onClose?: () => void; // 닫기 콜백 추가
};

export default function Dialog({
  iconComponent,
  title,
  description,
  leftButton,
  rightButton,
  onClose,
}: DialogProps) {
  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="relative w-full max-w-sm rounded-20 bg-white p-20 text-center">
        {/* 닫기 버튼 */}
        {onClose && <X className="absolute -top-30 right-0 text-gray-50 w-24 h-24" onClick={onClose}/>}

        {/* 아이콘 */}
        {iconComponent && (
          <div className="mb-20 flex justify-center">{iconComponent}</div>
        )}

        {/* 텍스트 */}
        <p className="mb-10 font-title-20">{title}</p>
        <p className="mb-27 font-basic-16">{description}</p>

        {/* 버튼 */}
        <div className="flex justify-center gap-20">
          {leftButton && (
            <button
              className="w-90 rounded-full bg-purple-500 py-10 text-white"
              onClick={leftButton.onClick}
            >
              {leftButton.label}
            </button>
          )}
          {rightButton && (
            <button
              className="w-90 rounded-full border border-purple-500 bg-white py-10 text-purple-500"
              onClick={rightButton.onClick}
            >
              {rightButton.label}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}