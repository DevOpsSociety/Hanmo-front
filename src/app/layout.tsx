import type { Metadata } from "next";
import { geistMono, geistSans, Manseh, Nexon, Pretendard } from "../font";
import "./globals.css";
import "slick-carousel/slick/slick.css";     
import "slick-carousel/slick/slick-theme.css";

export const metadata: Metadata = {
  title: "한모",
  description: "한세에서 모여봐요!",
  manifest: '/manifest.json',
  icons: {
    icon: '/icons/icon-192x192.png',
    apple: '/icons/icon-192x192.png',
  },
  themeColor: '#134D80',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#134D80" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${Pretendard.variable} ${Manseh.variable} ${Nexon.variable} antialiased h-screen`}
      >
        {children}
      </body>
    </html>
  );
}
