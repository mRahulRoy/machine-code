
import { useMovies } from '@/hooks/useMovies';
import Image from 'next/image'
import React, { useState } from 'react'

const Movies = ({ movies }: { movies: any }) => {

    const hasNoData = movies?.length == 0;
    return (
        <div className='grid grid-cols-2 sm:grid-cols-3 gap-4 md:grid-cols-5 p-4'>
            {
                movies?.map((item: any) => {
                    return <div key={item.id} className='bg-gray-600 rounded-2xl p-4'>
                        <h3>{item.title}</h3>
                        <Image src={item.poster} className='aspect-square' height={200} width={200} alt={`poster of ${item.title}`} />
                    </div>
                })
            }
            {
                hasNoData && <h1>No Records Found</h1>
            }
        </div>
    )
}

export default Movies