
import { IBookedSeat } from "@/utils";
import { createSlice } from "@reduxjs/toolkit";


interface TicketBtn {
    color: string;
    label: string;
    price: number;
}
interface IInit {
    layoutGrid: {
        rows: number,
        cols: number
    },
    currentSelectedTicketType: TicketBtn | string,
    selectedCell: {
        rowId: number;
        colId: number;
    } | null;
    bookedSeats: IBookedSeat
}
const initialState: IInit = {
    layoutGrid: {
        rows: 10,
        cols: 10
    },
    selectedCell: null,
    currentSelectedTicketType: {
        label: "Regular",
        price: 150,
        color: "bg-blue-500"
    },
    bookedSeats: {
        theaterSize: {
            rowSize: 10,
            colSize: 10
        },
        seats: {}
    }
}
const movieSlice = createSlice({
    name: "movie",
    initialState,
    reducers: {
        setGridRange: (state, action) => {
            state.layoutGrid = {
                ...state.layoutGrid,
                [action.payload.type]: action.payload.value
            }
        },
        setCurrentTicketType: (state, action) => {
            state.currentSelectedTicketType = action.payload
        },
        setActiveCell: (state, action) => {
            state.selectedCell = action.payload
        },
        resetSelectedCell: (state) => {
            state.selectedCell = null;
        },
        updateSeats: (state, action) => {
            state.bookedSeats = {
                ...state.bookedSeats,
                seats: action.payload
            }
        }
    }

})
export const { setGridRange, updateSeats, setCurrentTicketType, setActiveCell, resetSelectedCell } = movieSlice.actions;
export default movieSlice;