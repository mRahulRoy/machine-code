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
    const [input, setInput] = useState("");
    const [draggingItem, setDraggingItem] = useState<null | number>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const posRef = useRef({
        offsetX: 0,
        offsetY: 0
    });
    const origRef = useRef({
        x: 0,
        y: 0
    });

    function isOverLapping(draggedItem: ITodo) {
        return todos.some((item) => {
            if (item.id === draggedItem.id) return false;
            const overlapX = draggedItem.x < item.x + maxWidth && draggedItem.x + maxWidth > item.x;
            const overlapY = draggedItem.y < item.y + maxHeight && draggedItem.y + maxHeight > item.y;
            return overlapX && overlapY;
        });
    }

    function onMouseUpHandler(e: any) {
        if (draggingItem == null) return;
        const draggedItem = todos.find(item => item.id === draggingItem);
        const isOverlap = isOverLapping(draggedItem!);
        if (isOverlap) {
            setTodos((prev: ITodo[]) => {
                return prev.map((item: ITodo) => {
                    if (draggedItem?.id === item.id) {
                        return {
                            ...item,
                            x: origRef.current.x,
                            y: origRef.current.y
                        };
                    }
                    return item;
                });
            });
        }
        setDraggingItem(null);
    }

    function onMouseMoveHandler(e: any) {
        if (draggingItem == null || !containerRef.current) return;

        const containerRect = containerRef.current.getBoundingClientRect();
        const clientX = e.clientX - containerRect.left;
        const clientY = e.clientY - containerRect.top;

        setTodos((prev: ITodo[]) => {
            return prev.map((item: ITodo) => {
                if (draggingItem === item.id) {
                    // Boundaries ke andar raho
                    let newX = clientX - posRef.current.offsetX;
                    let newY = clientY - posRef.current.offsetY;

                    // Min/Max bounds
                    newX = Math.max(0, Math.min(newX, containerRect.width - maxWidth));
                    newY = Math.max(0, Math.min(newY, containerRect.height - maxHeight));

                    return {
                        ...item,
                        x: newX,
                        y: newY,
                    };
                }
                return item;
            });
        });
    }

    function onMouseDownHandler(e: any, todo: ITodo) {
        if (!containerRef.current) return;

        const containerRect = containerRef.current.getBoundingClientRect();
        const clientX = e.clientX - containerRect.left;
        const clientY = e.clientY - containerRect.top;
        console.log(containerRect,e.clientX,e.clientY)
       
        const offsetX = clientX - todo.x;
        const offsetY = clientY - todo.y;

        posRef.current = {
            offsetX,
            offsetY,
        };
        origRef.current = {
            x: todo.x,
            y: todo.y
        };
        setDraggingItem(todo.id);
    }

    function getRandomPosition() {
        if (!containerRef.current) return { x: 0, y: 0 };

        const containerRect = containerRef.current.getBoundingClientRect();
        const padding = 20;

        const maxX = containerRect.width - maxWidth - padding;
        const maxY = containerRect.height - maxHeight - padding;

        const x = Math.random() * maxX + padding / 2;
        const y = Math.random() * maxY + padding / 2;

        return { x, y };
    }

    function handleNewTodo() {
        if (!input.trim()) return;

        const pos = getRandomPosition();

        const newPayload: ITodo = {
            label: "Food",
            description: input,
            id: Date.now(),
            x: pos.x,
            y: pos.y
        };

        setTodos((prev: ITodo[]) => [...prev, newPayload]);
        // setInput("");
    }

    return (
        <div className="w-full h-screen bg-gray-100 flex flex-col overflow-hidden">
            {/* Fixed Input Section */}
            <div className="flex gap-3 p-6 bg-white shadow-md z-10">
                <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleNewTodo()}
                    type="text"
                    placeholder="Write some todo"
                    className="flex-1 px-4 py-2 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
                <button
                    onClick={handleNewTodo}
                    className="px-6 py-2 bg-amber-400 text-black font-semibold rounded-lg hover:bg-amber-500 transition-colors"
                >
                    Add
                </button>
            </div>

            {/* Draggable Area */}
           <div className="flex ">
            <div className="w-[200px] text-black p-3 bg-amber-300">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Odio ipsam nulla dignissimos suscipit temporibus praesentium facilis ipsum minima placeat, cupiditate a officia esse, vitae labore, ratione hic aliquid maxime natus consequuntur vel harum iure? Eius nobis odio nam quod accusamus. Eaque sunt reiciendis deleniti officiis in odit, quod sequi, praesentium recusandae quo asperiores illum expedita labore voluptates, deserunt autem modi aspernatur excepturi corporis magnam. Dicta culpa aut atque? Odit nam enim maiores vitae impedit veniam qui tempore exercitationem saepe deleniti totam perferendis aut iusto, architecto deserunt sit quia libero aspernatur voluptatibus officia cum et vel perspiciatis. Quidem dolorem quas mollitia suscipit? Placeat sunt labore obcaecati esse iusto quis! Dolor ea nihil illum nisi cupiditate natus neque magni velit earum porro voluptas quas similique, soluta repellat fugit tempore ipsum. Fuga voluptatum vitae earum necessitatibus aliquam repellat impedit perspiciatis delectus non, odit quidem explicabo illo a vero recusandae possimus blanditiis magnam, nisi cupiditate. Veniam nesciunt suscipit deserunt delectus atque dignissimos. Ipsum laboriosam reiciendis iusto fuga deleniti cum architecto harum magni officiis officia. Non consequatur neque dolor fugit eius nemo repudiandae blanditiis doloribus ipsa vel ut laudantium nisi reiciendis similique minima obcaecati maiores mollitia, facilis facere odit sed iste nulla aperiam? Magni, ex.
            </div>
             <div
                ref={containerRef}
                className="relative flex-1 overflow-hidden"
                onMouseUp={onMouseUpHandler}
                onMouseMove={onMouseMoveHandler}
            >
                {todos.map((item: ITodo) => (
                    <div
                        onMouseDown={(e) => onMouseDownHandler(e, item)}
                        key={item.id}
                        style={{
                            height: maxHeight,
                            width: maxWidth,
                            position: "absolute",
                            top: item.y,
                            left: item.x,
                            transition: draggingItem === item.id ? "none" : "all 0.5s ease-out",
                        }}
                        className="bg-white shadow-lg rounded-xl p-3 cursor-grab active:cursor-grabbing select-none hover:shadow-xl"
                    >
                        <h3 className="bg-amber-200 text-black text-sm font-semibold px-3 py-1 rounded-full inline-block mb-2">
                            {item.label}
                        </h3>
                        <p className="text-black text-sm">{item.description}</p>
                    </div>
                ))}
            </div>
           </div>
        </div>
    );
};

export default Page;