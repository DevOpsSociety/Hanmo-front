<<<<<<< HEAD
import { Pretendard } from "./src/app/font";
import type { Config } from "tailwindcss";
=======
>>>>>>> 77f18bdec80fe22ee0e438311a75215c0a4b101d

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        angduk: ['116angduk_honesty1'],
        manSeh: ['var(--font-manSeh)'],
      },
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
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
