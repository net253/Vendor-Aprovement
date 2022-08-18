import React from "react";
import { Text, Grid, GridItem, Select, Button } from "@chakra-ui/react";

const optionText = [
  {
    text: "SNC - เอส เอ็น ซี ฟอร์เมอร์ จำกัด",
    value: "SNC",
  },
  {
    text: "CL - เอส เอ็น ซี คูลลิ่ง ซัพพลาย จำกัด",
    value: "CL",
  },
  {
    text: "IMP - อิมมอทัล พาร์ท จำกัด",
    value: "IMP",
  },
  {
    text: " SNC2 - เอส เอ็น ซี ฟอร์เมอร์ จำกัด (มหาชน) สาขา 2",
    value: "SNC2",
  },
  {
    text: "PRD - พาราไดซ์ พลาสติก จำกัด",
    value: "PRD",
  },
  {
    text: "MSPC - บริษัท เมอิโซะ เอส เอ็น ซี พริซิชั่น จำกัด",
    value: "MSPC",
  },
  {
    text: "SPEC - บริษัท เอส เอ็น ซี ไพยองซาน อีโวลูชั่น จำกัด",
    value: "SPEC",
  },
  {
    text: "IPC - อินฟินิตี้ พาร์ท จำกัด",
    value: "IPC",
  },
  {
    text: "SCAN - บริษัท เอส เอ็น ซี ครีเอติวิตี้ แอนโทโลจี จำกัด",
    value: "SCAN",
  },
  {
    text: "SAHP - บริษัท เอส เอ็น ซี แอตแลนติก ฮีต ปัมพ์ จำกัด",
    value: "SAHP",
  },
  {
    text: "SAWHA - เอส เอ็น ซี แอตแลนติก วอเตอร์ ฮีตเตอร์ เอเชีย จำกัด",
    value: "SAWHA",
  },
  {
    text: "SSMA - บริษัท เอส เอส เอ็ม ออโต้แมนชั่น จำกัด",
    value: "SSMA",
  },
];
const buttonText = [
  {
    thai: "ภพ.20",
    eng: "Vat License",
  },
  {
    thai: "หนังสือรับรองบริษัท",
    eng: "Company Affidavit",
  },
  {
    thai: "แผนที่บริษัท",
    eng: "Company Map",
  },
];

export default function InputForm({ setReistor, registor }) {
  return (
    <>
      <Grid templateColumns="repeat(4, 1fr)" gap={4} alignItems="center">
        <GridItem w="100%" fontWeight="bold" colSpan={{ base: "4", lg: "1" }}>
          <Text className="font-thai">เลือกบริษัทที่ต้องการขึ้นทะเบียน</Text>
          <Text fontSize="small">Select the company you want to register.</Text>
        </GridItem>

        {/* Select Form */}
        <GridItem w="100%" colSpan={{ base: "4", md: "3", lg: "2" }}>
          <Select
            placeholder="Select the company you want to register."
            onChange={({ target: { value: companyRegister } }) =>
              setReistor(companyRegister)
            }
          >
            {optionText.map((info, i) => (
              <option key={i} value={info.value}>
                {info.text}
              </option>
            ))}
          </Select>
        </GridItem>

        {/* Button */}
        <GridItem w="100%" colSpan={{ base: "4", md: "1" }}>
          <Grid templateColumns="repeat(3, 1fr)" gap={3}>
            {buttonText.map((info, i) => (
              <GridItem w="100%" key={i}>
                <Button
                  className="font-thai"
                  w="100%"
                  fontSize={{ base: ".6rem", sm: "sm" }}
                  bgColor="#4adede"
                  shadow="md"
                  isDisabled={!registor}
                >
                  {info.thai} <br /> {info.eng}
                </Button>
              </GridItem>
            ))}
          </Grid>
        </GridItem>

        <GridItem w="100%" colSpan={{ base: "2", md: "1" }}>
          <Text className="font-thai" fontWeight="bold">
            เรียน / <span>Attention</span>
          </Text>
        </GridItem>
        <GridItem w="100%" colSpan={{ base: "2", md: "1" }}>
          <Text className="font-thai">กรรมการรองประธานบริหาร</Text>
        </GridItem>
        <GridItem w="100%" colSpan={{ base: "2", md: "1" }}>
          <Text className="font-thai" fontWeight="bold">
            เบอร์แฟกซ์ / <span>Fax No.</span>
          </Text>
        </GridItem>
        <GridItem w="100%" colSpan={{ base: "2", md: "1" }}>
          <Text className="font-thai">XXXXXXXX</Text>
        </GridItem>
      </Grid>
    </>
  );
}
