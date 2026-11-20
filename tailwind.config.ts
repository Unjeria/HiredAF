import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "#11120F",
        paper: "#F7F7F2",
        lime: "#C8F169",
        muted: "#77796F",
      },
      fontFamily: {
        sans: ["Arial", "Helvetica", "sans-serif"],
      },
      boxShadow: {
        soft: "0 20px 60px rgba(17,18,15,0.08)",
      },
    },
  },
  plugins: [],
};

export default config;
