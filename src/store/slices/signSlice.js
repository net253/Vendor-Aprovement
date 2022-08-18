import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const signSlice = createSlice({
  name: "signAction",
  initialState,
  reducers: {
    updateSign: (state, action) => {
      return [...action.payload];
    },
  },
});

// Action creators
export const { updateSign } = signSlice.actions;

// Reducer
export default signSlice.reducer;
