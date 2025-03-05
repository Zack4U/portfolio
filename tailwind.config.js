/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    darkMode: "class",
    theme: {
        extend: {
            fontFamily: {
                sans: ["Inter", "system-ui", "sans-serif"],
            },
            colors: {
                crimson: {
                    50: "#fdf2f4",
                    100: "#fce8ec",
                    200: "#f9d0d9",
                    300: "#f4a9b9",
                    400: "#ed7594",
                    500: "#e34a73",
                    600: "#dc143c", // Main crimson
                    700: "#bf0f36",
                    800: "#a00f33",
                    900: "#881131",
                    950: "#4c0519",
                },
            },
            animation: {
                "spin-slow": "spin 3s linear infinite",
                "bounce-slow": "bounce 3s infinite",
            },
            transitionDuration: {
                2000: "2000ms",
            },
        },
    },
    plugins: [],
};
