"use client"
import React from 'react'

const EventDeligation = () => {
    let list = [
        {
            name: "Rahul"
        },
        {
            name: "Kavita"
        },
        {
            name: "Sunita"
        },
        {
            name: "Anita"
        },
    ]
    function onClickHanlder(e: any) {
        const target = e.target;
        console.log("target", target.innerText)
    }
    return (
        <>
            <div className='h-screen w-screen '>
                <div className='flex items-center justify-center'>
                    <h1>EventDeligation</h1>
                </div>
                <div onClick={(e) => {
                    onClickHanlder(e)
                }} className='w-[40vw] mx-auto flex items-center gap-3 flex-col'>
                    {
                        list?.map((item) => {
                            return <h4 className='bg-amber-400 cursor-pointer p-2 rounded-e-2xl text-black'>{item.name}</h4>
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default EventDeligation