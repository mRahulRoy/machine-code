"use client"
import { useCache } from '@/hooks/useCache'
import React, { useEffect } from 'react'
import toast from 'react-hot-toast';


interface IPost {
    userId: string;
    id: number;
    title: string;
    body: string
}
const CacheProject = () => {
    const { cacheApi, getQuote, error, isLoading, posts } = useCache();

    useEffect(() => {
        getQuote("https://jsonplaceholder.typicode.com/posts");
        console.log("usls1", isLoading ? "True" : "False")
    }, [])


    if (isLoading) {
        return <div className='h-screen w-screen flex items-center justify-center'>
            <div className=' border-l border-amber-400   h-[40px] w-[40px] animate-spin rounded-full ' />
        </div>
    }

    return (
        <div>
            <div className='grid grid-cols-3 md:grid-cols-4 lg:grid-col-5 p-4 gap-4'>
                {
                    posts?.map((post: IPost) => {
                        return <div key={post.id} className='aspect-square flex items-center justify-center rounded-2xl  h-[200px] shadow-sm shadow-amber-100 '>
                            <h3 className='text-center'>{post.title}</h3>
                        </div>
                    })
                }
            </div>
        </div>
    )
}

export default CacheProject