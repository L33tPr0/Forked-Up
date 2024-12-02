import type { Config } from "tailwindcss";
import { createThemes } from "tw-colors";
import colors from "tailwindcss/colors";

const baseColors = [
    "gray",
    "red",
    "orange",
    "yellow",
    "green",
    "blue",
    "purple",
    "indigo",
    "pink",
    "slate",
    "emerald",
];

const shadeMapping = {
    "50": "900",
    "100": "800",
    "200": "700",
    "300": "600",
    "400": "500",
    "500": "400",
    "600": "300",
    "700": "200",
    "800": "100",
    "900": "50",
};

const generateThemeObject = (
    colors,
    mapping: { [key: string]: string },
    invert = false
) => {
    const theme = {};
    baseColors.forEach((color) => {
        theme[color] = {};
        Object.entries(mapping).forEach(([key, value]) => {
            const shadeKey = invert ? value : key;
            theme[color][key] = colors[color][shadeKey];
        });
    });
    return theme;
};

const lightTheme = generateThemeObject(colors, shadeMapping);
const darkTheme = generateThemeObject(colors, shadeMapping, true);

const themes = {
    light: {
        ...lightTheme,
        white: "#ffffff",
    },
    dark: {
        ...darkTheme,
        white: colors.gray["950"],
        black: colors.gray["50"],
    },
};

const config: Config = {
    darkMode: "class",
    content: ["./index.html", "./src/**/*.{ts,js,jsx,tsx}"],
    theme: {
        extend: {
            backgroundImage: {},
        },
    },
    plugins: [createThemes(themes)],
};

export default config;
