import React, { useState } from "react";
import {
  Text,
  Grid,
  GridItem,
  HStack,
  Stack,
  Input,
  Spacer,
  Checkbox,
  CheckboxGroup,
  Textarea,
  Select,
} from "@chakra-ui/react";

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

const question = [
  {
    thai: "3. คุณมีมาตรฐานการบรรจุหรือไม่",
    eng: "Do you have standard packing?",
    value: "stdPacking",
  },
  {
    thai: "4. คุณมีจำนวนการสั่งซื้อขั้นต่ำหรือไม่",
    eng: "Do you have minimum order quantity (MOQ)?",
    value: "moq",
  },
];

export default function Standard({ setCertificate, certificate }) {
  const [checked, setChecked] = useState([]);
  const [std, setStd] = useState(false);
  const [moq, setMoq] = useState(false);

  const handleCheck = (event) => {
    var cerArray = [...checked];
    if (event.target.checked) {
      cerArray = [...checked, event.target.value];
    } else {
      cerArray.splice(checked.indexOf(event.target.value), 1);
    }
    setChecked(cerArray);
    setCertificate({ ...certificate, cerArray });
  };

  const handleQuest = (text, value) => {
    if (text == "stdPacking") {
      setCertificate({ ...certificate, stdPacking: value });
      if (value == "Yes") {
        setStd(true);
      } else {
        setStd(false);
      }
    } else {
      setCertificate({ ...certificate, moq: value });
      if (value == "Yes") {
        setMoq(true);
      } else {
        setMoq(false);
      }
    }
  };

  const handleFile = (text, file) => {
    if (text == "stdPacking") {
      setCertificate({ ...certificate, stdPdf: file });
    } else {
      setCertificate({ ...certificate, moqPdf: file });
    }
  };

  return (
    <>
      <HStack mt={5}>
        <Text
          className="font-thai"
          fontWeight="bold"
          fontSize={{ base: "sm", sm: "xl" }}
        >
          มาตรฐานและการรับรองที่ได้รับในปัจจุบัน /{" "}
          <span>Current Standards and Certifications</span>
        </Text>
        <Spacer />
        <Text fontWeight="light" fontSize="sm">
          Step 3 of 5
        </Text>
      </HStack>

      <Grid
        templateColumns="repeat(3, 1fr)"
        gap={3}
        alignItems="center"
        borderTop="2px"
        borderColor="blackAlpha.600"
        py={3}
        my={1}
        fontSize={{ base: "sm", sm: "md" }}
      >
        {/* Q1 */}
        <GridItem w="100%" colSpan={3}>
          <Text className="font-thai" fontWeight="bold">
            1. การรับรองที่ได้รับ / <span>Kind of certificate approved</span>
          </Text>
        </GridItem>
        <GridItem w="100%" colSpan={3}>
          <CheckboxGroup colorScheme="green">
            <Grid
              templateColumns={{ base: "repeat(2,1fr)", md: "repeat(5,1fr)" }}
              gap={2}
            >
              {chkText.map((info, i) => (
                <GridItem
                  key={i}
                  w="100%"
                  display="flex"
                  colSpan={info == "Other" ? "2" : "1"}
                >
                  <Checkbox key={i} value={info} onChange={handleCheck}>
                    {info}
                  </Checkbox>
                  {info == "Other" ? (
                    <Input
                      placeholder="Other certificate"
                      ml={5}
                      isDisabled={!checked.find((info) => info == "Other")}
                      onChange={({ target: { value: other } }) =>
                        setCertificate({ ...certificate, other })
                      }
                      size="sm"
                    />
                  ) : (
                    ""
                  )}
                </GridItem>
              ))}
              <GridItem></GridItem>
            </Grid>
          </CheckboxGroup>
        </GridItem>

        {/* Q2 */}
        <GridItem w="100%" colSpan={3}>
          <Text className="font-thai" fontWeight="bold">
            2. เงื่อนไขการชำระเงิน / <span>Term of payment</span>
          </Text>
          <Textarea
            placeholder=" - กรุณาระบุเงื่อนไขการชำระเงินให้ชัดเจน เช่น Credit Terms (วัน) หรือ เงินสดภายในกี่วัน หรือ ต้องการมัดจำจำนวนกี่เปอร์เซ็นต์ (%) / 
Please specify the payment terms clearly such as Credit Terms (days) or how many days to pay with cash or how many percent deposit is required (%)
- ตัวอย่างเช่น วางมัดจำ 30% เมื่อเปิดใบสั่งซื้อ และงวดถัดๆไปมี Credit Terms 60 วัน / 
For example, place a 30% deposit when opening an order. And the next installment has 60 days Credit Terms."
            size="sm"
            rows={5}
            onChange={({ target: { value: payment } }) =>
              setCertificate({ ...certificate, payment })
            }
          />
        </GridItem>
        <GridItem w="100%" colSpan={{ base: "3", md: "1" }}>
          <Text className="font-thai">
            วงเงินอนุมัติ / <span>Approval limit</span>
          </Text>
        </GridItem>
        <GridItem w="100%" colSpan={{ base: "2", md: "1" }}>
          <Input
            w="100%"
            type="number"
            placeholder="กรุณาระบุตัวเลขเท่านั้น / Please enter numbers only."
            onChange={({ target: { value: limit } }) =>
              setCertificate({ ...certificate, limit })
            }
          />
        </GridItem>
        <GridItem w="100%">
          <Select
            placeholder="Select Currency"
            onChange={({ target: { value: currency } }) =>
              setCertificate({ ...certificate, currency })
            }
          >
            <option value="บาท / THB">บาท / THB</option>
            <option value="ดอลลาร์สหรัฐ / USD">ดอลลาร์สหรัฐ / USD</option>
          </Select>
        </GridItem>

        {/* Q3+4 */}
        {question.map((text, i) => (
          <React.Fragment key={i}>
            <GridItem w="100%" colSpan={3}>
              <Text className="font-thai" fontWeight="bold">
                {text.thai} <span>/ {text.eng}</span>
              </Text>
            </GridItem>
            <GridItem w="100%" colSpan={3}>
              <HStack spacing={10} justifyContent="center">
                <input
                  name={text.value}
                  id={`${text.value}No`}
                  type="radio"
                  value="No"
                  onChange={(e) => handleQuest(text.value, e.target.value)}
                />
                <label
                  htmlFor={`${text.value}No`}
                  style={{ marginLeft: "10px" }}
                >
                  ไม่มี/No
                </label>
                <input
                  name={text.value}
                  id={`${text.value}Yes`}
                  type="radio"
                  value="Yes"
                  onChange={(e) => handleQuest(text.value, e.target.value)}
                />
                <label
                  htmlFor={`${text.value}Yes`}
                  style={{ marginLeft: "10px" }}
                >
                  มี/Yes
                </label>

                <Stack>
                  <Text className="font-thai" fontSize="small">
                    แนบเอกสาร / <span>Attach file</span>
                  </Text>
                  <Input
                    type="file"
                    accept=".pdf"
                    variant="unstyled"
                    size="sm"
                    isDisabled={text.value == "stdPacking" ? !std : !moq}
                    onChange={(e) => handleFile(text.value, e.target.files)}
                  />
                </Stack>
              </HStack>
            </GridItem>
          </React.Fragment>
        ))}
      </Grid>
    </>
  );
}
