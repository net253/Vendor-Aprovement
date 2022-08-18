import { createSlice } from "@reduxjs/toolkit";

const initialState = false;

const showSlice = createSlice({
  name: "showAction",
  initialState,
  reducers: {
    updateShow: (state, action) => {
      return action.payload;
    },
  },
});

// Action creators
export const { updateShow } = showSlice.actions;

// Reducer
export default showSlice.reducer;
