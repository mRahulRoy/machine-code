import { createContext, ReactNode, useContext, useState } from "react"

const initialState = {
    theme: "light",
    toggleTheme: () => { }
}



const ThemeContext = createContext(initialState);



export function ThemeContextProvider({ children }: { children: ReactNode }) {
    const [theme, setTheme] = useState("light");

    function toggleTheme() {
        setTheme(theme == "light" ? "dark" : "light")
        document.documentElement.setAttribute("data-theme", theme)
    }

    return <ThemeContext.Provider value={{ theme, toggleTheme }}>
        {children}
    </ThemeContext.Provider>
}



export function useTheme() {
    const context = useContext(ThemeContext);
    if (context == null) {
        throw new Error("useTheme must be used within a ThemeProviderFunc")
    }

    return context;
}