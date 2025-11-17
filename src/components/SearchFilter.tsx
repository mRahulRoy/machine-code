"use client"
import { useState, useEffect, useMemo } from 'react';
import { MovieType, useMovies } from '@/hooks/useMovies';
import Movies from './Movie-comp/Movies';

const SearchFilter = () => {
    const { state, query, handleOnChange } = useMovies("/movies.json");
    const [debouncedQuery, setDebouncedQuery] = useState("");

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedQuery(query);
        }, 500);

        return () => clearTimeout(timer);
    }, [query]);


    const filteredMovies = useMemo(() => {
        if (!debouncedQuery.trim()) {
            return state.movies;
        }
        return state.movies.filter((item: { id: string; title: string }) =>
            item.title.toLowerCase().includes(debouncedQuery.toLowerCase())
        );
    }, [state.movies, debouncedQuery]);

    if (state.isLoading) {
        return <h2 className='text-white'>Loading....</h2>
    }

    return (
        <div>
            <div className='flex items-center justify-center w-full py-4 sticky top-0 backdrop-blur-sm'>
                <input
                    value={query}
                    onChange={(e) => handleOnChange(e.target.value)}
                    type="text"
                    placeholder='Search Here'
                    className='bg-gray-700 w-[60vw] pl-2 rounded-2xl outline-none py-3 text-white'
                />
            </div>
            <Movies movies={filteredMovies} />
        </div>
    )
}

export default SearchFilter