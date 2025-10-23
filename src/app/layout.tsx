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
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5929488905880864"
          crossOrigin="anonymous"
        ></script>
      </head>
      <body className="font-pretendard">
        <DeviceProvider>{children}</DeviceProvider>
      </body>
    </html>
  );
}
