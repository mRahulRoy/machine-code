"use client";
import React, { useState, useRef } from "react";


interface ITodo {
    id: number;
    label: string;
    description: string;
    x: number;
    y: number;
}

const maxHeight = 80;
const maxWidth = 250;
const Page = () => {
    const [todos, setTodos] = useState<ITodo[]>([
        { id: 1, label: "Food", description: "Bring food from the market", x: 100, y: 100 },
        { id: 2, label: "Work", description: "Fix the bug in the app", x: 250, y: 150 },
        { id: 3, label: "Work", description: "Fix the bug in the app", x: 350, y: 150 },
        { id: 4, label: "Work", description: "Fix the bug in the app", x: 450, y: 150 },
    ]);
    const [draggingItem, setDraggingItem] = useState<null | number>(null);
    const posRef = useRef({ x: 0, y: 0 });
    const origPosRef = useRef({ x: 0, y: 0 });

    function isOverLapping(currentDraggedItem: ITodo) {
        return todos.some((item) => {
            if (currentDraggedItem.id === item.id) return false;
            const xOverLap = currentDraggedItem.x < item.x + maxWidth && currentDraggedItem.x + maxWidth > item.x;
            const yOverLap = currentDraggedItem.y < item.y + maxHeight && currentDraggedItem.y + maxHeight > item.y;
            return xOverLap && yOverLap
        })
    }

    function onMouseUpHandler() {
        if (draggingItem == null) return;
        setDraggingItem(null);
        const currentDraggedTodo = todos.find((item) => item.id == draggingItem);
        const isAOverLap = isOverLapping(currentDraggedTodo!);
        if (isAOverLap) {
            setTodos((prev) => {
                return prev.map((item) => {
                    if (currentDraggedTodo?.id == item.id) {
                        return {
                            ...item,
                            x: origPosRef.current.x,
                            y: origPosRef.current.y,
                        }
                    } else {
                        return item;
                    }
                })
            })
        }
    }

    function onMouseDownHanlder(e: any, note: ITodo) {
        const clientX = e.clientX;
        const clientY = e.clientY;
        posRef.current = {
            x: clientX - note.x,
            y: clientY - note.y
        }
        origPosRef.current = {
            x: note.x,
            y: note.y
        }
        setDraggingItem(note.id);
    }

    function HanldeMouseMovement(e: any) {
        const clientX = e.clientX;
        const clientY = e.clientY;
        if (draggingItem == null) return;
        setTodos((prev) => {
            return prev.map((todoItem: ITodo) => {
                if (draggingItem == todoItem.id) {
                    return {
                        ...todoItem,
                        x: clientX - posRef.current.x,
                        y: clientY - posRef.current.y
                    }
                } else {
                    return todoItem;
                }
            })
        })
    }

    return (
        <div
            className="relative w-full h-screen bg-gray-100 p-2"
            onMouseUp={onMouseUpHandler}
            onMouseMove={HanldeMouseMovement}
        >
            {todos.map((item) => (
                <div
                    key={item.id}
                    style={{
                        height: maxHeight,
                        width: maxWidth,
                        position: "absolute",
                        top: item.y,
                        left: item.x,
                        transition: draggingItem === item.id ? "none" : "all 0.5s ease-out",
                    }}
                    onMouseDown={(e) => {
                        onMouseDownHanlder(e, item)
                    }}
                    className="bg-white shadow-lg rounded-xl p-3 m-2 cursor-grab select-none"
                >
                    <h3 className="bg-amber-200 text-black max-w-max p-2 rounded-2xl">
                        {item.label}
                    </h3>
                    <p className="text-black">{item.description}</p>
                </div>
            ))}
        </div>
    );
};

export default Page;