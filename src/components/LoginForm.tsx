"use client"
import React, { ChangeEvent, ChangeEventHandler, useState } from 'react'

const LoginForm = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })
    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        console.log('Form submitted', formData);
    }
    function onChangeHanldler(e: ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        setFormData((prev) => {
            return {
                ...prev,
                [name]: value
            }
        })
    }
    return (
        <>
            <h1 className='text-center'> Login form</h1>
            <div className='h-screen w-screen flex items-center justify-center'>
                <form role='form' onSubmit={handleSubmit} className='flex flex-col gap-4'>
                    <div className='flex items-center gap-4'>
                        <label htmlFor="Email">Email : </label>
                        <input value={formData.email} onChange={onChangeHanldler} type="email" name="email" placeholder='Write Email Here' id="" />
                    </div>
                    <div className='flex items-center gap-4'>
                        <label htmlFor="password">Password : </label>
                        <input onChange={onChangeHanldler} value={formData.password} type="text" name="password" placeholder='Password Here' id="" />
                    </div>
                    <button type='submit' className='bg-amber-400 px-2 rounded-2xl text-black mt-4'>Submit</button>
                </form>
            </div>
        </>
    )
}

export default LoginForm