/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
    darkMode: "class",
    theme: {
        extend: {
            fontFamily: {
                display: ["Inter", "sans-serif"],
            },
            colors: {
                textPrimary: "#09080C",
                textSecondary: "#57565E",
                textMuted: "#C0BEC3",
                primary: "",
                secondary: "",
                alternative: "",
            },
        },
    },
    plugins: [],
};
