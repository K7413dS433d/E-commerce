/** @type {import('tailwindcss').Config} */
import flowbite from "flowbite-react/tailwind";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", flowbite.content()],
  theme: {
    extend: {
      fontFamily: {
        Gilroy: ["GilroyRegular"],
        Hackney: ["Hackney"],
        Alice: ["Alice"],
      },
      boxShadow: {
        "custom-light": "0px 8px 24px rgba(149, 157, 165, 0.2)",
      },
      colors: {
        primary: "#4FA74F",
        secondary: "#265026",
      },
    },
  },
  plugins: [flowbite.plugin()],
};
