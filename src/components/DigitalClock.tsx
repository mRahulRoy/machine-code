"use client";
import React, { useState, useEffect } from "react";

const Mapping:any = {
    0:["a","b","c","d","e","f"],
    1:["b","c"],
    2:["a","b","g","e","d"],
    3:["a","b","g","c","d"],
    4:["f","g","b","c"],
    5:["a","f","c","g","d"],
    6:["a","f","e","d","c","g"],
    7:["a","b","c"],
    8:["a","b","c","d","e","f","g"],
    9:["a","b","c","d","f","g"],
}

function SegmentDigit({digit}:{digit:string}){
    
  const active = Mapping[+digit];
  const seg = (name:string)=>{
    return `absolute bg-red-600 transition-all duration-50 ${active.includes(name) ? "opacity-100":"opacity-20"}`
  }
  return <div className="relative w-10 h-16 mx-1">
        <div className={`${seg("a")} h-1 w-6 top-0 left-2 rounded-full`} />
        <div className={`${seg("b")} left-8 top-1 h-6 w-1 rounded-full`} />
        <div className={`${seg("c")} left-8 top-8 h-6 w-1 rounded-full`} />
        <div className={`${seg("d")} bottom-1 left-2 h-1 w-6 rounded-full`} />
        <div className={`${seg("e")} bottom-2 left-1 h-6 w-1 rounded-full`} />
        <div className={`${seg("f")} bottom-9 left-1 h-6 w-1 rounded-full`} />
        <div className={`${seg("g")} left-2 top-7 h-1 w-6 rounded-full` } />
       
  </div>
}


const Colon = () => (
  <div className="flex flex-col justify-around items-center h-16">
    <div className="w-1 h-1 bg-red-500 rounded-full animate-pulse" />
    <div className="w-1 h-1 bg-red-500 rounded-full animate-pulse" />
  </div>
);

const DigitalClock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const hours = time.getHours().toString().padStart(2,"0");
  const minutes = time.getMinutes().toString().padStart(2,"0");
  const seconds = time.getSeconds().toString().padStart(2,"0");
  
  const digits = [...hours,":",...minutes,":",...seconds]

  return (
    <div className="flex items-center justify-center h-screen bg-black">
      <div className="flex bg-gray-900 p-6 rounded-lg shadow-[0_0_30px_rgba(255,0,0,0.3)]">
        {
            digits?.map((item,index)=>{
                const time = item === ":" ? <Colon key={item+index}/> : <SegmentDigit key={index} digit={item} />;
                return time;
            })
        }
      </div>
    </div>
  );
};

export default DigitalClock;
