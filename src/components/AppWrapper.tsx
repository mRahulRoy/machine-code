"use client"
import React, { Profiler, ReactNode } from 'react'


const AppWrapper = ({ children }: { children: ReactNode }) => {
    return (
        <div>
            
            {children}

        </div>
    )
}

export default AppWrapper