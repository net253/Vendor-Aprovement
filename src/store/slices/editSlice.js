import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const editSlice = createSlice({
  name: "editAction",
  initialState,
  reducers: {
    updateEdit: (state, action) => {
      return { ...action.payload };
    },
  },
});

// Action creators
export const { updateEdit } = editSlice.actions;

// Reducer
export default editSlice.reducer;
