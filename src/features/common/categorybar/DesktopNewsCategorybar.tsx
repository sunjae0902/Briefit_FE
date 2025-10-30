"use client";

import { NewsCategory } from "@/types/news/newsCategory";

export function DesktopNewsCategoryItem({
  category,
  isSelected,
  onClick,
}: {
  category: NewsCategory;
  isSelected: boolean;
  onClick: (name: string) => void;
}) {
  return (
    <button
      onClick={() => onClick(category.name)}
      className={`rounded-full px-16 py-6 font-basic-16 transition-colors duration-200 ${
        isSelected ? "bg-purple-500 text-white" : "bg-gray-50 hover:bg-gray-100"
      }`}
    >
      {category.label}
    </button>
  );
}

interface Props {
  categories: NewsCategory[];
  currentCategory: string;
  onCategorySelect: (name: string) => void;
}

export default function DesktopNewsCategoryBar({
  categories,
  currentCategory,
  onCategorySelect,
}: Props) {
  return (
    <div className="-mx-4 overflow-x-auto px-4">
      <div className="flex w-max min-w-full gap-10">
        {categories.map((cat) => (
          <DesktopNewsCategoryItem
            key={cat.id}
            category={cat}
            isSelected={currentCategory === cat.name}
            onClick={onCategorySelect}
          />
        ))}
      </div>
    </div>
  );
}
