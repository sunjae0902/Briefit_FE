"use client";

import { CheckSquare2, ChevronDown, Square } from "lucide-react";
import React, { useState, useRef, useEffect } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { PressCompany } from "@/types/news/pressCompany";
import { pressCompanyNameMap } from "@/constants/pressCompanyNameMap";

interface PressCompanyFilterPopupProps {
  pressCompanyList: PressCompany[];
}

export default function PressCompanyFilterPopup({
  pressCompanyList,
}: PressCompanyFilterPopupProps) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string>("전체"); // string 타입
  const popupRef = useRef<HTMLDivElement>(null);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // searchParams 변경 시 selected 초기화
  useEffect(() => {
    const company = searchParams.get("company");
    if (company && company !== "전체") {
      setSelected(company);
    } else {
      setSelected("전체");
    }
  }, [searchParams]);

  // 바깥 클릭 시 팝업 닫기
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  const toggleSelect = (title: string) => {
    setSelected(title);

    const params = new URLSearchParams(searchParams.toString());
    if (title === "전체") {
      params.delete("company");
    } else {
      params.set("company", title);
    }

    router.push(`${pathname}?${params.toString()}`);
    setOpen(false);
  };

  const allSelected = selected === "전체";
  const selectedPressCompanyName = pressCompanyNameMap[selected] || selected;
  return (
    <div className="relative inline-block" ref={popupRef}>
      <div
        className="flex cursor-pointer items-center gap-6"
        onClick={() => setOpen((prev) => !prev)}
      >
        <div className="font-basic-16 text-gray-400">
          {selectedPressCompanyName}
        </div>
        <div
          className={`text-gray-400 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        >
          <ChevronDown />
        </div>
      </div>

      {/* 팝업 영역 */}
      <div
        className={`absolute right-0 z-50 h-[240px] w-[350px] origin-top rounded-xl border border-gray-200 bg-white p-20 shadow-lg transition-all duration-300 ease-out ${
          open
            ? "scale-100 opacity-100"
            : "pointer-events-none scale-95 opacity-0"
        }`}
      >
        <div className="grid h-full grid-cols-2 gap-x-10 gap-y-10">
          <div
            className="flex cursor-pointer items-center gap-10"
            onClick={() => toggleSelect("전체")}
          >
            {allSelected ? (
              <CheckSquare2 fill="#7B47FF" color="white" strokeWidth={1} />
            ) : (
              <Square className="text-gray-400" strokeWidth={1} />
            )}
            <div className="font-basic-16">전체</div>
          </div>

          {pressCompanyList.map((company, index) => {
            const isSelected = selected === company.name;
            const parsedName = pressCompanyNameMap[company.name] || company.name;
            return (
              <div
                key={index}
                className="flex cursor-pointer items-center gap-10"
                onClick={() => toggleSelect(company.name)}
              >
                {isSelected ? (
                  <CheckSquare2 fill="#7B47FF" color="white" strokeWidth={1} />
                ) : (
                  <Square className="text-gray-400" strokeWidth={1} />
                )}
                <div className="font-basic-16">{parsedName}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}