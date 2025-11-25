"use client"
import React, { ReactNode, useState } from 'react'

const Calander = () => {
    const tabs = ["Month", "Year"];
    const [selectedTab, setSelectedTab] = useState("Month");
    return (
        <div className='h-screen w-screen '>
            <h1 className='tracking-[20px] text-center mt-5 container uppercase'>Calender</h1>
            <div className='flex items-center justify-center container gap-5 mt-5 py-2 font-sans w-fit bg-white px-[20px] rounded-full text-black'>
                {tabs.map((item: string, index: number) => {
                    const isSelected = item == selectedTab;
                    return <div>
                        <span onClick={() => {
                            setSelectedTab(item)
                        }} key={item} className={`inline-block hover:bg-gray-200 ${isSelected && "bg-gray-200 "} rounded-full px-2 py-1 transition-all duration-400 cursor-pointer`}>{item} </span>
                        {index != tabs.length - 1 ? <span className='inline-block pl-3'>|</span> : ""}
                    </div>
                })}
            </div>

            {/* renders tabs */}
            <div className='mt-[80px]'>
                <CalanderComp selectedTab={selectedTab} />
            </div>

        </div>
    )
}
function CalanderComp({ selectedTab }: { selectedTab: string }) {
    const months = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];

    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const dateInstance = new Date();
    const [currentMonth, setCurrentMonth] = useState(dateInstance.getMonth())
    const [currentYear, setCurrentYear] = useState(dateInstance.getFullYear())
    const monthName = months[currentMonth];

    function getTotalDaysInMonths(year: number, month: number) {
        return new Date(year, month + 1, 0).getDate()
    }
    function getStartDayOfMonth(year: number, month: number) {
        return new Date(year, month, 1).getDay()
    }
    function renderCells() {
        let cells = [];
        const totalDaysInMonths = getTotalDaysInMonths(currentYear, currentMonth);
        const startDayOfMonth = getStartDayOfMonth(currentYear, currentMonth);
        let lastMonthDateFromNow = new Date(currentYear, currentMonth, 0).getDate() - startDayOfMonth + 1;


        //filling empty spaces
        for (let i = 1; i <= startDayOfMonth; i++) {
            cells.push(<span className={`text-black  flex items-center bg-gray-100 justify-center rounded-2xl gap-3  h-[60px] w-[100px]`}>{lastMonthDateFromNow++}</span>)
        }

        //filling actual dates
        for (let i = 1; i <= totalDaysInMonths; i++) {
            const isToday = currentYear == new Date().getFullYear() && currentMonth == new Date().getMonth() && i == dateInstance.getDate();
            console.log("isToday", isToday)

            cells.push(<h2 className={`text-black ${isToday && "bg-amber-500 text-black"} flex items-center justify-center rounded-2xl gap-3 border border-gray-300  h-[60px] w-[100px]`}>{i}</h2>)
        }
        return <>
            <div className='p-3' style={{
                display: "grid",
                gridTemplateColumns: "repeat(7,1fr)",
                gridGap: "10px"
            }}>
                {
                    cells.map((item) => {
                        return item;
                    })
                }
            </div>
        </>
    }

    function nextMonth() {
        if (currentMonth == 11) {
            setCurrentMonth(0);
            setCurrentYear(currentYear + 1);
        } else {
            setCurrentMonth(currentMonth + 1)
        }
    }
    function prevMonth() {
        if (currentMonth == 0) {
            setCurrentMonth(11);
            setCurrentYear(currentYear - 1);
        } else {
            setCurrentMonth(currentMonth - 1)
        }
    }

    return <>
        <div className=' container max-w-[60vw] min-h-[70vh] bg-white rounded-2xl'>
            <div className='p-4 flex items-center justify-between'>
                <p className='font-bold text-4xl text-black font-sans'>{monthName} <span className='font-normal text-gray-400'>{currentYear}</span></p>
                <div className='flex items-center gap-3'>
                    <button onClick={prevMonth} className='text-gray-700 cursor-pointer rounded-full h-[30] w-[30] bg-gray-200'>{"<"}</button>
                    <button onClick={() => {
                        setCurrentMonth(new Date().getMonth())
                        setCurrentYear(new Date().getFullYear())
                    }} className='text-gray-700 cursor-pointer rounded-full px-3 bg-gray-200'>Today</button>
                    <button onClick={nextMonth} className='text-gray-700 cursor-pointer rounded-full h-[30] w-[30] bg-gray-200'>{">"}</button>
                </div>

            </div>
            <div className='w-full px-3 mt-5 border-b-2 border-b-gray-200 pb-2'>
                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(7,1fr)",
                }}>
                    {
                        days?.map((day: string, index: number) => {
                            return <div key={index}>
                                <p className='text-black text-center text-3xl'> {day}</p>
                            </div>
                        })
                    }
                </div>
            </div>
            <div>
                {renderCells()}
            </div>
        </div>
    </>
}
export default Calander