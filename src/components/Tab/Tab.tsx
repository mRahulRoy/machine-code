"use client"
import React, { createContext, ReactNode, useContext } from 'react'

const initialValue = {
    index: 0,
    onChange: (val: number) => { }
}

interface ITabProp { children: ReactNode, index: number, onChange: (newIndex: number) => void };

const TabContext = createContext(initialValue);
const Tab = ({ children, index, onChange }: ITabProp) => {
    const safeIndex = typeof index === "number" && index >= 0 ? index : 0;
    return (
        <div className='p-3 bg-gray-700 rounded-md'>
            <TabContext.Provider value={{ index: safeIndex, onChange }}>
                {children}
            </TabContext.Provider>
        </div>
    )
}

Tab.Headers = ({ children }: { children: ReactNode }) => {
    return <div className='flex gap-3 mb-4 flex-wrap'>
        {children}
    </div>
}

Tab.HeaderItem = ({ label, index }: { label: string, index: number }) => {
    const { index: activeIndex, onChange } = useContext(TabContext);
    if (index === undefined) {
        console.warn("Tab: 'index' prop is required for controlled tabs.");
    }

    return <div onClick={() => {
        onChange(index)
    }} className={`bg-amber-500 ${index == activeIndex ? "border-b-4 shadow-green-600 border-white" : null}  text-black rounded-md px-2 py-1 cursor-pointer`}>
        {label}
    </div>
}

Tab.Content = function ({ children }: { children: ReactNode }) {
    return <div className='min-h-[40vh] overflow-y-scroll'>
        {children}
    </div>
}
Tab.ContentItem = function ({ children, index }: { children: ReactNode, index: number }) {
    const { index: activeIndex } = useContext(TabContext);
    return index === activeIndex && <div className='relative h-64 w-full '>
        {children}
    </div>
}


export default Tab