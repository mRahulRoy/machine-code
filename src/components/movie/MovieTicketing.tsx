import React from 'react'
import Sidebar from './Sidebar'
import Screen from './Screen'
import SeatingLayout from './SeatingLayout'
import { seatTyles, SeatTypeKey } from './Tools'

const MovieTicketing = () => {
    return (
        <div className='h-screen w-screen bg-black '>
            <div className='flex h-full'>
                <div className='w-[300px]'>
                    <Sidebar />
                </div>
                <div className='w-[calc(100vw-300px)] text-white p-3'>
                    <Screen />
                    <div className='flex items-center gap-2 mb-3 justify-end mr-[40px]'>
                        {
                            Object.entries(seatTyles)?.map(([key, value]: [string, { label: string, color: string }], index: number) => {
                                return <div key={index} className='flex items-center gap-2'>
                                    <span className={`${value.color} inline-block h-[15px] w-[15px] rounded-full `}></span>
                                    <span className='text-xs'>{value.label}</span>
                                </div>
                            })
                        }
                    </div>
                    <SeatingLayout />
                </div>
            </div>
        </div>
    )
}

export default MovieTicketing