/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    screens: {
      sm: "375px",
      md: "768px",
      lg: "1440px",
    },
    colors: {
      "dark-gray": "hsl(248, 10%, 15%)",
      gray: "hsl(251, 9%, 53%)",
      "light-gray": "hsl(252, 11%, 91%)",
      slate: "hsl(248, 15%, 11%)",
      lime: "hsl(127, 100%, 82%)",
      red: "hsl(0, 91%, 63%)",
      orange: "hsl(13, 95%, 66%)",
      yellow: "hsl(42, 91%, 68%)",
    },
    extend: {
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
