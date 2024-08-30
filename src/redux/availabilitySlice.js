import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  availability: {},
};

const availabilitySlice = createSlice({
  name: "availability",
  initialState,
  reducers: {
    setAvailability: (state, action) => {
      const { roomId, date, available } = action.payload;
      if (!state.availability[roomId]) {
        state.availability[roomId] = {};
      }
      state.availability[roomId][date] = available;
    },
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
    checkAvailability: (state, action) => {
      const { roomId, date } = action.payload;
      return (
        state.availability[roomId]?.[date] ?? "No data available for this date"
      );
    },
  },
});

export const { setAvailability, checkAvailability, decrementQuantity } = availabilitySlice.actions;
export default availabilitySlice.reducer;
