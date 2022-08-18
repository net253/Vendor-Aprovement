import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { Login, VendorReg, VendorPay, Staff } from "./page";
import ContentWarpper from "./components/warpper/ContentWarpper";
import "./App.css";
import "sweetalert2/dist/sweetalert2.min.css";

export default function App() {
  const location = useLocation();

  return (
    <Routes location={location} key={location.pathname}>
      <Route exect path="/" element={<Login />} />
      <Route
        path="/vendor"
        element={<ContentWarpper content={VendorReg} page="true" />}
      />
      <Route
        path="/paymethod"
        element={<ContentWarpper content={VendorPay} page="true" />}
      />
      <Route path="/Staff" element={<ContentWarpper content={Staff} />} />
    </Routes>
  );
}
