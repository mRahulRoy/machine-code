"use client"
import React, { use, useState } from 'react'

interface ICol {
    id: string;
    title: string;
    color: string;
}
interface IItem {
    id: string
    columnId: string;
    title: string;
    description: string;
    priority: string;
    assignee: string
}
const PracDrag = () => {
    const [columns, setColumns] = useState<ICol[]>([
        { id: 'todo', title: 'To Do', color: 'bg-gray-500' },
        { id: 'in-progress', title: 'In Progress', color: 'bg-blue-500' },
        { id: 'review', title: 'Review', color: 'bg-yellow-500' },
        { id: 'done', title: 'Done', color: 'bg-green-500' }
    ]);
    const [dragItem, setDragItem] = useState<IItem | null>();
    const [dropZoneIndex, setDropZoneIndex] = useState<null | number>(-1);
    const [fromColIndex, setFromColIndex] = useState<null | number>(null)

    const [tasks, setTasks] = useState<IItem[]>([
        { id: '1', columnId: 'todo', title: 'Design new landing page', description: 'Create mockups for the new homepage', priority: 'high', assignee: 'JD' },
        { id: '2', columnId: 'todo', title: 'Fix navigation bug', description: 'Mobile menu not closing properly', priority: 'medium', assignee: 'SK' },
        { id: '3', columnId: 'in-progress', title: 'Implement authentication', description: 'Add OAuth and JWT support', priority: 'high', assignee: 'AM' },
        { id: '4', columnId: 'in-progress', title: 'Update documentation', description: 'Add API endpoint documentation', priority: 'low', assignee: 'JD' },
        { id: '5', columnId: 'review', title: 'Code review for PR #234', description: 'Review payment integration changes', priority: 'high', assignee: 'SK' },
        { id: '6', columnId: 'done', title: 'Setup CI/CD pipeline', description: 'Configure GitHub Actions', priority: 'medium', assignee: 'AM' }
    ]);

    function onDragStartHandler(e: any, item: IItem, index: number) {
        setDragItem(item);
        e.dataTransfer.effectAllowed = "copy";
        e.dataTransfer.setData("task", JSON.stringify(item));
        console.log("ee", e, index, item)
    }
    function onDropHandler(e: React.DragEvent<HTMLDivElement>, dropArea: ICol) {
        const data: IItem = JSON.parse(e.dataTransfer.getData("task"));
        e.dataTransfer.dropEffect = 'link';
        setTasks((prev: IItem[]) => {
            return prev.map((item: IItem) => {
                if (item.id == data.id) {
                    return {
                        ...item,
                        columnId: dropArea.id
                    }
                } else {
                    return item;
                }
            })
        })
        reset()
    }

    function reset() {
        setDragItem(null);
        setFromColIndex(null);
        setDropZoneIndex(null)
    }

    return (
        <div className='h-screen w-screen bg-white'>
            <h1>Kanban Board</h1>
            <div className='flex items-center justify-center h-full gap-6'>
                {
                    columns?.map((item: ICol, colIndex: number) => {
                        const listitems = tasks.filter((ts: IItem) => ts.columnId == item.id);
                        let isDropZone = colIndex === dropZoneIndex && dropZoneIndex != fromColIndex;

                        return <div
                            onDragOver={(e) => {
                                e.preventDefault();
                                setDropZoneIndex(colIndex);
                            }}
                            onDragLeave={() => setDropZoneIndex(null)}
                            onDrop={(e) => onDropHandler(e, item)}
                            className={`min-w-[300px] h-[400px] transition-all duration-200 ${colIndex === dropZoneIndex && dropZoneIndex !== fromColIndex
                                    ? "bg-blue-200 border-4 border-blue-500"
                                    : "bg-cyan-100"
                                } rounded-2xl`}
                        >

                            <p className='bg-amber-600 p-2 rounded-b-xl rounded-t-xl'>{item.title}</p>
                            <div className='flex items-center gap-3 pt-4 flex-col w-full'>
                                {
                                    listitems?.length > 0 ? listitems?.map((it: IItem, index: number) => {
                                        return <div draggable onDragStart={(e: any) => {
                                            onDragStartHandler(e, it, index)
                                            setFromColIndex(colIndex)
                                        }} onDragEnd={() => {
                                            setDragItem(null);
                                            setDropZoneIndex(null)

                                        }} className='w-[95%] rounded-md bg-amber-300 p-6 text-black'>
                                            <h3>{it.title}</h3>
                                        </div>
                                    }) : <div className='h-full w-full flex items-center justify-center'>
                                        <p className='animate-pulse text-red-400'>No Items Available</p>
                                    </div>
                                }
                            </div>
                        </div>
                    })
                }
            </div>
        </div>
    )
}

export default PracDrag