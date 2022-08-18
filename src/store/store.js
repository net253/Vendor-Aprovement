import { configureStore } from "@reduxjs/toolkit";

import {
  vendorSlice,
  authSlice,
  showSlice,
  signSlice,
  showPaymentSlice,
  modalSlice,
} from "./slices";

export default configureStore({
  reducer: {
    vendor: vendorSlice,
    auth: authSlice,
    show: showSlice,
    sign: signSlice,
    payment: showPaymentSlice,
    modalInfo: modalSlice,
  },
});
