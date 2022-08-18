import React, { useRef } from "react";
import { Button, Icon, Box } from "@chakra-ui/react";
import { MdPrint } from "react-icons/md";
import ReactToPrint from "react-to-print";

import { PdfStaff } from "../components/PdfForm/PdfStaff";
import { PdfVendor } from "../components/PdfForm/PdfVendor";

const pageStyle =
  "@page { size: a4;  margin: 1mm; } @media print { body { -webkit-print-color-adjust: exact; } } ";

export default function PdfPage() {
  const componentRef = useRef();
  const ref = useRef();
  return (
    <>
      <Box
        p={1}
        display="flex"
        justifyContent="center"
        alignItems="center"
        h="100vh"
        gap={8}
      >
        <ReactToPrint
          pageStyle={pageStyle}
          trigger={() => printVendor()}
          content={() => componentRef.current}
        />
        <Box display="none">
          <PdfVendor ref={componentRef} />
        </Box>

        <ReactToPrint
          pageStyle={pageStyle}
          trigger={() => printStaff()}
          content={() => ref.current}
        />
        <Box display="none">
          <PdfStaff ref={ref} />
        </Box>
      </Box>
    </>
  );
}

const printStaff = () => {
  return (
    <Button
      leftIcon={<Icon as={MdPrint} />}
      colorScheme="linkedin"
      variant="solid"
    >
      พิมพ์แบบประเมิน
    </Button>
  );
};

const printVendor = () => {
  return (
    <Button
      leftIcon={<Icon as={MdPrint} />}
      colorScheme="facebook"
      variant="solid"
    >
      พิมพ์รายละเอียด
    </Button>
  );
};
