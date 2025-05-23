import { Nexon } from "./src/font";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        angduk: ["116angduk_honesty1"],
        manSeh: ["var(--font-manSeh)"],
        pretendard: ["var(--font-pretendard)"],
        geistMono: ["var(--font-geist-mono)"],
        geistSans: ["var(--font-geist-sans)"],
        nexon: ["var(--font-nexon)"],
        nexonbold: ["var(--font-nexonbold)"],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
};
export default config;
