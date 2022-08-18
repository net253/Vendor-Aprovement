import { createSlice } from "@reduxjs/toolkit";

const initialState = false;

const showPaymentSlice = createSlice({
  name: "showPaymentAction",
  initialState,
  reducers: {
    updateShowPayment: (state, action) => {
      return action.payload;
    },
  },
});

// Action creators
export const { updateShowPayment } = showPaymentSlice.actions;

// Reducer
export default showPaymentSlice.reducer;
