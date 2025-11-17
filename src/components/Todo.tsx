"use client"
import React, { useState } from 'react'


interface Todo {

    content: string;
    isDone: boolean
}

interface ITodo {
    [key: string]: Todo
}

const Todo = () => {
    const [input, setInput] = useState("");
    const [todos, setTodos] = useState<ITodo>()
    const [activeTodo, setActiveTodo] = useState<null | string>(null);

    function addNew() {
        if (!input) return;
        if (activeTodo) {

            const target = {
                ...todos![activeTodo],
                content: input,
            }

            setTodos((prev) => {
                return {
                    ...prev,
                    [activeTodo]: target
                }
            })

            return;
        }
        const newTodo = {
            content: input,
            isDone: false
        }
        const id = activeTodo ? activeTodo : Date.now()
        setTodos((prev) => {
            return {
                ...prev,
                [id!]: activeTodo ? {
                    ...todos![activeTodo],
                    content: input
                } : newTodo
            }
        })
        setActiveTodo(null)
    }

    function deleteTodo(id: string) {
        const allTodos = { ...todos };
        const filtered = Object.fromEntries(Object.entries(allTodos).filter(([key, todo]: [string, Todo]) => key != id));
        setTodos(filtered)
    }

    return (
        <div className='flex items-center w-full justify-center flex-col mt-[30px]'>
            <div className='flex gap-3'>
                <input className='bg-gray-700 p-2 rounded-2xl w-[300px]' placeholder='Write todo here' type='text' value={input} onChange={(e) => {
                    setInput(e.target.value)
                }} />
                <button onClick={addNew} className='bg-amber-400 text-black  rounded-2xl py-2 cursor-pointer px-4'>Add</button>
            </div>
            {
                Object.keys(todos ?? {}).length > 0 && <div className='w-[35vw] mt-[30px] flex flex-col gap-3 p-4 rounded-md'>
                    {
                        Object.entries(todos ?? {}).map(([key, todo]: [string, Todo], index: number) => {
                            return <div key={key} className='bg-gray-800 p-3 flex items-center justify-between rounded-2xl'>
                                {todo.content}
                                <button className='bg-amber-500 rounded-2xl p-3 text-black cursor-pointer' onClick={() => {
                                    deleteTodo(key)
                                }}>Delete</button>
                                <button className='bg-amber-500 rounded-2xl p-3 text-black cursor-pointer' onClick={() => {
                                    setActiveTodo(key);
                                    setInput(todo.content);
                                }}>update</button>
                            </div>
                        })
                    }
                </div>
            }
        </div>
    )
}

export default Todo