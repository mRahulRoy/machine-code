import { initcache } from "@/utils/utils";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export function useCache(cacheName: string = "testCache") {
    const [isLoading, setIsLoading] = useState(false);
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState<null | string>("");
    const [cacheApi, setCacheApi] = useState<null | Cache>(null);
    useEffect(() => {
        if (typeof window != "undefined") {
            initcache(cacheName).then((cache: any) => {
                if (cache != null) {
                    console.log("cace", cache)
                    setCacheApi(cache);
                }
            })
        }
    }, [])

    async function getQuote(url: string) {
        try {
            setError(null);
            if (isLoading) return;
            setIsLoading(true)

            const cacheApi = await caches.open("users-cache");
            const hasUserInCache: any = await cacheApi.match(url);
            if (hasUserInCache) {
                const cacheData = await hasUserInCache.json();
                const date = new Date(hasUserInCache.headers.get('date'));
                const age = (Date.now() - date.getTime()) / 1000; // in seconds
                if (age < 14) {
                    setIsLoading(false)
                    setPosts(cacheData);
                    return;
                }
                toast.success("cache Revalidated , Fetched freshed")
            }

            const response = await fetch(url);
            const clonedResponse = response.clone();

            const headers = new Headers(clonedResponse.headers);
            headers.set("date", new Date().toISOString());
            const newResponse = new Response(await clonedResponse.blob(), { headers });
            cacheApi.put(url, newResponse)

            const data = await response.json();
            setPosts(data);
            setIsLoading(false);
        } catch (error: any) {
            console.log("Error", error)
            const errMsg = error?.message || "Some Error occured while fetching quote";
            setError(errMsg);
        } finally {
            if (error != null) {
                setIsLoading(false);
            }
        }
    }


    return { cacheApi, getQuote, posts, isLoading, error }

}