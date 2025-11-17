"use client"
import { useAppSelector } from '@/redux/hooks/hooks';
import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch } from 'react-redux';
import Seat from './Seat';
import { ISeat } from '@/utils';


const SeatingLayout = () => {

    const rangeSelectoer = useAppSelector((state) => state.movie.layoutGrid);
    const [grid, setGrid] = useState<any>([]);
    const initialize = useMemo(function () {
        const rows = rangeSelectoer.rows;
        const cols = rangeSelectoer.cols;
        let layout = [];
        for (let i = 0; i < rows; i++) {
            let seat = [];
            for (let j = 0; j < cols; j++) {
                seat.push({
                    value: `${i}-${j}`,
                    id: `${String.fromCharCode(65 + i)}${j}`
                })
            }
            layout.push(seat);
        }
        return layout;
    }, [rangeSelectoer.cols, rangeSelectoer.rows])

    useEffect(() => {
        setGrid(initialize)
    }, [initialize])



    return (
        <div className=" w-full flex justify-center items-center overflow-y-auto">
            <div
                className="grid gap-3 w-full  overflow-x-auto p-5"
                style={{
                    gridTemplateColumns: `repeat(${rangeSelectoer.cols}, 20px)`,
                }}
            >
                {grid.map((row: ISeat[], rowIdx: number) =>
                    row.map((seat: ISeat, colIdx: number) => (
                        <div key={`${rowIdx}-${colIdx}`} className="flex relative">
                            {colIdx === 0 && (
                                <p className="absolute -left-6 top-1/2 -translate-y-1/2 bg-black text-white text-xs px-1 rounded">
                                    {String.fromCharCode(65 + rowIdx)}
                                </p>
                            )}
                            <div>
                                {rowIdx === 0 && (
                                    <p className="absolute left-[-2px] top-1/2 -translate-y-[30px] bg-black text-white text-xs px-1 rounded">
                                        {colIdx}
                                    </p>
                                )}
                                <Seat seat={seat} rowId={rowIdx} colId={colIdx}/>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>

    )
}

export default SeatingLayout