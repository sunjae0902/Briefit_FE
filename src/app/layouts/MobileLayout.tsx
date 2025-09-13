import React from "react";
import DividerProvider from "../providers/DividerProvider";
import ThemeProvider from "../providers/ThemeProvider";
import MobileHeader from "@/components/headers/MobileHeader";

export default function MobileLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ThemeProvider>
      <MobileHeader />
      <DividerProvider />
      <div className="px-20">{children}</div>
    </ThemeProvider>
  );
}
