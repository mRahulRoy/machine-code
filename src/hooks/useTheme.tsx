import { useEffect, useState } from "react";

export function useTheme() {
    const [theme, setTheme] = useState("light");

    function onToggle() {
        console.log("theme",theme)
        setTheme(theme == "light" ? "dark" : "light")
    }

    useEffect(() => {
        const { matches } = window.matchMedia('(prefers-color-scheme: dark)')
        if (matches) {
            setTheme("dark");
        } else {
            setTheme("light")
        }
    }, [])

    return { theme, setTheme, onToggle }
}