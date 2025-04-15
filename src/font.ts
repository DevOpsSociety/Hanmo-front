import localFont from "next/font/local";

export const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

export const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const Pretendard = localFont({
  src: [
    {
      path: "./fonts/PretendardVariable.ttf",
      style: "normal",
      weight: "100 900",
    },
  ],
  variable: "--font-pretendard",
});

export const Manseh = localFont({
  src: [
    {
      path: "./fonts/YoonChildfundkoreaManSeh.ttf",
      style: "normal",
      weight: "100 900",
    },
  ],
  variable: "--font-manseh",
});

export const Nexon = localFont({
  src: [
    {
      path: "./fonts/NEXONLv1GothicRegular.ttf",
      style: "normal",
      weight: "100 900",
    },
  ],
  variable: "--font-nexon",
});
