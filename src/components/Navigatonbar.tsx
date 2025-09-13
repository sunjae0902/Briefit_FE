"use client";

import Link from "next/link";
import { useNavStore } from "@/stores/navigation/useNavStrore";
import { navItems } from "@/constants/navItems";
import { useNavigation } from "@/hooks/useNavigation";
import { useDeviceStore } from "@/stores/device/useDeviceStore";

export default function Navigationbar() {
  const { selectedPath, setSelectedPath } = useNavStore();
  const { containerRef, linkRefs, underlineStyle, handleClick } = useNavigation(
    selectedPath,
    setSelectedPath,
  );
  const isMobile = useDeviceStore((s) => s.isMobile);

  return (
    <nav className="relative sm:bg-purple-500">
      <div
        ref={containerRef}
        className="relative flex items-center pc:gap-50 sm:justify-between sm:px-20"
      >
        {navItems.map(({ label, path }, index) => (
          <Link
            prefetch
            key={path}
            ref={(el) => {
              linkRefs.current[index] = el;
            }}
            href={path}
            onClick={() => handleClick(index, path)}
            className={`block sm:py-10 transition-colors duration-300 ${isMobile ? "" : "font-title-20"} ${
              selectedPath === path
                ? "text-purple-500 sm:text-white sm:font-title-16"
                : "text-gray-400 hover:text-gray-600 sm:text-purple-300 sm:font-basic-16"
            }`}
          >
            {label}
          </Link>
        ))}

        <div
          className="absolute bottom-[-28px] h-3 rounded-full bg-purple-500 transition-all duration-200 ease-out sm:hidden"
          style={{
            width: `${underlineStyle.width}px`,
            transform: `translateX(${underlineStyle.left}px)`,
          }}
        />
      </div>
    </nav>
  );
}
