"use client"
import { createContext, ReactNode, useContext, useState } from "react";

// Define a proper context type
interface ThemeContextType {
    theme: string;
    tggleTheme: (theme?: string) => void;
}

// Initialize context with null
export const ThemeContext = createContext<ThemeContextType | null>(null);

export function ThemeProviderFunc({ children }: { children: ReactNode }) {
    const [theme, setTheme] = useState("light");

    function tggleTheme(theme?: string): void {
        // If a theme is provided, toggle to it; else toggle current
        if (theme == "light") {
            setTheme("dark");
        } else {
            setTheme("light");
        }
    }

    return (
        <ThemeContext.Provider value={{ theme, tggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);

    if (context === null) {
        throw new Error("useTheme must be used within a ThemeProviderFunc");
    }

    return context;
}
