import React from "react";
import {
  Grid,
  GridItem,
  Text,
  Input,
  Checkbox,
  HStack,
  Stack,
  Box,
  Divider,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Image,
  Textarea,
  Center,
} from "@chakra-ui/react";
import logo from "../img/logo.png";
import { useSelector } from "react-redux";

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
];

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
    Question: "มีประเมินความปลอดภัย อาชีวอนามัยและสภาพแวดล้อมในการทำงาน",
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

export const PdfStaff = React.forwardRef((props, ref) => {
  const sign = useSelector((state) => state.sign);

  const {
    sellerDetails,
    score,
    moreInfo,
    datetime,
    companyDetails,
    summarize,
  } = props.modalInfo;

  const dateFormat = (datetime) => {
    if (datetime) {
      const arr = datetime.split(" ").slice(0, 1).join("");
      const date = arr.split("-").reverse().join("/");

      return date;
    }
  };

  const formSign = props.history.map((sign) => {
    const signs = sign?.name;
    const date = dateFormat(sign?.datetime);
    const position = sign?.position;

    return { sign: signs, date: date, position: position };
  });

  const TelInput = [
    { head: "โทรศัพท์", value: companyDetails[0].tel },
    { head: "แฟกซ์ ", value: companyDetails[0].fax },
    { head: "อีเมล", value: sellerDetails.email },
  ];

  const dateInput = [
    { head: "วันที่", value: datetime },
    { head: "", value: "" },
    { head: "รหัสผู้จำหน่าย", value: sellerDetails.sellerID },
  ];

  const serviceInput = [
    sellerDetails.product1,
    sellerDetails.product2,
    sellerDetails.product3,
    sellerDetails.product4,
  ];

  const sum = score.reduce(
    (partialSum, a) => parseInt(partialSum) + parseInt(a)
  );

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
      <Box ref={ref} h="100vh" px={1}>
        <div className="pageFooter mt-1">Page 1 of 2</div>

        {/* Head */}
        <HStack justifyContent="center">
          <Image
            srcSet={logo}
            h="3vh"
            fallbackSrc="./assets/logo.d5523e24.png"
          />
          <Text className="font-thai" color="blue.600" fontSize="sm">
            บริษัท เอส เอ็น ซี ฟอร์เมอร์ จำกัด (มหาชน) และบริษัทในเครือ
            <br />
            <span>
              SNC Former Public Company Limited and affiliated companies
            </span>
          </Text>
        </HStack>

        <Divider border="1px" />

        <Text
          className="font-thai"
          fontWeight="bold"
          textDecorationLine="underline"
          my={2}
          textAlign="center"
        >
          แบบฟอร์มคัดเลือกผู้ขาย
        </Text>

        {/* Date */}
        <Grid
          templateColumns="repeat(3,1fr)"
          justifyContent="space-around"
          fontSize="sm"
        >
          {dateInput.map((text, i) => (
            <GridItem
              key={i}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Text className="font-thai">{text.head}</Text>
              {i == 1 ? (
                ""
              ) : (
                <Input
                  variant="filled"
                  value={text.value}
                  readOnly
                  textAlign="center"
                  size="sm"
                  w={`${i < 2 ? "60%" : "50%"}`}
                />
              )}
            </GridItem>
          ))}
        </Grid>

        <Grid
          templateColumns="repeat(5,1fr)"
          gap={1}
          size="sm"
          fontSize="sm"
          mt={4}
          alignItems="center"
        >
          <GridItem w="100%">
            <Text className="font-thai">รายละเอียดผู้ขาย</Text>
          </GridItem>
          {/* Chk Box */}
          {chkOption.map((info, i) => (
            <GridItem key={i} alignItems="center" display="flex">
              <Checkbox
                size="sm"
                isChecked={sellerDetails.chk.find((text) => text == info)}
              >
                <Text className="font-thai" fontSize="smaller">
                  {info}
                </Text>
              </Checkbox>
            </GridItem>
          ))}
          <GridItem w="100%" colSpan={2} />

          {/* Company name */}
          <GridItem w="100%" colSpan={2} display="flex">
            <Text mt={2} className="font-thai">
              ชื่อบริษัท :
            </Text>
            <Textarea
              variant="filled"
              value={companyDetails[0].thaiCompany}
              readOnly
              size="sm"
              w="80%"
              rows={2}
            />
          </GridItem>

          {/* Address */}
          <GridItem w="100%" colSpan={3} display="flex">
            <Text mt={2} className="font-thai">
              ที่อยู่ :
            </Text>
            <Textarea
              variant="filled"
              value={companyDetails[0].thaiAddress}
              readOnly
              size="sm"
              w="93%"
              rows={2}
            />
          </GridItem>

          {/* Tel */}
          <GridItem colSpan={5}>
            <Grid templateColumns="repeat(3,1fr)" gap={2} fontSize="sm">
              {TelInput.map((text, i) => (
                <GridItem w="100%" key={i} display="flex" alignItems="center">
                  <Text className="font-thai">{text.head} :</Text>
                  <Input
                    variant="filled"
                    value={text.value}
                    readOnly
                    size="sm"
                    w={i != 2 ? "76%" : "100%"}
                  />
                </GridItem>
              ))}
            </Grid>
          </GridItem>

          <GridItem w="100%" colSpan={4}>
            <Text className="font-thai" textDecorationLine="underline">
              สินค้า / บริการ
            </Text>
          </GridItem>
          {/* Point */}
          <GridItem
            rowSpan={2}
            bgColor="gray.200"
            h="100%"
            py={1}
            textAlign="center"
          >
            <Text className="font-thai">คะแนนที่ได้</Text>
            <Text fontSize="lg" fontWeight="bold">
              {sum}
            </Text>
          </GridItem>

          {/* Service */}
          {serviceInput.map((value, i) => (
            <GridItem w="100%" key={i} display="flex" alignItems="center">
              <Text>{i + 1}.</Text>
              <Input
                variant="filled"
                value={value}
                readOnly
                textAlign="center"
                size="sm"
                w="80%"
              />
            </GridItem>
          ))}
        </Grid>

        <Text
          className="font-thai"
          textDecorationLine="underline"
          fontSize="sm"
          mt={2}
        >
          ประเมินผลต่อสินค้าและบริการ
        </Text>

        {/* Evaluation */}
        <Table variant="simple" size="sm">
          <Thead>
            <Tr bgColor="gray.100">
              <Th w="59%"></Th>
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
                  <label className="font-thai" style={{ marginLeft: "8px" }}>
                    {info.P1}
                  </label>
                </Td>
                <Td>
                  <input type="radio" checked={score[i] == "5"} readOnly />
                  <label className="font-thai" style={{ marginLeft: "8px" }}>
                    {info.P2}
                  </label>
                </Td>
                <Td>
                  <input type="radio" checked={score[i] == "0"} readOnly />
                  <label className="font-thai" style={{ marginLeft: "8px" }}>
                    {info.P3}
                  </label>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>

        <Table variant="simple" size="sm">
          <Thead bgColor="gray.100">
            <Tr>
              <Th w="59%"></Th>
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
                  <input
                    type="radio"
                    checked={score[i + 3] == "5"}
                    readOnly
                    value="5"
                  />
                  <label className="font-thai" style={{ marginLeft: "8px" }}>
                    {info.P1}
                  </label>
                </Td>
                <Td>
                  <input
                    type="radio"
                    disabled={!info.P2}
                    checked={score[i + 3] == "3"}
                    readOnly
                  />
                  <label className="font-thai" style={{ marginLeft: "8px" }}>
                    {info.P2}
                  </label>
                </Td>
                <Td>
                  <input
                    type="radio"
                    value="0"
                    checked={score[i + 3] == "0"}
                    readOnly
                  />
                  <label className="font-thai" style={{ marginLeft: "8px" }}>
                    {info.P3}
                  </label>
                </Td>
              </Tr>
            ))}
          </Tbody>
          <Tbody bgColor="gray.100">
            <Tr fontWeight="bold">
              <Td className="font-thai">คะแนนที่ได้</Td>
              <Td></Td>
              <Td textAlign="end">{sum}</Td>
              <Td className="font-thai">คะแนน</Td>
            </Tr>
            <Tr fontWeight="bold">
              <Td className="font-thai">คะแนนถ่วงน้ำหนัก (100 คะแนน)</Td>
              <Td></Td>
              <Td fontSize="sm" textAlign="end">
                {(sum * 0.74).toFixed(0)}
              </Td>
              <Td className="font-thai">คะแนน</Td>
            </Tr>
          </Tbody>
        </Table>

        {/*------------------------------ New Page ----------------------------*/}
        <div className="pageFooter mt-2">Page 2 of 2</div>
        <Divider border="1px" mt={5} />
        <Text
          className="font-thai"
          textDecorationLine="underline"
          fontSize="sm"
          mt={3}
        >
          ข้อมูลผู้ขายเพิ่มเติม
        </Text>
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
                  <input
                    type="radio"
                    checked={summarize == "ปลดล็อค"}
                    readOnly
                  />
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

        {/* Note */}
        <Box colSpan={4} display="flex" mt={2} fontSize="small">
          <Text className="font-thai" mr={4}>
            หมายเหตุ :
          </Text>
          <Stack>
            <Text className="font-thai">
              เครื่องหมาย ** ต้องมีการตรวจสอบ ร่วมกัน โดย MINI.MD และ SCM.
            </Text>
            <Text className="font-thai">
              เครื่องหมาย *** ใช้ประเมินเฉพาะกลุ่ม Raw Material
            </Text>
          </Stack>
        </Box>

        <Divider border="1px" my={5} />

        {/* Sign */}
        <Center>
          <Grid
            templateColumns={`repeat(${formSign.length},1fr)`}
            mt={2}
            fontSize="smaller"
            w="100%"
          >
            {formSign.map((info, i) => (
              <GridItem w="100%" textAlign="center" key={i}>
                <Stack border="1px">
                  <Text>Issued by</Text>
                  <Text mt={5} fontWeight="semibold" fontSize="md">
                    {info?.sign}
                  </Text>
                  <Text mb={5}>{info?.date}</Text>
                  <Text> {info?.position}</Text>
                </Stack>
              </GridItem>
            ))}
          </Grid>
        </Center>
      </Box>
    </>
  );
});
