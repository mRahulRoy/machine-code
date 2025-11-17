"use client"
import { useCache } from '@/hooks/useCache'
import { initcache } from '@/utils/utils'
import React, { useEffect } from 'react'


const CacheApi = () => {
    const { cacheApi } = useCache();
    async function cacheAcces() {
        if (typeof window != "undefined" && cacheApi != null) {
            await cacheApi.add("https://jsonplaceholder.typicode.com/users");
            const cacheKeys = await cacheApi.keys();
            for (let cacheVal of cacheKeys) {
                console.log("Cache Keys", cacheVal, cacheVal.headers.get("date"))
            }
            await cacheApi.put('/data.json', new Response('hello'));
            await cacheApi.put('/data.json?id=1', new Response('hello rahul with query params'));
            const cacheWithParam = await cacheApi.match("/data.json?id=1");
            const matchedCache = await cacheApi.match("https://jsonplaceholder.typicode.com/users");

            if (matchedCache || cacheWithParam) {
                console.log("matchedcache", matchedCache)
                console.log("with Params", cacheWithParam)
            } else {
                console.log("Not found in cache");
            }
        }
    }
    useEffect(() => {
        cacheAcces()
    }, [cacheApi])
    return (
        <div>CacheApi</div>
    )
}

export default CacheApi