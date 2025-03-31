import { Pretendard } from "./src/app/font";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        Pretendard: ["var(--font-pretendard)"],
        geistMono: ["var(--font-geist-mono)"],
        geistSans: ["var(--font-geist-sans)"],
      },
    },
  },
  plugins: [],
};
export default config;
