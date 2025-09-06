"use client";

import { useNewsCustomStore } from "@/stores/detail/useNewsCustomStore";

export default function DividerProvider() {
      const globalDividerColor = useNewsCustomStore(
        (state) => state.globalDividerColor,
      );
    return <div className={`h-1 ${globalDividerColor ?? "bg-gray-100"}`}></div>;
}