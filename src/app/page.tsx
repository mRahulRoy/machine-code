import Link from 'next/link'
import React from 'react'

const page = () => {
    return (
        <div>
            <div className='bg-gray-500 p-4 rounded-bl-2xl rounded-br-2xl'>
                <div className='grid grid-cols-3'>
                    <h4>Rahul</h4>
                    <div className='flex gap-3'>
                        <Link href={"/traffic-lights"} className='bg-amber-300 text-black rounded-3xl px-3'>Traffic Lights</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default page