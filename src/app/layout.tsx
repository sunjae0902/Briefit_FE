import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import ThemeProvider from "./providers/ThemeProvider";
import DividerProvider from "./providers/DividerProvider";
import { DeviceProvider } from "./providers/DevicePropiver";

export const metadata: Metadata = {
  title: "Briefit",
  description: "개인 맞춤형 뉴스 서비스",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="font-pretendard">
        <DeviceProvider>
          <ThemeProvider>
            <Header />
            <DividerProvider />
            <div className="px-16 py-20 xl:px-160 xl:py-50 2xl:px-240 2xl:py-70">
              {children}
            </div>
          </ThemeProvider>
        </DeviceProvider>
      </body>
    </html>
  );
}
