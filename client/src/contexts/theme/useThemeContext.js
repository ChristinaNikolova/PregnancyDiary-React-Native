import { useContext } from "react";
import { ThemeContext } from "./ThemeContext";

export function useThemeContext() {
    const theme = useContext(ThemeContext);

    if (!theme) {
        throw new Error("useThemeContext must be used within a ThemeProvider");
    }

    return theme;
}