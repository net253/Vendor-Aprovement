import React from "react";
import {
  Text,
  Grid,
  GridItem,
  HStack,
  Input,
  Checkbox,
  Divider,
  Textarea,
  Button,
  Icon,
} from "@chakra-ui/react";
import { MdDownload } from "react-icons/md";

export default function Standard({ modalInfo }) {
  const { stdCertificate, pdf } = modalInfo;

  const handleChk = (info) => {
    const data = stdCertificate[0].certificate.find((chk) => chk == info);
    return data == info;
  };

  const handleChkYN = (choice, text) => {
    if (text == "moq") {
      return stdCertificate[0].moq == choice;
    } else {
      return stdCertificate[0].stdPacking == choice;
    }
  };

  const dataURItoBlob = (dataURI) => {
    const byteString = window.atob(dataURI);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([int8Array], { type: "application/pdf" });
    return blob;
  };

  const handleDownload = (base64, fileName) => {
    const blob = dataURItoBlob(base64);
    const url = URL.createObjectURL(blob);
    window.open(url, fileName);
  };

  if (!stdCertificate) {
    return <div />;
  } else {
    const chkText = [
      "ISO 9001:2000",
      "ISO 14001:2004",
      "ISO TS16949:2002",
      "TIS 18001:1999",
      "OHSAS 18001:2007",
      "ISO 26000",
      "มรท. 8001-2546",
      "BOI",
      "Other",
    ];

    return (
      <>
        <Grid templateColumns="repeat(3, 1fr)" gap={1} alignItems="center">
          <GridItem w="100%" colSpan={3}>
            <Divider my={3} border="1px" borderColor="blackAlpha.400" />
            <Text className="font-thai" fontWeight="bold" fontSize="md">
              มาตรฐานและการรับรองที่ได้รับในปัจจุบัน / Current Standards and
              Certifications
            </Text>
          </GridItem>

          {/* Q1 */}
          <GridItem w="100%" colSpan={3}>
            <Text className="font-thai">
              1. การรับรองที่ได้รับ / Kind of certificate approved
            </Text>
          </GridItem>
          <GridItem w="100%" colSpan={3}>
            <Grid templateColumns="repeat(4,1fr)" gap={3}>
              {chkText.map((info, i) => (
                <GridItem w="100%" key={i}>
                  <Checkbox readOnly isChecked={handleChk(info)}>
                    {info}
                  </Checkbox>
                </GridItem>
              ))}
              <GridItem w="100%" colSpan={3}>
                {!stdCertificate[0].certificate.find(
                  (chk) => chk == "Other"
                ) ? (
                  <Input variant="flushed" size="sm" readOnly value="" />
                ) : (
                  <Input
                    variant="flushed"
                    size="sm"
                    readOnly
                    value={
                      stdCertificate[0].certificate[
                        stdCertificate[0].certificate.length - 1
                      ]
                    }
                  />
                )}
              </GridItem>
            </Grid>
          </GridItem>

          {/* Q2 */}
          <GridItem w="100%" colSpan={3} mt={3}>
            <Text className="font-thai">
              2. เงื่อนไขการชำระเงิน / Term of payment
            </Text>
          </GridItem>
          <GridItem w="100%" colSpan={3}>
            <Textarea
              variant="flushed"
              value={stdCertificate[0].payment[0]}
              readOnly
              size="sm"
              rows={3}
              isDisabled
            />
          </GridItem>
          <GridItem w="100%">
            <Text className="font-thai" fontSize="sm">
              วงเงินอนุมัติ / Approval limit
            </Text>
          </GridItem>
          <GridItem w="100%">
            <Input
              value={stdCertificate[0].payment[1]}
              readOnly
              variant="flushed"
              size="sm"
              isDisabled
            />
          </GridItem>
          <GridItem w="100%">
            <Input
              value={stdCertificate[0].payment[2]}
              variant="flushed"
              size="sm"
              isDisabled
            />
          </GridItem>

          {/* Q3 */}
          <GridItem w="100%" colSpan={3} mt={3}>
            <Text className="font-thai">
              3. คุณมีมาตรฐานการบรรจุหรือไม่ / Do you have standard packing?
            </Text>
          </GridItem>
          <GridItem w="100%" colSpan={3}>
            <HStack spacing={10} justifyContent="center">
              <Checkbox isDisabled isChecked={handleChkYN("No", "stdPacking")}>
                ไม่มี / No
              </Checkbox>
              <Checkbox isDisabled isChecked={handleChkYN("Yes", "stdPacking")}>
                มี / Yes
              </Checkbox>
              <Button
                size="sm"
                leftIcon={<Icon as={MdDownload} />}
                isDisabled={handleChkYN("No", "stdPacking")}
                colorScheme="telegram"
                onClick={() => handleDownload(pdf[0].base64, pdf[0].fileName)}
              >
                Document
              </Button>
            </HStack>
          </GridItem>

          {/* Q4 */}
          <GridItem w="100%" colSpan={3} mt={3}>
            <Text className="font-thai">
              4. คุณมีจำนวนการสั่งซื้อขั้นต่ำหรือไม่ / Do you have minimum order
              quantity (MOQ)?
            </Text>
          </GridItem>
          <GridItem w="100%" colSpan={3}>
            <HStack spacing={10} justifyContent="center">
              <Checkbox isDisabled isChecked={handleChkYN("No", "moq")}>
                ไม่มี / No
              </Checkbox>
              <Checkbox isDisabled isChecked={handleChkYN("Yes", "moq")}>
                มี / Yes
              </Checkbox>
              <Button
                size="sm"
                leftIcon={<Icon as={MdDownload} />}
                isDisabled={handleChkYN("No", "moq")}
                colorScheme="telegram"
                onClick={() => handleDownload(pdf[1].base64, pdf[1].fileName)}
              >
                Document
              </Button>
            </HStack>
          </GridItem>
        </Grid>
      </>
    );
  }
}
