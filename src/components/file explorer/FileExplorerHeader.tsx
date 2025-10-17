import React from 'react'

interface FileExplorerHeaderProps {
  title?: string;
  description?: string;
}

const FileExplorerHeader: React.FC<FileExplorerHeaderProps> = ({ 
  title = "File Explorer",
  description = "Browse your files and folders"
}) => {
  return (
    <div className='mb-8'>
      <h1 className='text-4xl font-bold text-gray-900 mb-2'>{title}</h1>
      <p className='text-gray-600'>{description}</p>
    </div>
  )
}

export default FileExplorerHeader