"use client"
import React, { useCallback, useRef, useState } from 'react'

const page = () => {
    const [rows, setRows] = useState(new Array(10).fill(0))
    const ref = useRef<null | AbortController>(null);
    const [query, setQuery] = useState("");
    async function onScroll(e: any) {
        const clientHeight = e.target.clientHeight;
        const scrollHeight = e.target.scrollHeight;
        const scrollTop = e.target.scrollTop;
        const remaining = scrollHeight - (scrollTop + clientHeight);
        if (remaining < 50) {
            setRows((prev) => {
                return [...prev, new Array(10).fill(0)]
            })
        }
    }
    console.log("Child", Child())
    function debouncer(delay: number, callback: any) {
        let timer: any;
        return (query: string) => {
            clearTimeout(timer);
            timer = setTimeout(() => {
                callback(query);
            }, delay)
        }
    }

    async function pullApi() {
        if (ref.current) {
            ref.current.abort()
        }
        const abortController = new AbortController();
        ref.current = abortController
        await fetch("https://jsonplaceholder.typicode.com/todos", {
            signal: abortController.signal
        })

    }

    const debouncedSearch = useCallback(debouncer(500, pullApi), [])

    function handleOnChange(value: string) {
        setQuery(value)
        debouncedSearch(value)
    }
    return (
        <div className='flex h-screen w-screen items-center justify-center'>
            <div className='flex items-center justify-center w-full py-4 sticky top-0 backdrop-blur-sm'>
                <input
                    value={query}
                    onChange={(e) => handleOnChange(e.target.value)}
                    type="text"
                    placeholder='Search Here'
                    className='bg-gray-700 w-[60vw] pl-2 rounded-2xl outline-none py-3 text-white'
                />
                <button onClick={() => {
                    ref.current?.abort();
                }}>cancel req</button>
            </div>
            <div onScroll={onScroll} className='bg-amber-400 rounded-2xl h-[50vh] w-[40vw] overflow-y-scroll'>
                {
                    rows?.map((num, index) => {
                        return <h2 key={index + 1} className='bg-black mb-5 rounded-2xl p-3 w-full'>{index + 1}</h2>
                    })
                }
            </div>
        </div>
    )
}
function Child3({ name, data, greet }:any) {
    return <div>
        <h1>Hello i m children3</h1>

    </div>
}
function Child() {
    return <div>
        <h1>Hello</h1>
        <div className='bg-red-500' data-lable="parent">
            <p>Hello</p>
            <span>I am a span</span>
            <Child3 name="rahul" data={{ name: "rahul" }} greet={() => { console.log("Gello") }} />
        </div>
    </div>
}

export default page