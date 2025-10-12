"use client"
import React, { useEffect, useState } from 'react'

const TrafficLights = () => {
    const lights = ["red", "yellow", "green"]
    const [activeState, setActiveState] = useState("red");
    
    const config: any = {
        red: {
            bg: "bg-red-500 shadow-[0_0_60px_20px_rgba(239,68,68,0.6)]",
            inactive: 'bg-red-950 shadow-inner',
            label: "Stop",
            next: "green",  
            duration: 4000
        },
        yellow: {
            bg: "bg-yellow-500 shadow-[0_0_60px_20px_rgba(250,204,21,0.6)]",
            inactive: 'bg-yellow-950 shadow-inner',
            label: "Wait",
            next: "red", 
            duration: 500
        },
        green: {
            bg: "bg-green-600 shadow-[0_0_60px_20px_rgba(34,197,94,0.6)]",
            inactive: 'bg-green-950 shadow-inner',
            label: "Go",
            duration: 3000,
            next: "yellow",
        }
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            setActiveState(config[activeState].next);
        }, config[activeState].duration);
        
        return () => clearTimeout(timer);
    }, [activeState]);

    return (
        <div className='flex items-center justify-center h-screen w-screen bg-slate-900'>
            <div className='h-[50vh] flex justify-center flex-col items-center w-[100px]'>
                <div className='bg-blue-500 h-[20px] w-[20px] rounded-tl-2xl rounded-tr-2xl'></div>
                
                <div className='w-full h-[90%] bg-black border border-white rounded-2xl flex flex-col gap-3 items-center p-3'>
                    {
                        lights.map((light: string,index) => {
                            const isActive = light === activeState;
                            const bg = isActive ? config[light].bg : config[light].inactive;
                            return (
                                <div 
                                    key={index+1}
                                    className={`h-[30%] transition-all duration-300 w-full ${bg} rounded-full relative`}
                                >
                                    {isActive && (
                                        <div className={`absolute inset-0 ${config[light].bg} animate-ping rounded-full opacity-75`} />
                                    )}
                                </div>
                            )
                        })
                    }
                </div>
                
                <div className='h-[30%] w-[20px] bg-blue-500' />
                
                <div className=''>
                    <p className='bg-amber-400 text-black rounded-3xl px-4 py-2 font-semibold text-sm'>
                        {config[activeState].label}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default TrafficLights