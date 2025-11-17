"use client";

import { useState } from "react";

// Move getRowLabel function outside component
const getRowLabel = (index: any) => {
    if (index < 26) {
        // A-Z
        return String.fromCharCode(65 + index);
    } else {
        // After Z, use A1, A2, A3... format
        const letter = String.fromCharCode(65 + Math.floor((index - 26) / 26));
        const number = ((index - 26) % 26) + 1;
        return `${letter}${number}`;
    }
};

// Move initializeGrid function outside component
const initializeGrid = (rows: any, cols: any) => {
    const newGrid = [];
    for (let row = 0; row < rows; row++) {
        const rowData = [];
        for (let col = 0; col < cols; col++) {
            rowData.push({
                type: "EMPTY",
                row: getRowLabel(row),
                col: col,
                price: 0,
                section: "",
                seatNumber: null
            });
        }
        newGrid.push(rowData);
    }
    return newGrid;
};

export default function TheaterLayoutBuilder() {
    const [gridRows, setGridRows] = useState(15);
    const [gridCols, setGridCols] = useState(25);

    const [theaterName, setTheaterName] = useState("");
    const [selectedTool, setSelectedTool] = useState("seat");
    const [selectedPrice, setSelectedPrice] = useState(150);
    const [selectedSection, setSelectedSection] = useState("NORMAL");

    const [grid, setGrid] = useState(() => initializeGrid(15, 25));

    // Sections/Price tiers
    const [sections, setSections] = useState([
        { id: "PLATINUM", name: "Platinum", price: 350, color: "bg-yellow-500" },
        { id: "GOLD", name: "Gold", price: 250, color: "bg-orange-500" },
        { id: "SILVER", name: "Silver", price: 200, color: "bg-gray-400" },
        { id: "NORMAL", name: "Normal", price: 150, color: "bg-blue-500" }
    ]);

    // Handle grid resize
    const handleGridResize = (newRows: any, newCols: any) => {
        const currentGrid = [...grid];
        const resizedGrid = [];

        for (let row = 0; row < newRows; row++) {
            const rowData = [];
            for (let col = 0; col < newCols; col++) {
                // Keep existing data if available, otherwise create empty cell
                if (row < currentGrid.length && col < currentGrid[row].length) {
                    rowData.push({
                        ...currentGrid[row][col],
                        row: getRowLabel(row) // Update row label
                    });
                } else {
                    rowData.push({
                        type: "EMPTY",
                        row: getRowLabel(row),
                        col: col,
                        price: 0,
                        section: "",
                        seatNumber: null
                    });
                }
            }
            resizedGrid.push(rowData);
        }

        setGrid(resizedGrid);
        setGridRows(newRows);
        setGridCols(newCols);
    };

    // Handle cell click
    const handleCellClick = (rowIndex: any, colIndex: any) => {
        const newGrid = [...grid];
        const cell = newGrid[rowIndex][colIndex];

        if (selectedTool === "delete") {
            newGrid[rowIndex][colIndex] = {
                ...cell,
                type: "EMPTY",
                price: 0,
                section: "",
                seatNumber: null
            };
        } else if (selectedTool === "seat") {
            if (cell.type === "EMPTY") {
                const seatNumber: any = calculateSeatNumber(rowIndex, colIndex, newGrid);
                newGrid[rowIndex][colIndex] = {
                    ...cell,
                    type: "SEAT",
                    price: selectedPrice,
                    section: selectedSection,
                    seatNumber: seatNumber
                };
            }
        } else if (selectedTool === "aisle") {
            newGrid[rowIndex][colIndex] = {
                ...cell,
                type: "AISLE",
                price: 0,
                section: "",
                seatNumber: null
            };
        } else if (selectedTool === "corridor") {
            newGrid[rowIndex][colIndex] = {
                ...cell,
                type: "CORRIDOR",
                price: 0,
                section: "",
                seatNumber: null
            };
        }

        setGrid(newGrid);
    };

    // Calculate seat number in a row
    const calculateSeatNumber = (rowIndex: any, colIndex: any, currentGrid: any) => {
        let seatCount = 0;
        for (let col = 0; col <= colIndex; col++) {
            if (currentGrid[rowIndex][col].type === "SEAT") {
                seatCount++;
            }
        }
        return seatCount;
    };

    // Export layout
    const exportLayout = () => {
        const layoutData = {
            theaterName,
            gridRows,
            gridCols,
            grid: grid.map(row =>
                row.map(cell => ({
                    type: cell.type,
                    row: cell.row,
                    col: cell.col,
                    price: cell.price,
                    section: cell.section,
                    seatNumber: cell.seatNumber
                }))
            )
        };

        const dataStr = JSON.stringify(layoutData, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `theater_layout_${Date.now()}.json`;
        link.click();
    };

    // Save to backend
    const saveLayout = async () => {
        try {
            const response = await fetch('/api/theater/layout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    theaterName,
                    gridRows,
                    gridCols,
                    grid
                })
            });
            if (response.ok) {
                alert('✅ Layout saved successfully!');
            }
        } catch (error) {
            console.error('Error saving layout:', error);
            alert('❌ Failed to save layout');
        }
    };

    // Clear all
    const clearGrid = () => {
        if (confirm('Clear entire layout?')) {
            setGrid(initializeGrid(gridRows, gridCols));
        }
    };

    // Get statistics
    const getStats = () => {
        let totalSeats = 0;
        let totalAisles = 0;
        let totalCorridors = 0;

        grid.forEach(row => {
            row.forEach(cell => {
                if (cell.type === "SEAT") totalSeats++;
                if (cell.type === "AISLE") totalAisles++;
                if (cell.type === "CORRIDOR") totalCorridors++;
            });
        });

        return { totalSeats, totalAisles, totalCorridors };
    };

    const stats = getStats();

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
            {/* Header */}
            <header className="bg-slate-950 border-b border-slate-700 shadow-2xl sticky top-0 z-50">
                <div className="px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                                🎭 Grid Layout Builder
                            </h1>
                            <input
                                type="text"
                                placeholder="Theater Name..."
                                value={theaterName}
                                onChange={(e) => setTheaterName(e.target.value)}
                                className="px-4 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:outline-none min-w-[250px]"
                            />
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={clearGrid}
                                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-all"
                            >
                                🗑️ Clear All
                            </button>
                            <button
                                onClick={exportLayout}
                                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold transition-all"
                            >
                                📤 Export
                            </button>
                            <button
                                onClick={saveLayout}
                                className="px-5 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-all shadow-lg"
                            >
                                💾 Save Layout
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <div className="flex">
                {/* Left Sidebar - Tools & Sections */}
                <aside className="w-80 bg-slate-900 border-r border-slate-700 p-6 space-y-6 overflow-y-auto h-[calc(100vh-80px)]">
                    {/* Grid Size Controls */}
                    <div>
                        <h3 className="text-white font-bold text-lg mb-4">📐 Grid Size</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="text-slate-300 text-sm mb-2 block flex items-center justify-between">
                                    <span>Rows: {gridRows}</span>
                                    <span className="text-xs text-slate-500">
                                        ({getRowLabel(0)} - {getRowLabel(gridRows - 1)})
                                    </span>
                                </label>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => gridRows > 5 && handleGridResize(gridRows - 1, gridCols)}
                                        className="px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded font-bold"
                                    >
                                        -
                                    </button>
                                    <input
                                        type="range"
                                        min="5"
                                        max="50"
                                        value={gridRows}
                                        onChange={(e) => handleGridResize(parseInt(e.target.value), gridCols)}
                                        className="flex-1"
                                    />
                                    <button
                                        onClick={() => gridRows < 50 && handleGridResize(gridRows + 1, gridCols)}
                                        className="px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded font-bold"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>

                            <div>
                                <label className="text-slate-300 text-sm mb-2 block">
                                    Columns: {gridCols}
                                </label>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => gridCols > 10 && handleGridResize(gridRows, gridCols - 1)}
                                        className="px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded font-bold"
                                    >
                                        -
                                    </button>
                                    <input
                                        type="range"
                                        min="10"
                                        max="60"
                                        value={gridCols}
                                        onChange={(e) => handleGridResize(gridRows, parseInt(e.target.value))}
                                        className="flex-1"
                                    />
                                    <button
                                        onClick={() => gridCols < 60 && handleGridResize(gridRows, gridCols + 1)}
                                        className="px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded font-bold"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>

                            <div className="p-3 bg-slate-800 rounded-lg border border-slate-700">
                                <div className="text-xs text-slate-400">
                                    Grid: {gridRows} × {gridCols} = {gridRows * gridCols} cells
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Tool Selection */}
                    <div>
                        <h3 className="text-white font-bold text-lg mb-4">🛠️ Tools</h3>
                        <div className="space-y-2">
                            <button
                                onClick={() => setSelectedTool("seat")}
                                className={`w-full px-4 py-3 rounded-lg font-semibold transition-all flex items-center gap-3 ${selectedTool === "seat"
                                    ? "bg-blue-600 text-white shadow-lg scale-105"
                                    : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                                    }`}
                            >
                                <span className="text-2xl">🪑</span>
                                <span>Add Seat</span>
                            </button>

                            <button
                                onClick={() => setSelectedTool("aisle")}
                                className={`w-full px-4 py-3 rounded-lg font-semibold transition-all flex items-center gap-3 ${selectedTool === "aisle"
                                    ? "bg-blue-600 text-white shadow-lg scale-105"
                                    : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                                    }`}
                            >
                                <span className="text-2xl">⬜</span>
                                <span>Add Aisle</span>
                            </button>

                            <button
                                onClick={() => setSelectedTool("corridor")}
                                className={`w-full px-4 py-3 rounded-lg font-semibold transition-all flex items-center gap-3 ${selectedTool === "corridor"
                                    ? "bg-blue-600 text-white shadow-lg scale-105"
                                    : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                                    }`}
                            >
                                <span className="text-2xl">🚪</span>
                                <span>Add Corridor</span>
                            </button>

                            <button
                                onClick={() => setSelectedTool("delete")}
                                className={`w-full px-4 py-3 rounded-lg font-semibold transition-all flex items-center gap-3 ${selectedTool === "delete"
                                    ? "bg-red-600 text-white shadow-lg scale-105"
                                    : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                                    }`}
                            >
                                <span className="text-2xl">🗑️</span>
                                <span>Delete/Erase</span>
                            </button>
                        </div>
                    </div>

                    {/* Section Selection */}
                    {selectedTool === "seat" && (
                        <div>
                            <h3 className="text-white font-bold text-lg mb-4">💺 Section & Price</h3>
                            <div className="space-y-2">
                                {sections.map((section) => (
                                    <button
                                        key={section.id}
                                        onClick={() => {
                                            setSelectedSection(section.id);
                                            setSelectedPrice(section.price);
                                        }}
                                        className={`w-full px-4 py-3 rounded-lg font-semibold transition-all flex items-center justify-between ${selectedSection === section.id
                                            ? `${section.color} text-white shadow-lg scale-105`
                                            : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                                            }`}
                                    >
                                        <span>{section.name}</span>
                                        <span>₹{section.price}</span>
                                    </button>
                                ))}
                            </div>

                            <div className="mt-4 p-4 bg-slate-800 rounded-lg border border-slate-700">
                                <label className="text-slate-300 text-sm mb-2 block">Custom Price:</label>
                                <input
                                    type="number"
                                    value={selectedPrice}
                                    onChange={(e) => setSelectedPrice(parseInt(e.target.value) || 0)}
                                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                />
                            </div>
                        </div>
                    )}

                    {/* Statistics */}
                    <div>
                        <h3 className="text-white font-bold text-lg mb-4">📊 Statistics</h3>
                        <div className="space-y-3">
                            <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
                                <div className="text-slate-400 text-xs mb-1">Total Seats</div>
                                <div className="text-2xl font-bold text-green-400">{stats.totalSeats}</div>
                            </div>
                            <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
                                <div className="text-slate-400 text-xs mb-1">Aisles</div>
                                <div className="text-2xl font-bold text-blue-400">{stats.totalAisles}</div>
                            </div>
                            <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
                                <div className="text-slate-400 text-xs mb-1">Corridors</div>
                                <div className="text-2xl font-bold text-purple-400">{stats.totalCorridors}</div>
                            </div>
                        </div>
                    </div>

                    {/* Legend */}
                    <div>
                        <h3 className="text-white font-bold text-lg mb-4">🎨 Legend</h3>
                        <div className="space-y-2 text-sm">
                            <div className="flex items-center gap-2">
                                <div className="w-6 h-6 bg-slate-700 rounded border-2 border-slate-500"></div>
                                <span className="text-slate-300">Empty Cell</span>
                            </div>
                            {sections.map(section => (
                                <div key={section.id} className="flex items-center gap-2">
                                    <div className={`w-6 h-6 ${section.color} rounded border-2 border-white`}></div>
                                    <span className="text-slate-300">{section.name} Seat</span>
                                </div>
                            ))}
                            <div className="flex items-center gap-2">
                                <div className="w-6 h-6 bg-slate-600 rounded border-2 border-dashed border-slate-400"></div>
                                <span className="text-slate-300">Aisle</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-6 h-6 bg-gradient-to-r from-purple-600 to-purple-800 rounded"></div>
                                <span className="text-slate-300">Corridor</span>
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Main Canvas - Grid */}
                <main className="flex-1 p-6 overflow-auto h-[calc(100vh-80px)] bg-slate-900">
                    <div className="bg-slate-800 rounded-lg p-8 border border-slate-700 shadow-2xl">
                        {/* Screen */}
                        <div className="text-center mb-8">
                            <div className="inline-block px-16 py-4 bg-gradient-to-b from-slate-600 to-slate-900 rounded-t-full border-4 border-slate-500 shadow-2xl">
                                <div className="text-white font-bold text-xl tracking-[0.5em]">SCREEN</div>
                                <div className="text-slate-300 text-sm mt-1">↓ THIS WAY ↓</div>
                            </div>
                        </div>

                        {/* Grid */}
                        <div className="inline-block">
                            {grid.map((row, rowIndex) => (
                                <div key={rowIndex} className="flex items-center gap-1">
                                    {/* Row Label on Left - Always Visible */}
                                    <div className="w-10 text-center">
                                        <span className="text-yellow-400 font-bold text-sm">
                                            {getRowLabel(rowIndex)}
                                        </span>
                                    </div>

                                    {/* Grid Cells */}
                                    {row.map((cell, colIndex) => (
                                        <div
                                            key={`${rowIndex}-${colIndex}`}
                                            onClick={() => handleCellClick(rowIndex, colIndex)}
                                            className={`
                        w-7 h-7 rounded cursor-pointer transition-all border-2
                        ${cell.type === "EMPTY" ? "bg-slate-700 border-slate-600 hover:bg-slate-600 hover:border-slate-500" : ""}
                        ${cell.type === "SEAT" && cell.section === "PLATINUM" ? "bg-yellow-500 border-yellow-300 hover:scale-110" : ""}
                        ${cell.type === "SEAT" && cell.section === "GOLD" ? "bg-orange-500 border-orange-300 hover:scale-110" : ""}
                        ${cell.type === "SEAT" && cell.section === "SILVER" ? "bg-gray-400 border-gray-300 hover:scale-110" : ""}
                        ${cell.type === "SEAT" && cell.section === "NORMAL" ? "bg-blue-500 border-blue-300 hover:scale-110" : ""}
                        ${cell.type === "AISLE" ? "bg-slate-600 border-dashed border-slate-400" : ""}
                        ${cell.type === "CORRIDOR" ? "bg-gradient-to-r from-purple-600 to-purple-800 border-purple-400" : ""}
                      `}
                                            title={cell.type === "SEAT" ? `${getRowLabel(rowIndex)}${cell.seatNumber} - ${cell.section} - ₹${cell.price}` : cell.type}
                                        >
                                            {cell.type === "SEAT" && (
                                                <div className="text-white text-[8px] font-bold text-center leading-7">
                                                    {cell.seatNumber}
                                                </div>
                                            )}
                                        </div>
                                    ))}

                                    {/* Row Label on Right - Always Visible */}
                                    <div className="w-10 text-center">
                                        <span className="text-yellow-400 font-bold text-sm">
                                            {getRowLabel(rowIndex)}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Instructions */}
                        <div className="mt-8 text-center text-slate-400 text-sm">
                            💡 Click on grid cells to place seats, aisles, or corridors based on selected tool
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
