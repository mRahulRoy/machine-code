
import { BookedSeat, IBookedSeat, TicketTypes } from ".";
import { seatTyles, SeatTypeKey } from "../components/movie/Tools";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"


export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}


export function isSeatSelected(rowId: number, colId: number, bookedSeats: IBookedSeat): boolean {
    const rowName = String.fromCharCode(65 + rowId);
    const seatsInRow = bookedSeats.seats[rowName];

    if (!seatsInRow) return false;

    return seatsInRow.some((seat) => seat.col === colId && seat.row === rowId);
}
export function getColor(rowId: number, colId: number, bookedSeats: IBookedSeat) {
    const rowName = String.fromCharCode(65 + rowId);
    const seatsInRow = bookedSeats.seats[rowName] ?? [];
    console.log("sert in row", rowId, rowName, seatsInRow);
    if (!seatsInRow?.length) return "bg-red-700";

    const matched = seatsInRow.find((seat) => seat.col === colId && seat.row === rowId);

    return matched
        ? seatTyles[matched.seatType.toLowerCase() as SeatTypeKey]?.color
        : "bg-blue-500";

}

export function removeSeat(rowId: number, colId: number, seats: IBookedSeat, currentActiveSeatButton: TicketTypes) {
    const allSeats = seats.seats;
    currentActiveSeatButton = currentActiveSeatButton.toUpperCase() as TicketTypes;
    const rowName = String.fromCharCode(65 + rowId);
    const rows = seats?.seats[rowName];
    const selectedCell = rows?.find((item: BookedSeat) => item.col == colId && item.row == rowId);

    const hasThatCellAlreadyBooked = selectedCell?.seatType == currentActiveSeatButton;

    if (hasThatCellAlreadyBooked) {
        const filteredSeatForRow = rows?.filter(
            (item: BookedSeat) =>
                !(item.col === colId && item.row === rowId && item.seatType === currentActiveSeatButton)
        );
        const newUpadtedTheaterState: IBookedSeat = {
            ...seats,
            seats: {
                ...seats.seats,
                [rowName]: filteredSeatForRow ?? []
            }
        }
        return newUpadtedTheaterState.seats;
    }
}


export function getSelectedCellInfo(rowId: number, colId: number, seats: IBookedSeat) {
    const allSeats = seats.seats;
    const rowName = String.fromCharCode(65 + rowId);
    const rows = allSeats[rowName] ?? [];
    const matchedItem = rows?.find((item: BookedSeat) => {
        return item.col == colId && item.row == rowId;
    })
    return matchedItem ?? null;
}


export const exportTheaterLayout = (bookedSeats: IBookedSeat) => {
    const layoutData = {
        ...bookedSeats
    };

    const dataStr = JSON.stringify(layoutData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `theater_layout_${Date.now()}.json`;
    link.click();
};


export function openDB(dbname: string, version: number = 1) {
    return new Promise((resolve, reject) => {

        const request = indexedDB.open(dbname, version);


        request.onsuccess = (event: any) => {
            resolve(event.target.result);
        }

        request.onupgradeneeded = (event: any) => {
            const db = event.target.result;
            if (!db.objectStoreNames.contains("user")) {
                const userStore = db.createObjectStore("users", {
                    keyPath: "userId"
                })
                userStore.createIndex("name", "name", { unique: false });
            }
            if (!db.objectStoreNames.contains("todo")) {
                const todoStore = db.createObjectStore("todos", {
                    keyPath: "todoId"
                })
                todoStore.createIndex("title", "title", { unique: false });
            }
        }
        request.onerror = (event: any) => {
            reject(event.target.error);
        }

    })
}


export async function initcache(cacheName: string): Promise<Cache> {
  try {
    const cacheApi = await caches.open(cacheName);
    return cacheApi; 
  } catch (e) {
    console.error("Cache initialization failed:", e);
    throw e; 
  }
}
