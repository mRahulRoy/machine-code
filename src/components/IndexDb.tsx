"use client"
import { useIndexDb } from '@/hooks/useIndexDb';
import { openDB } from '@/utils/utils';
import React, { useEffect, useState } from 'react'

const IndexDb = () => {
    const { users, addUser, deleteUser } = useIndexDb();

    return (
        <div className=' h-screen w-screen'>
            <h1>Index DB</h1>
            <button onClick={() => {
                addUser({
                    name: "rahul",
                    age: 12,
                    userId: String(Date.now())
                })
            }} className='cursor-pointer bg-amber-400 text-black rounded-2xl p-2'>Click Me</button>
            <div className='flex items-center justify-center '>

                <div>
                    {
                        users?.map((user: any) => {
                            return <div className='flex items-center mb-3 justify-between gap-3' key={user?.userId}>
                                <h2>{user?.name}</h2>
                                <h2>{user?.age}</h2>
                                <button onClick={deleteUser.bind(user, user.userId)} className='bg-red-700 text-amber-400 rounded-2xl p-2 '>Delete</button>
                            </div>
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default IndexDb