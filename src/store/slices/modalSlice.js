import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const modalSlice = createSlice({
  name: "modalAction",
  initialState,
  reducers: {
    updateModalInfo: (state, action) => {
      return { ...action.payload };
    },
  },
});

// Action creators
export const { updateModalInfo } = modalSlice.actions;

// Reducer
export default modalSlice.reducer;
