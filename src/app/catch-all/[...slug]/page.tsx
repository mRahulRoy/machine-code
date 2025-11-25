"use client"
import React from 'react'

const page = async ({ params, searchParams }: { params: Promise<{ slug: string }>, searchParams: Promise<{ searchParams: any }> }) => {
    const query = await searchParams;
    const segments = (await params).slug.toString().slice(",");
    return (
        <div>page {JSON.stringify(segments)}</div>
    )
}

export default page