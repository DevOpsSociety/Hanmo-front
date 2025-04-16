import type { Metadata } from "next";
import "./globals.css";
import { geistMono, geistSans, Pretendard, Manseh, Nexon } from "../font";

export const metadata: Metadata = {
  title: "한모",
  description: "한세에서 모여봐요!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${Pretendard.variable} ${Manseh.variable} ${Nexon.variable} antialiased h-screen`}
      >
        {children}
      </body>
    </html>
  );
}
