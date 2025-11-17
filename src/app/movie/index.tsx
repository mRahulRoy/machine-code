export const theaterData = {
  theaterId: "pvr_phoenix_screen_1",
  theaterName: "PVR Phoenix - Audi 1",
  totalSeats: 120,
  screen: "Screen 1",
  
  // Define vertical pathways that span across all rows
  verticalPathways: [
    { position: 3, width: 60, label: "Left Corridor" },
    { position: 10, width: 60, label: "Right Corridor" }
  ],
  
  layout: [
    {
      rowId: "A",
      rowType: "PREMIUM",
      seats: [
        { seatId: "A1", row: "A", seatNumber: 1, type: "PREMIUM", price: 350, status: "AVAILABLE", isRecliner: true },
        { seatId: "A2", row: "A", seatNumber: 2, type: "PREMIUM", price: 350, status: "AVAILABLE", isRecliner: true },
        { seatId: "A3", row: "A", seatNumber: 3, type: "PREMIUM", price: 350, status: "BOOKED", isRecliner: true },
        { type: "VERTICAL_PATHWAY", width: 60 }, // Vertical pathway marker
        { seatId: "A4", row: "A", seatNumber: 4, type: "PREMIUM", price: 350, status: "AVAILABLE", isRecliner: true },
        { seatId: "A5", row: "A", seatNumber: 5, type: "PREMIUM", price: 350, status: "AVAILABLE", isRecliner: true },
        null, // Regular aisle
        { seatId: "A6", row: "A", seatNumber: 6, type: "PREMIUM", price: 350, status: "AVAILABLE", isRecliner: true },
        { seatId: "A7", row: "A", seatNumber: 7, type: "PREMIUM", price: 350, status: "AVAILABLE", isRecliner: true },
        { type: "VERTICAL_PATHWAY", width: 60 }, // Vertical pathway marker
        { seatId: "A8", row: "A", seatNumber: 8, type: "PREMIUM", price: 350, status: "AVAILABLE", isRecliner: true }
      ]
    },
    {
      rowId: "B",
      rowType: "PREMIUM",
      seats: [
        { seatId: "B1", row: "B", seatNumber: 1, type: "PREMIUM", price: 350, status: "AVAILABLE", isRecliner: true },
        { seatId: "B2", row: "B", seatNumber: 2, type: "PREMIUM", price: 350, status: "AVAILABLE", isRecliner: true },
        { seatId: "B3", row: "B", seatNumber: 3, type: "PREMIUM", price: 350, status: "AVAILABLE", isRecliner: true },
        { type: "VERTICAL_PATHWAY", width: 60 }, // Same position as row A
        { seatId: "B4", row: "B", seatNumber: 4, type: "PREMIUM", price: 350, status: "AVAILABLE", isRecliner: true },
        { seatId: "B5", row: "B", seatNumber: 5, type: "PREMIUM", price: 350, status: "BOOKED", isRecliner: true },
        null,
        { seatId: "B6", row: "B", seatNumber: 6, type: "PREMIUM", price: 350, status: "BOOKED", isRecliner: true },
        { seatId: "B7", row: "B", seatNumber: 7, type: "PREMIUM", price: 350, status: "AVAILABLE", isRecliner: true },
        { type: "VERTICAL_PATHWAY", width: 60 }, // Same position as row A
        { seatId: "B8", row: "B", seatNumber: 8, type: "PREMIUM", price: 350, status: "AVAILABLE", isRecliner: true }
      ]
    },
    {
      rowId: "WALKWAY_1",
      rowType: "WALKWAY",
      isWalkway: true,
      height: 80,
      seats: []
    },
    {
      rowId: "C",
      rowType: "EXECUTIVE",
      seats: [
        { seatId: "C1", row: "C", seatNumber: 1, type: "EXECUTIVE", price: 250, status: "AVAILABLE", isRecliner: false },
        { seatId: "C2", row: "C", seatNumber: 2, type: "EXECUTIVE", price: 250, status: "AVAILABLE", isRecliner: false },
        { seatId: "C3", row: "C", seatNumber: 3, type: "EXECUTIVE", price: 250, status: "AVAILABLE", isRecliner: false },
        { type: "VERTICAL_PATHWAY", width: 60 }, // Continues through all rows
        { seatId: "C4", row: "C", seatNumber: 4, type: "EXECUTIVE", price: 250, status: "BOOKED", isRecliner: false },
        { seatId: "C5", row: "C", seatNumber: 5, type: "EXECUTIVE", price: 250, status: "BOOKED", isRecliner: false },
        null,
        { seatId: "C6", row: "C", seatNumber: 6, type: "EXECUTIVE", price: 250, status: "AVAILABLE", isRecliner: false },
        { seatId: "C7", row: "C", seatNumber: 7, type: "EXECUTIVE", price: 250, status: "AVAILABLE", isRecliner: false },
        { type: "VERTICAL_PATHWAY", width: 60 },
        { seatId: "C8", row: "C", seatNumber: 8, type: "EXECUTIVE", price: 250, status: "AVAILABLE", isRecliner: false }
      ]
    }
  ]
};
