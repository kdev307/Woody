/** @type {import('tailwindcss').Config} */
const scrollbar = require("tailwind-scrollbar");

module.exports = {
    content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
    theme: {
        extend: {
            fontFamily: {
                playfair: ['"Playfair Display"', "serif"],
                roboto: ["Roboto", "sans-serif"],
                merriweather: ["Merriweather", "serif"],
            },
            boxShadow: {
                "scrollbar-track": "inset 0 0 5px #014221",
            },
            backgroundImage: {
                "custom-gradient":
                    "linear-gradient(to right, #98bd8d, #c2daba, #fff, #c2daba, #98bd8d)",
            },
            screens: {
                sm: "640px",
                md: "768px",
                lg: "1024px",
                xl: "1280px",
                "2xl": "1536px",
            },
        },
    },
    plugins: [scrollbar({ nocompatible: true })],
};
