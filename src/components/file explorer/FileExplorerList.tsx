import React from 'react'

interface FileExplorerListProps {
    children: React.ReactNode;
}

const FileExplorerList: React.FC<FileExplorerListProps> = ({ children }) => {
    return (
        <div className='bg-white rounded-2xl shadow-xl p-6 space-y-3'>
            <span className='bg-amber-400 inline-block mb-3 text-black rounded-3xl p-2'>File Explorer List</span>
            {children}
        </div>
    )
}

export default FileExplorerList