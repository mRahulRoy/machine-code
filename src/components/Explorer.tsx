"use client"
import { fileExplorer } from '@/data/data'
import { useFileExplorer } from '@/hooks/useFolderHooks';
import React from 'react'
import { FileExplorerContainer, FileExplorerHeader, FileExplorerItem, FileExplorerList } from './file explorer';

const Explorer = () => {
    const { explorer, toggleFolder, isExpanded } = useFileExplorer(fileExplorer);

    function renderChildren(items: any[], parentPath: string = ''): React.ReactNode {
        return items?.map((item, index) => {
            const currentPath = `${parentPath}/${item.name}`;

            return (
                <FileExplorerItem
                    key={index}
                    item={item}
                    path={currentPath}
                    isExpanded={isExpanded(currentPath)}
                    onToggle={toggleFolder}
                    onRenderChildren={renderChildren}
                />
            )
        })
    }

    return (
        <FileExplorerContainer>
            <FileExplorerHeader
                title="File Explorer"
                description="Browse your files and folders"
            />
            <FileExplorerList>
                {renderChildren(explorer)}
            </FileExplorerList>
        </FileExplorerContainer>
    )
}

export default Explorer