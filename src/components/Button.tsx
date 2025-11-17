"use client"
import React, { ReactNode, useState } from 'react'

const Button = () => {
  const [input, setInput] = useState("");
  return (
    <div>

      <input type="text" placeholder="Enter" name="username" value={input} onChange={(e: any) => { setInput(e.target.value) }} />
      <img title='Rahul' />
      <button onClick={() => {
        setInput("Hiii there")
      }}>Click me nas</button>
      <h1>{input}</h1>
    </div>
  )
}

export default Button