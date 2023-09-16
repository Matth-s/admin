import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Reservation } from "../schema";
import type { RootState } from "./store";

interface BookingState {
  booking: Reservation[] | [];
}

const initialState: BookingState = {
  booking: [],
};

export const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    setBookingData: (state, action: PayloadAction<Reservation[] | []>) => {
      state.booking = action.payload;
    },
  },
});

export const { setBookingData } = bookingSlice.actions;
export const selectBooking = (state: RootState) => state.booking;
export default bookingSlice.reducer;
