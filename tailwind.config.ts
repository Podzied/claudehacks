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
        bg: "#FAF9F5",
        "bg-elevated": "#FFFFFF",
        surface: "#F4F3EE",
        "surface-light": "#E8E6DC",
        border: "#E8E6DC",
        "border-light": "#D5D3C9",
        text: "#141413",
        "text-secondary": "#544F47",
        "text-muted": "#B0AEA5",
        primary: "#D97757",
        "primary-dark": "#C15F3C",
        "primary-glow": "rgba(217, 119, 87, 0.15)",
        accent: "#6A9BCC",
      },
      fontFamily: {
        display: ["'Space Grotesk'", "ui-sans-serif", "system-ui", "sans-serif"],
        body: ["'Inter'", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["'JetBrains Mono'", "ui-monospace", "monospace"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-primary": "linear-gradient(135deg, #D97757, #C15F3C)",
        "gradient-primary-subtle": "linear-gradient(135deg, rgba(217,119,87,0.08), rgba(193,95,60,0.04))",
      },
      animation: {
        "gradient-shift": "gradient-shift 4s ease infinite",
        "float": "float 6s ease-in-out infinite",
        "pulse-glow": "pulse-glow 3s ease-in-out infinite",
        "slide-up": "slide-up 0.5s ease-out",
        "fade-in": "fade-in 0.6s ease-out",
      },
      keyframes: {
        "gradient-shift": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "0.8" },
        },
        "slide-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
