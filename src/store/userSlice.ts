import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";

interface UserState {
  token: string | null;
}

const initialState: UserState = {
  token: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string | null>) => {
      console.log(action.payload);
      state.token = action.payload;
    },
  },
});

export const { setToken } = userSlice.actions;
export const selectUser = (state: RootState) => state.user;
export default userSlice.reducer;
