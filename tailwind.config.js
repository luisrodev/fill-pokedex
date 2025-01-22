/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      desktop: "768px",
    },
    extend: {
      keyframes: {
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
        jump: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "wiggle-jump": {
          "0%, 100%": {
            transform: "translateY(0) rotate(0deg)",
          },
          "25%": { transform: " rotate(9deg)" },
          "75%": { transform: " rotate(-9deg)" },
          "50%": { transform: "translateY(-10px) rotate(0deg)" },
        },
        "bounce-right": {
          "0%, 100%": {
            transform: "translateX(0%)",
            animationTimingFunction: "cubic-bezier(0.8, 0, 1, 1)",
          },
          "50%": {
            transform: "translateX(25%)",
            animationTimingFunction: "cubic-bezier(0, 0, 0.2, 1)",
          },
        },
      },
      animation: {
        wiggle: "wiggle 0.2s ease-in-out forwards",
        "bounce-right": "bounce-right 1s infinite",
        "fast-jump": "jump 0.3s ease-in-out forwards",
        "wiggle-jump": "wiggle-jump 0.2s ease-in-out forwards",
      },
    },
  },
  plugins: [],
};
