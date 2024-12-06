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
    "50": "950",
    "100": "900",
    "200": "800",
    "300": "700",
    "400": "600",
    "500": "500",
    "600": "400",
    "700": "300",
    "800": "200",
    "900": "100",
    "950": "50",
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
