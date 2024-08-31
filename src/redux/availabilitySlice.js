import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  availability: {},
  checkOutDate: "",
  selectedRooms: 1,
  guestCount: 1,
};

const availabilitySlice = createSlice({
  name: "availability",
  initialState,
  reducers: {
    decrementQuantity: (state, action) => {
      const { roomId, date } = action.payload;
      if (
        state.availability[roomId]?.[date] &&
        state.availability[roomId].quantity > 0
      ) {
        state.availability[roomId].quantity -= 1;
        if (state.availability[roomId].quantity === 0) {
          state.availability[roomId][date] = false;
        }
      }
    },
    setSelectedRooms: (state, action) => {
      state.selectedRooms = action.payload;
    },
    setGuestCount: (state, action) => {
      state.guestCount = action.payload;
    },
    setCheckOutDate : (state, action) => {
      state.checkOutDate = action.payload;
    },
  },
});

export const { setSelectedRooms, setGuestCount, decrementQuantity, setCheckOutDate } = availabilitySlice.actions;
export default availabilitySlice.reducer;
