"use client";
import { useEffect, useReducer, useState, useRef, useCallback } from "react";
import { useDebounce } from "./useDebounce";

export type MovieType = {
    movies: any[];
    hasError: boolean;
    isLoading: boolean;
};

type MovieAction =
    | { type: "SET_LOADER"; payload: boolean }
    | { type: "SET_MOVIE"; payload: any[] }
    | { type: "SET_ERROR"; payload: string };

const movieReducer: React.Reducer<MovieType, MovieAction> = (state, action) => {
    switch (action.type) {
        case "SET_MOVIE":
            return { ...state, movies: action.payload, isLoading: false, hasError: false };
        case "SET_LOADER":
            return { ...state, isLoading: action.payload };
        case "SET_ERROR":
            return { movies: [], isLoading: false, hasError: true };
        default:
            return state;
    }
};

export function useMovies(url: string) {
    const { deBouncer } = useDebounce();

    const [query, setQuery] = useState("");
    const allMoviesRef = useRef<any[]>([]); // Store original movies here

    const [state, dispatch] = useReducer(movieReducer, {
        movies: [],
        isLoading: true,
        hasError: false,
    });

    const debounceSearch = useCallback(
        deBouncer(1000, searchMovies),
        []
    );

    useEffect(() => {
        dispatch({ type: "SET_LOADER", payload: true });
        fetchMovies(url);
    }, [url]);

    async function fetchMovies(url: string) {
        try {
            const res = await fetch(url);
            const data = await res.json();
            allMoviesRef.current = data; // Store in ref
            dispatch({ type: "SET_MOVIE", payload: data });
        } catch (error: any) {
            dispatch({ type: "SET_ERROR", payload: "Error while fetching movies." });
        }
    }

    async function searchMovies(searchText: string) {
        if (!searchText.trim()) {
            dispatch({ type: "SET_MOVIE", payload: allMoviesRef.current }); // Show all movies
            return;
        }

        const filtered = allMoviesRef.current.filter((m: any) =>
            m.title.toLowerCase().includes(searchText.toLowerCase())
        );

        dispatch({ type: "SET_MOVIE", payload: filtered });
    }

    function handleOnChange(value: string) {
        setQuery(value);
        console.log("Value is ", value, state.movies);
        debounceSearch(value);
    }

    return { state, query, handleOnChange };
}