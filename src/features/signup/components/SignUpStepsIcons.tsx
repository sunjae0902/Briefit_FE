import { LogIn, Tag, UserRoundPen } from "lucide-react";

interface SignUpStepIndicatorProps {
  currentStep: number;
}

export default function SignUpStepsIcons({
  currentStep,
}: SignUpStepIndicatorProps) {
  const active = "text-purple-500";
  const inactive = "text-gray-500";

  return (
    <div className="mb-40">
      <div className="flex items-center justify-center gap-4 px-15 sm:gap-6">
        <LogIn strokeWidth={1.7} size={16} className="text-gray-500 sm:size-20" />
        <div className="mx-1 h-1 w-55 flex-1 bg-gray-300 sm:w-70" />
        <UserRoundPen
          strokeWidth={1.7}
          size={17}
          className={`sm:size-20 ${currentStep === 0 ? active : inactive}`}
        />
        <div className="mx-1 h-1 w-55 flex-1 bg-gray-300 sm:w-70" />
        <Tag
          strokeWidth={1.7}
          size={16}
          className={`sm:size-20 ${currentStep === 1 ? active : inactive}`}
        />
      </div>
      <div className="flex justify-between text-11 mt-5 sm:mt-8">
        <span className="text-gray-500">소셜 로그인</span>
        <span className={currentStep === 0 ? active : inactive}>회원 정보</span>
        <span className={`${currentStep === 1 ? active : inactive} ml-7`}>분야 선택</span>
      </div>
    </div>
  );
}
