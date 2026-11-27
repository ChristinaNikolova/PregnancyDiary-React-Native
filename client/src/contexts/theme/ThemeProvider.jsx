import { useMemo, useState, useEffect } from "react";
import { useColorScheme } from "react-native";
import { setBackgroundColorAsync } from "expo-system-ui";
import { DefaultTheme, DarkTheme } from "@react-navigation/native";
import { ThemeContext } from "./ThemeContext.js";

export default function ThemeProvider({ children }) {
    const colorScheme = useColorScheme();
    const [manualDarkMode, setManualDarkMode] = useState(null);
    const isDarkMode = manualDarkMode ?? colorScheme === "dark";

    const lightTheme = useMemo(() => ({
        ...DefaultTheme,
        dark: false,
        colors: {
            ...DefaultTheme.colors,
            background: "#FAF5EF",
            surface: "#FFFFFF",
            primary: "#B77C72",
            secondary: "#EAD9CE",
            accent: "#D5B99D",
            sage: "#A9B19A",
            text: "#49372F",
            textSecondary: "#8C7B72",
            border: "#E8DED5",
            white: "#FFFFFF",
            error: "#C65D5D",
            softError: "#FCECEC",
            clearBackground: "rgba(255, 248, 241, 0.35)",
            whiteBackground: "rgba(250, 245, 239, 0.65)",
            greyBackground: "rgba(0,0,0,0.35)",
        },
    }), []);

    const darkTheme = useMemo(() => ({
        ...DarkTheme,
        dark: true,
        colors: {
            ...DarkTheme.colors,
            background: "#211D1C",
            surface: "#302927",
            primary: "#C58B80",
            secondary: "#57413D",
            accent: "#B99A7E",
            sage: "#929C83",
            text: "#F5EAE3",
            textSecondary: "#B9A69D",
            border: "#493D39",
            white: "#FFFFFF",
            error: "#E58A85",
            softError: "#482E2D",
            clearBackground: "rgba(33, 29, 28, 0.35)",
            whiteBackground: "rgba(48, 41, 39, 0.75)",
            greyBackground: "rgba(0, 0, 0, 0.55)",
        },
    }), []);

    useEffect(() => {
        setBackgroundColorAsync(isDarkMode ? darkTheme.colors.background : lightTheme.colors.background);
    }, [isDarkMode]);

    const toggleTheme = () => {
        setManualDarkMode((prevMode) => !prevMode);
    };

    const contextValue = {
        toggleTheme,
        isDarkMode,
        theme: isDarkMode ? darkTheme : lightTheme,
    };

    return (
        <ThemeContext.Provider value={contextValue}>
            {children}
        </ThemeContext.Provider>
    );
}
