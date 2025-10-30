"use client";

import { NewsCategory } from "@/types/news/newsCategory";
import Divider from "../Divider";

export function MobileNewsCategoryItem({
  category,
  isSelected,
  onClick,
}: {
  category: NewsCategory;
  isSelected: boolean;
  onClick: (name: string) => void;
}) {
  return (
    <span
      className={`relative inline-block cursor-pointer py-10 font-title-16 whitespace-nowrap transition-colors ${
        isSelected ? "text-purple-500" : "text-gray-400"
      }`}
      onClick={() => onClick(category.name)}
    >
      {category.label}
      {isSelected && (
        <span className="absolute -bottom-1 left-0 h-[1.5px] w-full bg-purple-500 transition-all duration-200 ease-out" />
      )}
    </span>
  );
}

interface Props {
  categories: NewsCategory[];
  currentCategory: string;
  onCategorySelect: (name: string) => void;
}

export default function MobileNewsCategoryBar({
  categories,
  currentCategory,
  onCategorySelect,
}: Props) {
  return (
    <div>
      <div className="flex gap-20 pl-20 after:w-1 after:flex-shrink-0 after:content-['']">
        {categories.map((cat) => (
          <MobileNewsCategoryItem
            key={cat.id}
            category={cat}
            isSelected={currentCategory === cat.name}
            onClick={onCategorySelect}
          />
        ))}
      </div>
      <Divider className="w-max"/>
    </div>
  );
}
