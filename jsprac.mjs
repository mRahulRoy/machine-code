
import { type } from "os";
import { fileExplorer } from "./src/data/data.ts"
function listAllRootFolderName(explorer) {
    if (explorer.length == 0) return;
    let folders = {
        folders: [],
        folderCount: 0
    }
    explorer.forEach((item) => {
        const isFolder = item.type == "folder";
        if (isFolder) {
            folders = {
                folders: [...(folders.folders), item.name],
                folderCount: folders.folderCount + 1
            }
        }
    })
    return folders;
}


function folderExists(explorer, folderName) {
    if (explorer.length == 0) return false;
    for (let i = 0; i < explorer.length; i++) {
        const item = explorer[i];
        const isFolder = item.type == "folder";
        if (isFolder && folderName == item.name) {
            return true;
        }
    }
    return false;
}


function findFolderByName(explorer, folderName) {
    if (explorer.length == 0) return null;
    for (let i = 0; i < explorer.length; i++) {
        const item = explorer[i];
        const isFolder = item.type === "folder";
        if (isFolder && item.name == folderName) {
            return item;
        } else if (isFolder && item.children?.length > 0) {
            return findFolderByName(item.children, folderName);
        } else {
            return null
        }
    }
}


function addFolderUsingPathName(explorer, pathname, folderName, depth = 0) {
    const pathParts = pathname?.split("/").filter(Boolean);
    if (depth === pathParts.length) {
        const alreadyExists = explorer.some((item) => item.name == folderName);
        if (alreadyExists) return explorer;
        return [...explorer, { name: folderName, type: "folder", children: [] }];
    }

    return explorer.map((item) => {
        const isFolder = item?.type == "folder";
        const name = item.name;

        if (isFolder && name === pathParts[depth]) {
            return {
                ...item,
                children: addFolder(item.children, pathname, folderName, depth + 1)
            }
        } else {
            return item;
        }
    })
}


function addFolderByParentId(explorer, id, folderName) {
    if (explorer?.children?.length == 0) return explorer;

    return explorer.map((item) => {
        const isFolder = item.type == "folder";
        const _Id = item.id;
        if (id == _Id && isFolder) {
            const alreadyExists = item?.children?.some((item) => item.name == folderName);
            if (alreadyExists) {
                console.error("This already exists", `["${folderName}"]`);
                return explorer;
            }
            else {
                return {
                    ...item,
                    children: [...item.children, { name: folderName, type: "folder", id: Date.now(), children: [] }]
                }
            }
        }

        if (isFolder && item.children?.length > 0) {
            return {
                ...item,
                children: addFolderByParentId(item.children, id, folderName),
            }
        } else {
            return item;
        }
    })
}


function deleteFolderByPathName(explorer, pathname, depth = 0) {
    const pathParts = pathname?.split("/").filter(Boolean);
    if (!explorer || explorer.length === 0) return explorer;

    if (depth === pathParts.length - 1) {
        return explorer.filter((item) => item.name !== pathParts[depth]);
    }

    return explorer.map((item) => {
        const isFolder = item.type === "folder";
        if (isFolder && item.name === pathParts[depth]) {
            return {
                ...item,
                children: deleteFolderByPathName(item.children, pathname, depth + 1),
            };
        }
        return item;
    });
}


function flattenAllFolderPaths(explorer, path = "") {
    if (explorer.length == 0) return [];
    let folders = [];

    explorer.forEach((item) => {
        const currentPath = path ? `${path}/${item.name}` : `/${item.name}`;
        const isFolder = item.type == "folder";
        if (isFolder) {
            folders.push(currentPath);
        }
        if (isFolder && item?.children?.length > 0) {
            folders.push(...flattenAllFolderPaths(item.children, currentPath))
        }
    })

    return folders;
}

function countFolders(explorer) {
    if (explorer.length == 0) return 0;
    let count = 0;

    explorer.forEach((item) => {
        const isFolder = item.type == "folder";
        if (isFolder) {
            count++;
            if (item.children?.length > 0) {
                count += countFolders(item.children);
            }
        }
    })
    return count;
}

function countOptimizedFolders(explorer) {
    return explorer.reduce((acc, item) => {
        if (item.type === "folder") {
            return acc + 1 + countOptimizedFolders(item.children || []);
        }
        return acc;
    }, 0);
}




