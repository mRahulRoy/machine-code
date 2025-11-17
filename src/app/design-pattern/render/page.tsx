"use client"
import { useEffect, useState } from 'react'

const page = () => {

    return (
        <div className='flex h-screen w-screen flex-col gap-4 items-center justify-center'>
            <h1>Render Prop</h1>
            <MouseTracker render={(mousePos: any) => {
                console.log("Mouse ", mousePos)
                return <>
                    <h1 className='bg-gray-600 rounded-2xl p-2'>Current Client X Cursor Position: {mousePos?.x}</h1>
                    <h1 className='bg-gray-600 rounded-2xl p-2'>Current Client Y Cursor Position: {mousePos?.y}</h1>
                    <h2 className='bg-amber-300 text-black rounded-3xl p-2'>Hello Rahul</h2>
                </>
            }} />

        </div>
    )
}


function MouseTracker({ render }: any) {
    const [mousePos, setMousePos] = useState<any>(null);

    function onMouse(e: any) {
        const clientX = e.clientX;
        const clientY = e.clientY;
        setMousePos({ x: clientX, y: clientY })
    }
    useEffect(() => {
        addEventListener("mousemove", onMouse)
        return () => {
            window.removeEventListener("mousemove", onMouse)
        }
    }, [])

    return <>
        {render(mousePos)}
    </>

}

export default page