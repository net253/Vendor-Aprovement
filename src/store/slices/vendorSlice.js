import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const vendorSlice = createSlice({
  name: "vendorAction",
  initialState,
  reducers: {
    updateVendorInfo: (state, action) => {
      return { ...action.payload };
    },
  },
});

// Action creators
export const { updateVendorInfo } = vendorSlice.actions;

// Reducer
export default vendorSlice.reducer;
