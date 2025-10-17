"use client"
import { fileExplorer } from '@/data/data';
import { FileIcon, FolderIcon } from 'lucide-react';
import React from 'react'

interface FileExplorerItemProps {
    item: any;
    path: string;
    isExpanded: boolean;
    onToggle: (path: string) => void;
    onRenderChildren: (children: any[], parentPath: string) => React.ReactNode;
}

const FileExplorerItem: React.FC<FileExplorerItemProps> = ({
    item,
    path,
    isExpanded,
    onToggle,
    onRenderChildren
}) => {
    const hasChildren = (item?.children?.length ?? 0) > 0;
    const isFolder = item.type === 'folder';


   


    function createFileFolder(type: string, path: string) {
        // console.log(type, path)
        // folder /root/src/components
    //    console.log( getParent(path,fileExplorer))
    }

    return (
        <div className='select-none'>
            <div
                className={`group flex items-center gap-3 p-3 rounded-lg transition-all duration-200 cursor-pointer hover:scale-[1.02] ${isFolder
                    ? 'bg-gradient-to-r from-amber-50 to-orange-50 hover:from-amber-100 hover:to-orange-100 border border-amber-200 hover:border-amber-300 shadow-sm hover:shadow-md'
                    : 'bg-gradient-to-r from-blue-50 to-cyan-50 hover:from-blue-100 hover:to-cyan-100 border border-blue-200 hover:border-blue-300 shadow-sm hover:shadow'
                    }`}
                onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    isFolder && hasChildren && onToggle(path)
                }}
            >
                {/* Icon */}
                {isFolder ? (
                    <FolderIcon />
                ) : (
                    <FileIcon />
                )}

                {/* Content */}
                <div className='flex-1 min-w-0'>
                    <div className='flex items-center gap-2'>
                        <h3 className={`font-semibold truncate ${isFolder ? 'text-amber-900' : 'text-blue-900'
                            }`}>
                            {item.name}
                        </h3>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${isFolder
                            ? 'bg-amber-200 text-amber-700'
                            : 'bg-blue-200 text-blue-700'
                            }`}>
                            {item.type}
                        </span>
                    </div>
                    {hasChildren && (
                        <p className='text-xs text-gray-500 mt-1'>
                            {item.children.length} item{item.children.length !== 1 ? 's' : ''}
                        </p>
                    )}
                </div>


                {/* file creation  */}
                {
                    isFolder && <div className='flex items-center justify-between gap-3'>
                        <button onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            createFileFolder("file", path)
                        }} className='text-black bg-lime-300 rounded-2xl text-sm p-2 cursor-pointer'>Add File</button>
                        <button onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            createFileFolder("folder", path)
                        }} className='text-black bg-amber-400 rounded-2xl text-sm p-2 cursor-pointer'>Add Folder</button>
                    </div>
                }

                {/* Expand/Collapse Indicator */}
                {isFolder && hasChildren && (
                    <div className={`flex-shrink-0 transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''
                        }`}>
                        <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </div>
                )}
            </div>

            {/* Children */}
            {hasChildren && isExpanded && (
                <div className='ml-8 mt-2 pl-4 border-l-2 border-amber-200 space-y-2'>
                    {onRenderChildren(item.children ?? [], path)}
                </div>
            )}
        </div>
    )
}

export default FileExplorerItem