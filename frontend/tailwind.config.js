/** @type {import('tailwindcss').Config} */
const scrollbar = require("tailwind-scrollbar");

module.exports = {
    content: ["./src/**/*.{html,js,jsx,ts,tsx}", "./public/index.html"],
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
                sm_desk: { max: "84em" }, // small desktops (Below 1344px)
                lg_tab: { max: "75em" }, // landscape tablets (Below 1200px)
                tab: { max: "59em" }, // tablets (Below 944px)
                sm_tab: { max: "44em" }, // small tablets (Below 704px)
                mob: { max: "34em" }, // phones (Below 544px)
            },
        },
    },
    plugins: [scrollbar({ nocompatible: true })],
};
