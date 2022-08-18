import React, { useState, useRef } from "react";
import {
  Button,
  ButtonGroup,
  Popover,
  PopoverContent,
  PopoverBody,
  PopoverFooter,
  PopoverHeader,
  PopoverCloseButton,
  Text,
  Box,
  Icon,
  useDisclosure,
} from "@chakra-ui/react";
import { Person, Standard, UploadDoc, Bank } from "./VendorDetails";
import { useSelector } from "react-redux";
import ReactToPrint from "react-to-print";
import { MdPrint } from "react-icons/md";
import { PdfVendor } from "../PdfForm/PdfVendor";
import ModalEdit from "./ModalEdit";

const printVendor = (nextApprover) => {
  return (
    <Button
      leftIcon={<Icon as={MdPrint} />}
      colorScheme="messenger"
      variant="solid"
      size="sm"
      rounded="full"
      disabled={nextApprover != "-"}
    >
      พิมพ์รายละเอียด
    </Button>
  );
};

export default function ModalVendor({ isOpens, onCloses, setModalShow, auth }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const modalInfo = useSelector((state) => state.modalInfo);
  const componentRef = useRef();

  if (!modalInfo) {
    return <div />;
  }

  const pageStyle =
    "@page { size: a4;  margin: 2mm; } @media print { body { -webkit-print-color-adjust: exact; } } ";

  return (
    <>
      <Popover
        returnFocusOnClose={false}
        isOpen={isOpens}
        onClose={onCloses}
        closeOnBlur={false}
      >
        <PopoverContent
          w={{ base: "100vw", lg: "48vw" }}
          border="2px"
          borderColor="blackAlpha.300"
        >
          <PopoverHeader fontWeight="bold" fontSize="xl">
            <Text className="font-thai">
              รายละเอียดบริษัท <span>/ Company Details</span>
            </Text>
            <div onClick={() => setModalShow(false)}>
              <PopoverCloseButton />
            </div>
          </PopoverHeader>

          <PopoverBody h="77vh" overflowY="auto" pb={5}>
            <Person modalInfo={modalInfo} />
            <Standard modalInfo={modalInfo} />
            <UploadDoc modalInfo={modalInfo} />
            <Bank modalInfo={modalInfo} />
          </PopoverBody>

          {/* Button */}
          <PopoverFooter display="flex" justifyContent="end">
            {modalInfo.nextApprover ? (
              <Box display="flex" justifyContent="end">
                <ReactToPrint
                  pageStyle={pageStyle}
                  trigger={() => printVendor(modalInfo.nextApprover)}
                  content={() => componentRef.current}
                />
                <Box display="none">
                  <PdfVendor ref={componentRef} modalInfo={modalInfo} />
                </Box>
              </Box>
            ) : (
              <Button colorScheme="yellow" size="sm" onClick={onOpen}>
                Edit by SCM
              </Button>
            )}
          </PopoverFooter>
        </PopoverContent>
      </Popover>

      <ModalEdit
        isOpen={isOpen}
        onClose={onClose}
        modalInfo={modalInfo}
        onCloses={onCloses}
        setModalShow={setModalShow}
      />
    </>
  );
}
