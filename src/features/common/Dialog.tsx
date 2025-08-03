import React from "react";

type DialogProps = {
  iconComponent?: React.ReactNode; // 예: <AlertTriangle className="text-red-500" />
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
};

export default function Dialog({
  iconComponent,
  title,
  description,
  leftButton,
  rightButton,
}: DialogProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-sm items-center justify-center rounded-20 bg-white p-20 text-center">
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
              className="rounded-full bg-purple-500 w-90 py-10 text-white "
              onClick={leftButton.onClick}
            >
              {leftButton.label}
            </button>
          )}
          {rightButton && (
            <button
              className="rounded-full bg-white border border-purple-500 w-90 py-10 text-purple-500"
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
