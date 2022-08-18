import React, { useState } from "react";
import {
  Grid,
  GridItem,
  Text,
  Input,
  Divider,
  HStack,
  Checkbox,
  Box,
  Textarea,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";

const formOption = [
  { Question: "คุณภาพสินค้า", P1: "ดี", P2: "ปกติ", P3: "ไม่ดี" },
  {
    Question: "การส่งมอบ / lead time การสั่งซื้อ",
    P1: "15 วัน",
    P2: "30 วัน",
    P3: "45 วัน",
  },
  { Question: "ราคา (สกุลเงิน)", P1: "ถูก", P2: "ปกติ", P3: "แพง" },
];

const formOptions = [
  { Question: "Company profile/ brochure", P1: "มี", P2: "", P3: "ไม่มี" },
  { Question: "ระยะทาง", P1: "30 กม.", P2: "30-100 กม.", P3: "100 กม." },
  {
    Question: "เยี่ยมชมโรงงาน + รูปถ่าย***",
    P1: "ดี",
    P2: "ปกติ",
    P3: "ไม่ดี",
  },
  {
    Question: "สภาพเครื่องจักร + รูปถ่าย***",
    P1: "ดี",
    P2: "ปกติ",
    P3: "ไม่ดี",
  },
  {
    Question: "ระบบ ISO***",
    P1: "มี",
    P2: "",
    P3: "ไม่มี",
  },
  {
    Question: "รับประกัน 1 ปี",
    P1: "มี",
    P2: "",
    P3: "ไม่มี",
  },
  {
    Question: "เครดิตเทอม",
    P1: "ดี 90D",
    P2: "พอใช้ 60D",
    P3: "ไม่ดี 30D",
  },
  {
    Question: "ผังองค์กร",
    P1: "มี",
    P2: "",
    P3: "ไม่มี",
  },
  {
    Question: "ชื่อ MD email, Tel, รูปถ่าย",
    P1: "มี",
    P2: "",
    P3: "ไม่มี",
  },
  {
    Question: "ชื่อ ฝ่ายขาย email, Tel",
    P1: "มี",
    P2: "",
    P3: "ไม่มี",
  },
  {
    Question: "ชื่อ ฝ่ายการเงิน email, Tel",
    P1: "มี",
    P2: "",
    P3: "ไม่มี",
  },
  {
    Question: "เปรียบเทียบ กับ คู่เทียบ",
    P1: "ดีกว่า",
    P2: "ปกติ",
    P3: "ไม่ดี",
  },
  {
    Question: "เงื่อนไข การปรับราคา",
    P1: "ไม่มี",
    P2: "",
    P3: "มี",
  },
  {
    Question: "บัตร BOI ***",
    P1: "มี",
    P2: "",
    P3: "ไม่มี",
  },
  {
    Question: "มีนโยบายการต่อต้านทุจริตคอร์รัปชั่น",
    P1: "มี",
    P2: "",
    P3: "ไม่มี",
  },
  {
    Question: "ไม่มีนโยบายรับแรงงานเด็ก",
    P1: "ใช่",
    P2: "",
    P3: "ไม่ใช่",
  },
  {
    Question: "มีการควบคุมสภาวะแวดล้อม ความปลอดภัยภายในโรงงาน",
    P1: "มี",
    P2: "",
    P3: "ไม่มี",
  },
  {
    Question: "มีการประเมินผลกระทบต่อสิ่งแวดล้อมต่อตนเองและชุมชนโดยรอบ",
    P1: "มี",
    P2: "",
    P3: "ไม่มี",
  },
  {
    Question: "มีการเปิดเผยช่องทางให้ติดต่อร้องเรียน",
    P1: "มี",
    P2: "",
    P3: "ไม่มี",
  },
  {
    Question: "มีการประเมินความปลอดภัย อาชีวอนามัยและสภาพแวดล้อมในการทำงาน",
    P1: "มี",
    P2: "",
    P3: "ไม่มี",
  },
  {
    Question: "มีสวัสดิการขั้นต่ำที่ครบถ้วนตามกฎหมายกำหนด",
    P1: "ใช่",
    P2: "",
    P3: "ไม่ใช่",
  },
];

const formExtra = [
  { Question: "แจ้งระเบียบวางบิล รับเช็ค", P1: "แจ้ง", P2: "", P3: "ไม่แจ้ง" },
  {
    Question: "ผลการดำเนินงาน",
    P1: "ดี",
    P2: "พอใช้",
    P3: "ไม่ดี",
  },
  { Question: "งบการเงิน 5 ปี", P1: "มี", P2: "", P3: "ไม่มี" },
  {
    Question: "ฐานะการเงิน",
    P1: "ดี",
    P2: "พอใช้",
    P3: "ไม่ดี",
  },
  {
    Question: "จำนวนปี จดทะเบียน บริษัท",
    P1: "5 ปี",
    P2: "3-5 ปี",
    P3: "1-2 ปี",
  },
  {
    Question: "Incoterm",
    P1: "DAP",
    P2: "FOB/CIF",
    P3: "EXW",
  },
  {
    Question: "วางเงินมัดจำ",
    P1: "ไม่ต้อง",
    P2: "",
    P3: "ต้อง",
  },
  {
    Question: "เปิด L/C",
    P1: "ไม่ต้อง",
    P2: "ปกติ",
    P3: "ต้อง",
  },
  {
    Question: "ภ.พ 20",
    P1: "มี",
    P2: "",
    P3: "ไม่มี",
  },
  {
    Question: "หนังสือรับรอง 3 เดือน",
    P1: "มี",
    P2: "",
    P3: "ไม่มี",
  },
  {
    Question: "ความสัมพันธ์กับบุคคลใน SNC",
    P1: "มี",
    P2: "",
    P3: "ไม่มี",
  },
];

export default function Details({ modalInfo }) {
  const { companyDetails, sellerDetails, score, moreInfo, summarize } =
    modalInfo;

  const inputFill = [
    {
      head: "ชื่อบริษัท / Company Name",
      value: `${companyDetails[0].thaiCompany} / ${companyDetails[0].engCompany}`,
    },
    {
      head: "ที่อยู่ / Address",
      value: `${companyDetails[0].thaiAddress} / ${companyDetails[0].engAddress}`,
    },
    {
      head: "โทรศัพท์ / Tel No.",
      value: companyDetails[0].tel,
    },
    {
      head: "แฟกซ์ / Fax No.",
      value: companyDetails[0].fax,
    },
    {
      head: "อีเมล / E-mail",
      value: companyDetails[0].companyWeb,
    },
  ];
  const chkOption = [
    "ผู้ขายรายเดิม",
    "ผู้ขายรายใหม่",
    "Customer Request**",
    "วัตถุดิบ**",
    "วัสดุสิ้นเปลืองโรงงาน",
    "วัสดุสำนักงาน",
    "งานรับเหมา,จ้างทำ",
    "ขนส่ง",
    "เบ็ดเตล็ด/อุปกรณ์โรงงาน",
    "เบ็ดเตล็ด/อุปกรณ์สำนักงาน",
    "สารเคมี,เชื้อเพลิง",
    "เครื่องจักร",
    "Other",
  ];

  const product = [
    sellerDetails.product1,
    sellerDetails.product2,
    sellerDetails.product3,
    sellerDetails.product4,
  ];

  const sum = score.reduce(
    (partialSum, a) => parseInt(partialSum) + parseInt(a)
  );

  const sumWeigth = (sum * 0.74).toFixed(0);

  const handleGrade = () => {
    let grade = "F";
    if (sum >= 99) {
      grade = "A";
    } else if (sum >= 88) {
      grade = "B";
    } else if (sum >= 77) {
      grade = "C";
    } else if (sum >= 55) {
      grade = "D";
    } else {
      grade = "F";
    }

    return grade;
  };

  const gradeSum = handleGrade();

  return (
    <>
      <Grid
        templateColumns="repeat(3, 1fr)"
        gap={1}
        mt={5}
        px={1}
        alignItems="center"
      >
        <GridItem colSpan={3}>
          <HStack justifyContent="space-between">
            <Text className="font-thai" fontWeight="bold">
              รายละเอียดผู้ขาย / Seller Details
            </Text>
            <Text fontWeight="light" fontSize="sm">
              Step 1 of 3
            </Text>
          </HStack>
          <Divider border="1px" borderColor="black" mb={2} />
        </GridItem>

        {/* Input */}
        {inputFill.map((info, i) => (
          <React.Fragment key={i}>
            <GridItem w="100%">
              <Text className="font-thai">{info.head}</Text>
            </GridItem>
            <GridItem w="100%" colSpan={2}>
              {i == 1 ? (
                <Textarea
                  value={info.value}
                  variant="flushed"
                  size="sm"
                  isDisabled
                  rows={3}
                />
              ) : (
                <Input
                  value={info.value}
                  variant="flushed"
                  size="sm"
                  isDisabled
                />
              )}
            </GridItem>
          </React.Fragment>
        ))}

        {/* ChkBox */}
        <GridItem colSpan={3} mt={3}>
          <Grid templateColumns="repeat(3,1fr)" gap={2}>
            {chkOption.map((info, i) => (
              <GridItem key={i}>
                <Checkbox
                  size="sm"
                  isChecked={sellerDetails.chk.find((text) => text == info)}
                  readOnly
                >
                  <Text className="font-thai">{info}</Text>
                </Checkbox>
              </GridItem>
            ))}
            <GridItem colSpan={2} display="flex">
              <Input
                variant="filled"
                size="sm"
                value={sellerDetails.other}
                readOnly
              />
            </GridItem>
          </Grid>
        </GridItem>
      </Grid>

      <Text className="font-thai" mt={3}>
        สินค้าและบริการ
      </Text>
      {Array(4)
        .fill(0)
        .map((_, i) => (
          <Box key={i} d="flex" alignItems="center" gap={3} mb={2}>
            <Text fontSize="sm">{i + 1}.</Text>
            <Input
              key={i}
              variant="filled"
              size="sm"
              name={`product${i + 1}`}
              value={product[i]}
              readOnly
            />
          </Box>
        ))}

      <HStack justifyContent="space-between" mt={5}>
        <Text className="font-thai" fontWeight="bold">
          ประเมินผลต่อการผลิตสินค้า
        </Text>
        <Text fontWeight="light" fontSize="sm">
          Step 2 of 3
        </Text>
      </HStack>
      <Divider border="1px" borderColor="black" mb={2} />

      <TableContainer>
        <Table variant="simple" size="sm">
          <Thead>
            <Tr>
              <Th w="30%"></Th>
              <Th className="font-thai" fontSize="sm">
                10 คะแนน
              </Th>
              <Th className="font-thai" fontSize="sm">
                5 คะแนน
              </Th>
              <Th className="font-thai" fontSize="sm">
                0 คะแนน
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {formOption.map((info, i) => (
              <Tr key={i}>
                <Td className="font-thai">
                  {i + 1}. {info.Question}
                </Td>
                <Td>
                  <input type="radio" checked={score[i] == "10"} readOnly />
                  <label style={{ marginLeft: "8px" }}>{info.P1}</label>
                </Td>
                <Td>
                  <input type="radio" checked={score[i] == "5"} readOnly />
                  <label style={{ marginLeft: "8px" }}>{info.P2}</label>
                </Td>
                <Td>
                  <input type="radio" checked={score[i] == "0"} readOnly />
                  <label style={{ marginLeft: "8px" }}>{info.P3}</label>
                </Td>
              </Tr>
            ))}
          </Tbody>

          <Thead>
            <Tr>
              <Th></Th>
              <Th className="font-thai" fontSize="sm">
                5 คะแนน
              </Th>
              <Th className="font-thai" fontSize="sm">
                3 คะแนน
              </Th>
              <Th className="font-thai" fontSize="sm">
                0 คะแนน
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {formOptions.map((info, i) => (
              <Tr key={i}>
                <Td className="font-thai">
                  {i + 4}. {info.Question}
                </Td>
                <Td>
                  <input type="radio" checked={score[i + 3] == "5"} readOnly />
                  <label style={{ marginLeft: "8px" }}>{info.P1}</label>
                </Td>
                <Td>
                  <input
                    type="radio"
                    disabled={!info.P2}
                    checked={score[i + 3] == "3"}
                    readOnly
                  />
                  <label style={{ marginLeft: "8px" }}>{info.P2}</label>
                </Td>
                <Td>
                  <input type="radio" checked={score[i + 3] == "0"} readOnly />
                  <label style={{ marginLeft: "8px" }}>{info.P3}</label>
                </Td>
              </Tr>
            ))}
          </Tbody>

          <Tbody bgColor="gray.100">
            <Tr fontWeight="bold">
              <Td className="font-thai">คะแนนที่ได้</Td>
              <Td></Td>
              <Td fontSize="sm" textAlign="end">
                {sum}
              </Td>
              <Td className="font-thai">คะแนน</Td>
            </Tr>
            <Tr fontWeight="bold">
              <Td className="font-thai">คะแนนถ่วงน้ำหนัก (100 คะแนน)</Td>
              <Td></Td>
              <Td fontSize="sm" textAlign="end">
                {sumWeigth}
              </Td>
              <Td className="font-thai">คะแนน</Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>

      <HStack justifyContent="space-between" mt={5}>
        <Text className="font-thai" fontWeight="bold">
          ข้อมูลผู้ขายเพิ่มเติม
        </Text>
        <Text fontWeight="light" fontSize="sm">
          Step 3 of 3
        </Text>
      </HStack>
      <Divider border="1px" borderColor="black" mb={2} />

      {/* Extra */}
      <TableContainer>
        <Table variant="simple" size="sm">
          <Tbody>
            {formExtra.map((info, i) => (
              <Tr key={i}>
                <Td className="font-thai">
                  {i + 1}. {info.Question}
                </Td>
                <Td>
                  <input type="radio" checked={moreInfo[i] == "5"} readOnly />
                  <label className="font-thai" style={{ marginLeft: "8px" }}>
                    {info.P1}
                  </label>
                </Td>
                <Td>
                  <input
                    type="radio"
                    disabled={!info.P2}
                    checked={moreInfo[i] == "3"}
                    readOnly
                  />
                  <label className="font-thai" style={{ marginLeft: "8px" }}>
                    {info.P2}
                  </label>
                </Td>
                <Td>
                  <input type="radio" checked={moreInfo[i] == "0"} readOnly />
                  <label className="font-thai" style={{ marginLeft: "8px" }}>
                    {info.P3}
                  </label>
                </Td>
              </Tr>
            ))}
          </Tbody>
          {/* Footer table */}
          <Tbody bgColor="gray.100">
            {/* Grade */}
            <Tr fontWeight="bold">
              <Td className="font-thai">
                เกรดจากการประเมิน <br />
                (Evaluation Grade)
              </Td>
              <Td></Td>
              <Td fontSize="lg">{gradeSum}</Td>
              <Td></Td>
            </Tr>
            {/* Summary */}
            <Tr>
              <Td className="font-thai" fontWeight="bold">
                สรุปผลการประเมิน <br />
                (Evaluation Summary)
              </Td>
              <Td>
                <input type="radio" checked={summarize == "เลือก"} readOnly />
                <label className="font-thai" style={{ marginLeft: "8px" }}>
                  เลือก
                </label>
              </Td>
              <Td>
                <input type="radio" checked={summarize == "ปลดล็อค"} readOnly />
                <label className="font-thai" style={{ marginLeft: "8px" }}>
                  ปลดล็อคระบบ
                </label>
              </Td>
              <Td>
                <input
                  type="radio"
                  checked={summarize == "ไม่เลือก"}
                  readOnly
                />
                <label className="font-thai" style={{ marginLeft: "8px" }}>
                  ไม่คัดเลือก
                </label>
              </Td>
            </Tr>
            <Tr>
              <Td></Td>
              <Td>
                <Text className="font-thai" fontSize="smaller">
                  เลือกเป็นผู้ขายรายใหม่ <br /> / ผู้รับจ้างช่วง <br />
                  ช่วงคะแนน 70-100%
                </Text>
              </Td>
              <Td></Td>
              <Td>
                <Text className="font-thai" fontSize="smaller">
                  ไม่คัดเลือกเป็นผู้ขายรายใหม่ <br />/ ผู้รับจ้างช่วง <br />
                  ช่วงคะแนนต่ำกว่า 70%
                </Text>
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
      {/* Indicator */}
      <HStack fontSize="x-small" justifyContent="space-between" mt={1}>
        <Text>A = 90-100% (EXCELLENT)</Text>
        <Text>B = 80-89% (GOOD)</Text>
        <Text>C = 70-79% (FAIR)</Text>
        <Text>D = 50-69% (NEED IMPROVED)</Text>
        <Text>F = 0-50% (NEED IMPROVED & AUDIT)</Text>
      </HStack>

      {/* Submit form */}
      <Grid templateColumns="repeat(3,1fr)" gap={2} mt={10} alignItems="center">
        <GridItem w="100%" fontWeight="bold" ps={8}>
          <Text className="font-thai">บันทึกโดย / Submit by</Text>
        </GridItem>
        <GridItem w="100%" colSpan={2}>
          <Input
            placeholder="กรุณาระบุคำนำหน้า / Please specify name title"
            size="sm"
            variant="filled"
            value={modalInfo.submitBy}
            readOnly
          />
        </GridItem>
      </Grid>
    </>
  );
}
