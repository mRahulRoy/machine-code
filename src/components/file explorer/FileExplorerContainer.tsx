import React from 'react'

interface FileExplorerContainerProps {
  children: React.ReactNode;
}

const FileExplorerContainer: React.FC<FileExplorerContainerProps> = ({ children }) => {
  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-8'>
        <span className='bg-amber-400 text-black rounded-3xl p-2'>Container</span>
      <div className='max-w-4xl mx-auto'>
        {children}
      </div>
    </div>
  )
}

export default FileExplorerContainer