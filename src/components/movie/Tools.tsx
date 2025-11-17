
import { CellOption } from '@/utils';
import React from 'react'

const RangePicker = ({ label, currentState, min, max, value, type, onRangeChange }: {
    label: string,
    currentState: string,
    min: number,
    max: number,
    value: number,
    type: string,
    onRangeChange: (type: string, value: number) => void
}) => {
    return (
        <div>
            <div className='mt-4 bg-gray-700 p-3 rounded-2xl'>
                <div className='flex items-center justify-between'>
                    <span>{label} : {value}</span>
                    <span className=''>A-K</span>
                </div>
                <div className='flex items-center gap-2 mt-2 w-full'>
                    <button className='cursor-pointer rounded-full bg-gray-500 h-[30px] w-[35px] flex items-center justify-center text-2xl font-semibold'>-</button>
                    <input type='range' className='w-full' max={max} min={min} value={value} onChange={(e: any) => {
                        const value = +e.target.value;
                        onRangeChange(type, value)
                    }} />
                    <button className='cursor-pointer rounded-full bg-gray-500 h-[30px] w-[35px] flex items-center justify-center text-2xl font-semibold'>+</button>

                </div>
            </div>
        </div>
    )
}

export const cellOptions: CellOption[] = [
    {
        btnType: "AISLE",
        label: "Aisle",
    },
    {
        btnType: "CORRIDOR",
        label: "Corridor"
    },
    {
        btnType: "PRICE",
        label: "Price",
        children: {
            "regular": {
                label: "Regular",
                price: 150,
                color: "bg-blue-500"
            },
            "platinum": {
                label: "Platinum",
                price: 250,
                color: "bg-orange-500"
            },
            "gold": {
                label: "Gold",
                price: 350,
                color: "bg-yellow-500"
            },
        }
    }
]



export type SeatTypeKey = "regular" | "platinum" | "gold" | "aisle" | "corridor";


export const seatTyles: Record<SeatTypeKey, { label: string; color: string }> = {
    "regular": {
        label: "Regular",
        color: "bg-slate-400"
    },
    "gold": {
        label: "Gold",
        color: "bg-yellow-500"
    },
    "platinum": {
        label: "Platinum",
        color: "bg-purple-500"
    },
    "aisle": {
        label: "Aisle",
        color: "bg-green-600"
    },
    "corridor": {
        label: "Corridor",
        color: "bg-emerald-600"
    },
};



export default RangePicker