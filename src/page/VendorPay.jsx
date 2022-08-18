import React from "react";
import { Text } from "@chakra-ui/react";
import { HeaderPay, Account } from "../components/VendorPay";

export default function VendorPay() {
  return (
    <>
      <Text fontSize="3xl" fontWeight="bold">
        Payment Method
      </Text>
      <HeaderPay />
      <Account />
    </>
  );
}
