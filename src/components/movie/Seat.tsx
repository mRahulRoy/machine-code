

import { useAppSelector } from '@/redux/hooks/hooks'
import { setActiveCell, updateSeats } from '@/redux/reducers/movie-slice'

import React from 'react'
import { useDispatch } from 'react-redux'
import { cellOptions } from './Tools'
import { BookedSeat, ISeat, TicketTypes } from '@/utils'
import { cn, getColor, getSelectedCellInfo, isSeatSelected, removeSeat } from '@/utils/utils'

const Seat = ({ seat, rowId, colId }: {
    seat: ISeat,
    rowId: number,
    colId: number
}) => {
    const dispatch = useDispatch();
    const { currentSelectedTicketType, bookedSeats } = useAppSelector(state => state.movie)
    const onSeatClick = function () {
        //removeing seat is same selected seat type is active
        const activeSeatType = (typeof currentSelectedTicketType == "string" ? currentSelectedTicketType.toUpperCase() : currentSelectedTicketType.label.toUpperCase()) as TicketTypes;
        const selectedCellInfo = getSelectedCellInfo(rowId, colId, bookedSeats);


        if (selectedCellInfo && selectedCellInfo?.seatType.toUpperCase() === activeSeatType) {
            const modifiedGrid = removeSeat(rowId, colId, bookedSeats, activeSeatType)
            dispatch(updateSeats(modifiedGrid));
            return;
        } else if (selectedCellInfo && selectedCellInfo?.seatType.toUpperCase() != activeSeatType) {
            alert("you can not remove someone else seat")
            return;
        }


        const currentSelectedCell = {
            rowId: rowId,
            colId: colId
        }

        dispatch(setActiveCell(currentSelectedCell))
        const rowName = String.fromCharCode(65 + rowId);
        const label =
            typeof currentSelectedTicketType === "string"
                ? currentSelectedTicketType
                : currentSelectedTicketType.label;

        const upperLabel = label.toUpperCase();
        const newBookedSeat: BookedSeat = {
            col: colId,
            row: rowId,
            seatType: upperLabel as TicketTypes,
            isAisle: upperLabel === "AISLE",
            isCorridor: upperLabel === "CORRIDOR",
            price: typeof currentSelectedTicketType === "string"
                ? 0
                : currentSelectedTicketType.price,
        };

        const existingBookedSeats = {
            ...bookedSeats.seats,
            [rowName]: [...bookedSeats.seats[rowName] ?? [], newBookedSeat],
        }
        dispatch(updateSeats(existingBookedSeats))
    }

    const isSelected = isSeatSelected(rowId, colId, bookedSeats);

    const cellColor = getColor(rowId, colId, bookedSeats)

    return (
        <div>
            <div
                onClick={() => {
                    onSeatClick()
                }}
                key={seat.id}
                className={cn(
                    "cursor-pointer h-[20px] text-sm w-[20px] flex items-center justify-center rounded",
                    isSelected ? cellColor : "bg-gray-600"
                )}
            >
            </div>
        </div>
    )
}

export default Seat