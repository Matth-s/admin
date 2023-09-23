import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Reservation } from "../schema";
import type { RootState } from "./store";

interface BookingState {
  booking: Reservation[];
  viewBooking: Reservation;
  searchBooking: string;
  filterBooking: string;
}

const initialState: BookingState = {
  booking: [],
  viewBooking: {
    email: "",
    phone: "",
    city: "",
    address: "",
    bookingDate: [],
    firstName: "",
    lastName: "",
    downPayment: 0,
    downPaymentIsPaid: false,
    total: 0,
    totalIsPaid: false,
    id: "",
    materialName: "",
    isCompleted: false,
    materialId: "",
  },
  searchBooking: "",
  filterBooking: "",
};

export const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    setBookingData: (state, action: PayloadAction<Reservation[] | []>) => {
      state.booking = action.payload;
    },
    addDataBooking: (state, action: PayloadAction<Reservation>) => {
      state.booking.push(action.payload);
    },
    setViewBooking: (state, action: PayloadAction<Reservation>) => {
      state.viewBooking = action.payload;
    },
    setSearchBooking: (state, action: PayloadAction<string>) => {
      state.searchBooking = action.payload;
    },
    setFilterBooking: (state, action: PayloadAction<string>) => {
      state.filterBooking = action.payload;
    },
    deleteBooking: (state, action: PayloadAction<string>) => {
      state.booking = state.booking.filter(
        (book) => book.id !== action.payload
      );
    },
    markAsCompleted: (state, action: PayloadAction<Reservation>) => {
      const bookingPayload = action.payload;
      state.booking = state.booking.filter(
        (book) => book.id !== bookingPayload.id
      );
      state.booking.push(bookingPayload);
    },
  },
});

export const {
  setBookingData,
  addDataBooking,
  setViewBooking,
  setSearchBooking,
  setFilterBooking,
  deleteBooking,
  markAsCompleted,
} = bookingSlice.actions;
export const selectBooking = (state: RootState) => state.booking;
export default bookingSlice.reducer;
