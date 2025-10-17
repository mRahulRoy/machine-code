import { useState } from 'react'

export const useFileExplorer = (initialData: any) => {
    const [explorer] = useState(initialData);
    const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set());

    const toggleFolder = (path: string) => {
        const newExpanded = new Set(expandedFolders);
        if (newExpanded.has(path)) {
            newExpanded.delete(path);
        } else {
            newExpanded.add(path);
        }
        setExpandedFolders(newExpanded);
    };

    const isExpanded = (path: string) => expandedFolders.has(path);

    return {
        explorer,
        toggleFolder,
        isExpanded
    };
}