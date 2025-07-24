/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        "loop-scroll": "loop-scroll 100s linear infinite",
      },
      keyframes: {
        "loop-scroll":{
          from: { transform: "translateX(0)"},
          to: { transform: "translatex(-100%)"},
        },
      },
      backgroundImage: {
        'icon-cross': "url('./src/assets/Icons/IconCross.png')",
      },
    },
  },
  plugins: [],
}