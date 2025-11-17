"use client";
import { useTheme } from "@/contexts/ThemeContext";
import { Loader } from "lucide-react";
import React, { useEffect, useRef, useState, useCallback } from "react";

const avaiableSuggestions = [
    "Search for something...",
    "Try typing a product name...",
    "Looking for an item? Start typing.",
    "Type to see suggestions.",
    "Start with a keyword...",
    "Search by title or name...",
    "Find what you need by typing...",
    "Try searching for a category...",
    "Enter a word to begin...",
    "Start typing to explore options...",
    "Try a common item name...",
    "Type at least 2 letters...",
    "Search by brand, item, or keyword...",
    "Type to filter the list...",
    "Begin typing to discover suggestions...",
    "Try a simple search term...",
    "Looking for something specific?",
    "Enter a phrase to search...",
    "Try searching your favorite item...",
    "Results will appear as you type...",
    "Start with a short keyword...",
    "Type to narrow down results...",
    "Try a different search term...",
    "Search across the entire list...",
    "Start typing to get started...",
    "Type a name to find matches...",
    "Try searching for popular items...",
    "Search anything you're looking for...",
    "Your search results will appear here...",
    "Begin typing to see matches..."
];

export default function UseEffectEvent() {
    const { theme, toggleTheme } = useTheme();
    const [query, setQuery] = useState("");
    const [suggestion, setSuggestions] = useState<string[]>([]);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    const debouncedFunc = function (delay: number, cb: any) {
        let id: any;
        return (value: string) => {
            clearTimeout(id);
            id = setTimeout(() => {
                cb(value);
            }, delay)
        }
    }
    const listRefs = useRef<any[]>([]);


    function fetchSuggestions(query: string, predefined: string[]) {
        if (!query.trim()) return [];
        return predefined.filter((item) =>
            item.toLowerCase().includes(query.toLowerCase())
        );
    }

    function handleSearch(search: string) {
        setIsLoading(false);
        const found = fetchSuggestions(search, avaiableSuggestions);
        if (found.length > 0) setSelectedIndex(0);
        setSuggestions(found);
    }

    const debouncedSearch = useCallback(debouncedFunc(300, handleSearch), []);

    function handleInputChange(value: string) {
        setQuery(value);
        setIsLoading(true);
        debouncedSearch(value);
    }

    function handleMovement(e: any) {
        if (!suggestion.length) return;

        if (e.key === "ArrowUp") {
            e.preventDefault();
            setSelectedIndex((prev) =>
                prev === 0 ? suggestion.length - 1 : prev - 1
            );
        }

        if (e.key === "ArrowDown") {
            e.preventDefault();
            setSelectedIndex((prev) =>
                prev === suggestion.length - 1 ? 0 : prev + 1
            );
        }

        if (e.key === "Enter") {
            const chosen = suggestion[selectedIndex];
            if (chosen) {
                setQuery(chosen);
                setSuggestions([]);
            }
        }
    }

    useEffect(() => {
        const el = listRefs.current[selectedIndex];
        if (el) {
            el.scrollIntoView({ block: "nearest", behavior: "smooth" });
        }
    }, [selectedIndex]);

    return (
        <div className="h-screen w-screen flex items-center justify-center ">
            <div className="h-[60vh] w-[60vw] rounded-2xl bg-gray-700">
                <div className="flex items-center justify-between p-3">
                    <h2 className="">Active Theme : {theme}</h2>
                    <button className="bg-amber-400 text-black p-1 rounded-md cursor-pointer" onClick={() => {
                        toggleTheme()
                    }}>Toggle Theme</button>
                </div>
                <div className="flex items-center justify-center my-5">
                    <input
                        onKeyDown={handleMovement}
                        placeholder="Search here"
                        className="bg-gray-600 py-2 w-[90%] pl-2 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
                        type="text"
                        value={query}
                        onChange={(e) => handleInputChange(e.target.value)}
                    />
                </div>

                <div className="flex flex-col gap-3 overflow-y-auto h-[400px] p-4">
                    {
                        isLoading && <div className="w-full flex items-center justify-center">
                            <Loader className="animate-spin text-shadow-amber-200 " />
                        </div>
                    }
                    {suggestion?.length > 0 && !isLoading && suggestion.map((item, index) => (
                        <p
                            key={index + item}
                            ref={(el) => listRefs.current[index] = el}
                            onClick={() => {
                                setQuery(item);
                                setSuggestions([]);
                            }}
                            className={`py-3 rounded-md p-3 cursor-pointer transition-colors ${selectedIndex === index
                                ? "bg-amber-500 text-black"
                                : "bg-gray-600 text-white hover:bg-gray-500"
                                }`}
                        >
                            {(() => {
                                const start = item
                                    .toLowerCase()
                                    .indexOf(query.toLowerCase());
                                const end = start + query.length;

                                return (
                                    <>
                                        {item.slice(0, start)}
                                        <span className="bg-red-400 text-white">
                                            {item.slice(start, end)}
                                        </span>
                                        {item.slice(end)}
                                    </>
                                );
                            })()}
                        </p>
                    ))}
                </div>
            </div>
        </div>
    );
}