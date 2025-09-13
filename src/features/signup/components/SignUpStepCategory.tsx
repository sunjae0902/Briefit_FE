import { Button } from "@/components/ui/button";
import { useSignUpStore } from "@/stores/signup/useSignUpStore";

export default function SignUpStepCategory({
  onPrev,
  onNext,
}: {
  onPrev: () => void;
  onNext: () => void;
}) {
  const categories = useSignUpStore((state) => state.categories);
  const addCategory = useSignUpStore((state) => state.addCategory);
  const removeCategory = useSignUpStore((state) => state.removeCategory);

  const categoryList = [
    "세계",
    "경제",
    "문화",
    "스포츠",
    "IT",
    "사회",
    "연예",
    "정치",
  ];

  const handleSelect = (category: string) => {
    if (categories.includes(category)) {
      removeCategory(category);
    } else if (categories.length < 3) {
      addCategory(category);
    }
  };

  return (
    <div className="mt-10 mb-55 w-full sm:px-30 sm:mb-80">
      <div>
        <h3 className="mb-2 font-semibold sm:text-18 sm:mb-5">관심있는 분야를 선택해주세요</h3>
        <p className="mb-22 text-xs text-gray-400 sm:text-14 sm:mb-30">
          최대 3개까지 선택할 수 있어요
        </p>
        <div className="mb-70 grid w-full grid-cols-2 gap-10 sm:gap-15 sm:mb-100">
          {categoryList.map((category) => {
            const isSelected = categories.includes(category);
            return (
              <div
                key={category}
                onClick={() => handleSelect(category)}
                className={`flex cursor-pointer items-center justify-center rounded-7 border py-13 transition-colors duration-200 sm:py-18 sm:text-16 ${
                  isSelected
                    ? "border-purple-500 bg-purple-50 text-purple-500"
                    : "border-gray-100 text-gray-900 hover:border-purple-300 hover:text-purple-500"
                } `}
              >
                {category}
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex">
        <Button
          onClick={onPrev}
          className="hover:bg-inherited absolute bottom-30 left-30 cursor-pointer rounded-md bg-purple-500 px-10 py-14 text-white sm:px-20 sm:py-18 sm:text-16"
        >
          이전
        </Button>
        <Button
          onClick={onNext}
          className={`hover:bg-inherited hover: absolute right-30 bottom-30 cursor-pointer rounded-md px-10 py-14 sm:px-20 sm:py-18 sm:text-16 ${categories.length === 0 ? "cursor-not-allowed bg-gray-100 text-gray-800" : "bg-purple-500 text-white"}`}
          disabled={categories.length === 0}
        >
          다음
        </Button>
      </div>
    </div>
  );
}
