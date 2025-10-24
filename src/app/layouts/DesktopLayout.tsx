import React from "react";
import DividerProvider from "../providers/DividerProvider";
import ThemeProvider from "../providers/ThemeProvider";
import DesktopHeader from "@/components/headers/DesktopHeader";


function DesktopLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ThemeProvider>
      <DesktopHeader />
      <DividerProvider />
        <div className="px-16 py-20 xl:px-220 xl:py-50 2xl:px-240 2xl:py-70">
          {children}
        </div>
    </ThemeProvider>
  );
}

export default DesktopLayout;
