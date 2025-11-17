"use client"

import { useEffect, useState } from "react";



function WithLoader(Component: any, fetchData: any) {


    return function (props: any) {
        const [isLoading, setIsLoading] = useState(false);
        const [todos, setTodos] = useState([]);
        useEffect(() => {
            setIsLoading(true);
            fetchData().then((res: any) => {
                return res.json();
            }).then((data: any) => {
                setIsLoading(false)
                setTodos(data);

            }).catch((err: any) => setIsLoading(false))
        }, [])


        if (isLoading) {
            return <h3 className="inline-block h-[20px] w-[20px] animate-spin border-l border-amber-400 rounded-full"></h3>
        }

        return <>
            <Component {...props} todos={todos} />
        </>
    }
}
function fetchTodos() {
    return fetch("https://jsonplaceholder.typicode.com/todos");
}


export function TodosList({ todos }: any) {
    return <>
        {
            todos?.map((todo: any) => {
                return <Todo todo={todo} />
            })
        }

    </>
}

export function Todo({ todo }: any) {
    return <>
        <li role="listitem" className="bg-gray-500 max-w-max p-2 rounded-2xl text-amber-400">
            {todo?.title}
        </li>
    </>
}

export const UserInfo = WithLoader(TodosList, fetchTodos)

const page = () => {

    return (
        <div className='h-screen w-screen flex flex-col gap-4'>
            <h1 className="bg-amber-500 p-2 rounded-3xl ">HOFS Pattern</h1>
            <ul>
                <UserInfo />
            </ul>
        </div>
    )
}

export default page