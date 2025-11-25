"use client"
import React, { useState } from 'react'
import { X } from 'lucide-react';

const Chips = () => {
    const [chips, setChips] = useState<string[]>(["Apple", "Banana", "Grapes", "Oranges"]);
    const [input, setInput] = useState("");

    function isAllAreComas(value: string) {
        return value.split("").every((item) => item == value[0]);
    }

    function onInput(value: string, itsEnter: boolean = false) {
        setInput(value)
        if ((value.includes(",") || itsEnter) && value.trim() != "" && !isAllAreComas(value)) {
            const splitText = value.split(",");
            setChips((prev) => {
                return [...prev, splitText[0]]
            })
            setInput("");
        }
    }

    function removeChip(chip: string) {
        setChips((prev: string[]) => {
            return prev.filter((item: string) => {
                return item != chip;
            })
        })
    }


    return (
        <div className='h-screen w-screen flex items-center justify-center flex-col'>
            <h2 className='uppercase tracking-[30px]'>Chips</h2>
            <div className='mt-4 bg-gray-700 p-4 rounded-2xl min-w-md max-w-md'>
                <div>
                    {
                        chips?.map((item: string, index: number) => {
                            return <div key={index + 1} className='inline-flex gap-2 items-center justify-center mx-2 text-sm text-black rounded-full px-2  bg-amber-200'>
                                <span key={index} >{item}</span>
                                <X onClick={removeChip.bind(null, item)} className='size-1/5 bg-white cursor-pointer rounded-full text-black' />
                            </div>
                        })
                    }
                </div>
                <input placeholder='Enter Your Chip' onKeyDown={(e: any) => {
                    const key = e.key;
                    if (key == "Enter" && input.trim() != "") {
                        onInput(input, true)
                    } else if (key == "Backspace" && input.trim() == "" && chips.length > 0) {
                        const temp = [...chips];
                        temp.pop();
                        setChips(temp);
                    }
                }} className='outline-none border border-white h-fit w-full mt-4 rounded-2xl pl-3' type='text' value={input} onInput={(e: any) => {
                    onInput(e.target.value)
                }} />
            </div>
        </div >
    )
}

export default Chips