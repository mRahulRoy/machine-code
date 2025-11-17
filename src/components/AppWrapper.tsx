"use client"
import { useTheme } from '@/contexts/Index'
import { ThemeContextProvider } from '@/contexts/ThemeContext'
import { store } from '@/redux/store'
import React, { Profiler, ReactNode } from 'react'
import { Provider } from 'react-redux'


const AppWrapper = ({ children }: { children: ReactNode }) => {
    const { theme } = useTheme()
    return (
        <div>
            <ThemeContextProvider>
                <Provider store={store} >
                    {children}
                </Provider >
            </ThemeContextProvider>

        </div>
    )
}

export default AppWrapper