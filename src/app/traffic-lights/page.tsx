"use client"
import React, { useEffect, useState } from 'react'

const TrafficLights = () => {
    const lights = ["red", "yellow", "green"]
    const [activeState, setActiveState] = useState("red");
    const config :any= {
        red: {
            bg: "bg-red-500 shadow-[0_0_60px_20px_rgba(239,68,68,0.6)]",
            inactive: 'bg-red-950 shadow-inner',
            label:"Stop"

        },
        yellow: {
            bg: "bg-yellow-500 shadow-[0_0_60px_20px_rgba(239,68,68,0.6)]",
            inactive: 'bg-yellow-950 shadow-inner',
            label:"Wait"
        },
        green: {
            bg: "bg-green-600 shadow-[0_0_60px_20px_rgba(239,68,68,0.6)]",
            inactive: 'bg-green-950 shadow-inner',
            label:"Go"
        },
        inActive: "bg-gray-500 opcaity-50 shadow-inner"
    }
    function renderColor() {
        switch (activeState) {
            case "red":
                setTimeout(() => {
                    setActiveState("yellow");
                }, 4000)
                break;
            case "yellow":
                setTimeout(() => {
                    setActiveState("green");
                }, 500)
                break;

            case "green":
                setTimeout(() => {
                    setActiveState("red");
                }, 3000)
                break;
            default:
                setActiveState("red")
        }
    }

    useEffect(() => {
        renderColor()
    }, [activeState])

    return (
        <div className='flex items-center justify-center h-screen w-screen'>
            <div className='h-[50vh] flex justify-center flex-col items-center w-[100px]'>
                <div className='bg-blue-500 h-[20px] w-[20px] rounded-tl-2xl rounded-tr-2xl'></div>
                <div className='w-full h-[90%] bg-black border border-white rounded-2xl flex flex-col gap-3 items-center p-3'>
                    {
                        lights?.map((light: string, index: number) => {
                            const isActive = light == activeState;
                            const bg = isActive ? config[activeState].bg : config[light].inactive;
                            return <div className={`h-[30%] transition-all duration-75 w-full bg-gradient-to-br ${bg} to-transparent  inset-0 rounded-full `}>
                                <div className={` ${isActive ? bg + " animate-ping rounded-full" : ""} a h-full w-full `} />
                            </div>
                        })
                    }
                </div>
                <div className='h-[30%] w-[20px] bg-blue-500 ' />
                <div><p className='w-full bg-amber-400 text-black rounded-3xl animate-pulse px-4 -y2'>{config[activeState].label}</p></div>
            </div>

        </div>
    )
}

export default TrafficLights