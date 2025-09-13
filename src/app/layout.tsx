import type { Metadata } from "next";
import "./globals.css";
import { DeviceProvider } from "./providers/DeviceProvider";

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
        <DeviceProvider>{children}</DeviceProvider>
      </body>
    </html>
  );
}
