import Tab from '@/components/Tab/Tab'
import TabWrapper from '@/components/Tab/TabWrapper'
import React from 'react'

const page = () => {
    return (
        <div className='flex items-center justify-center flex-col h-screen w-screen'>
            <h2 className='font-sans tracking-[10px] uppercase'>Compound Pattern</h2>
            <div>
                <TabWrapper />
            </div>
        </div>
    )
}





export default page