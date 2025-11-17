"use client"

import { useTheme } from '@/hooks/useTheme';

const page = () => {
    const { theme, onToggle } = useTheme();
    return (
        <div className='h-screen w-screen flex items-center justify-center gap-3 flex-col'>
            <h1>Hook Pattern</h1>
            <p>Current Theme : <span className='inline-block px-4 text-black rounded-2xl bg-amber-200 '>{theme}</span></p>
            <button className='bg-gray-500 rounded-2xl p-2  cursor-pointer' onClick={() => {
                onToggle()
            }}>Toggle Theme</button>
        </div>
    )
}

export default page