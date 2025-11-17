import React from 'react'

const page = async ({ params }: { params: Promise<{ ids: string[] }> }) => {
    console.log(await params)
    const path = (await params).ids.join("/");
    return (
        <div>page having this path {path}</div>
    )
}

export default page