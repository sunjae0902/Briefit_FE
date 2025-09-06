"use client";

import { useNewsCustomStore } from "@/stores/detail/useNewsCustomStore";

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const gobalBgColor  = useNewsCustomStore((state) => state.globalBgColor);

  return <div className={`min-h-screen ${gobalBgColor || ""}`}>{children}</div>;
}
