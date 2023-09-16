import { configureStore } from "@reduxjs/toolkit";
import dataSlice from "./dataSlice";
import userSlice from "./userSlice";
import bookingSlice from "./bookingSlice";

export const store = configureStore({
  reducer: {
    data: dataSlice,
    user: userSlice,
    booking: bookingSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
