
export enum TicketTypes {
    AISLE = "AISLE",
    CORRIDOR = "CORRIDOR",
    GOLD = "GOLD",
    REGULAR = "REGULAR",
    PLATINUM = "PLATINUM"
}
const SEAT_COLORS = {
    [TicketTypes.GOLD]: "bg-yellow-500",
    [TicketTypes.PLATINUM]: "bg-purple-500",
    [TicketTypes.REGULAR]: "bg-gray-500",
    [TicketTypes.AISLE]: "bg-transparent",
    [TicketTypes.CORRIDOR]: "bg-transparent"
} as const;

export function getColorClass(seatType: TicketTypes) {
    return SEAT_COLORS[seatType] || "bg-blue-500";
}
export interface ISeat {
    id: string;
    value: string
}


export interface BookedSeat {
    row: number;
    col: number;
    seatType: TicketTypes;
    price: number,
    isAisle: boolean,
    isCorridor: boolean
}

export interface IBookedSeat {
    theaterSize: {
        rowSize: number,
        colSize: number
    };
    seats: {
        [key: string]: BookedSeat[]
    }
}
export type ticketInfoType = {
    label: string;
    price: number;
    color: string;
}
export interface PriceOption {
    [key: string]: ticketInfoType
}

// Type for each cell option
export interface CellOption {
    btnType: "AISLE" | "CORRIDOR" | "PRICE";
    label: string;
    children?: PriceOption; // only PRICE type has children
    hasChildren?: any[];      // optional, only for CORRIDOR in your example
}
