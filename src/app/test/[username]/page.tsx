"use client"
import React, { useEffect, useState } from 'react'
import data from "../../../data/seats.json"
import { BookedSeat } from '@/utils';

import { seatTyles } from '@/components/movie/Tools';
import { Lock } from 'lucide-react';
import Screen from '@/components/movie/Screen';
interface ITheaterSize {
    rowSize: number;
    colSize: number
}
const page = () => {
    console.log("data", data)
    const [theaterData] = useState<any>(data);
    const [grid, setGrid] = useState<any[]>([]);

    function config(theaterSize: ITheaterSize) {
        const colSize = theaterSize.colSize;
        const rowSize = theaterSize.rowSize;

        let mainGrid = [];
        for (let i = 0; i < rowSize; i++) {
            let row = [];
            for (let j = 0; j < colSize; j++) {
                row.push(0);
            }
            mainGrid.push(row);
        }
        setGrid(mainGrid)

    }
    useEffect(() => {
        config(theaterData.theaterSize);
    }, [])

    return (
        <div className='w-[100vw] h-screen '>
            <Screen />
            <div className='flex items-center justify-center'>
                <div className='grid gap-3 p-3 h-[70vh]' style={{
                    gridTemplateColumns: `repeat(${theaterData.theaterSize.colSize},30px)`
                }}>
                    {
                        grid?.map((row, rowIndex: number) => {
                            return row?.map((col: any, colIndex: number) => {
                                const rowName = String.fromCharCode(65 + rowIndex);
                                const availableSeat: any = theaterData?.seats[rowName as string]?.find((item: BookedSeat) => {
                                    return item.col == colIndex && item.row == rowIndex;
                                });
                                const isWholeRowEmpty = theaterData?.seats[rowName as string]?.every(
                                    (item: any) => !item.isBooked
                                );

                                return <div className='relative flex  max-h-max '>
                                    {colIndex === 0 && isWholeRowEmpty && (
                                        <p className="absolute -left-6 top-1/2 -translate-y-1/2 bg-black text-white text-sm px-1 rounded">
                                            {String.fromCharCode(65 + rowIndex)}
                                        </p>
                                    )}

                                    <div key={rowIndex + colIndex + col} className={`flex items-center justify-center gap-3 h-[20px] rounded-md w-[20px] ${availableSeat ? "border border-gray-500 cursor-pointer" : " pointer-none "} `} >
                                        {
                                            availableSeat?.isBooked && <Lock className='animate-pulse h-3 w-3' />
                                        }
                                    </div>
                                </div>
                            })
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default page