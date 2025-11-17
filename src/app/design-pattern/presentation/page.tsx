"use client"
import React, { useState } from 'react'

const page = () => {
  const [counter, setCounter] = useState(0);
  function onIncrement() {

    setCounter(counter + 1);
  }
  function onDecrement() {
    if (counter == 0) return
    setCounter(counter - 1);
  }
  return (
    <div>
      <Counter onDecrement={onDecrement} onIncrement={onIncrement} count={counter} />
    </div>
  )
}


function Counter({ count, onIncrement, onDecrement }: any) {
  return <div className='flex items-center justify-center h-screen w-screen'>
    <div className='flex items-center flex-col gap-3'>
      <h1 className='bg-gray-500 rounded-3xl p-3'>Couter : {count}</h1>
      <div className='flex gap-3'>
        <button onClick={onDecrement} className='cursor-pointer bg-amber-400 px-3 text-black rounded-3xl' >Decrement</button>
        <button onClick={onIncrement} className='cursor-pointer bg-amber-400 px-3 text-black rounded-3xl' >Increment</button>
      </div>
    </div>

  </div>
}

export default page