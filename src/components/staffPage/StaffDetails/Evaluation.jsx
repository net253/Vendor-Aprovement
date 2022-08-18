import React, { useState, useEffect } from "react";
import {
  Text,
  Divider,
  HStack,
  Box,
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

export default function Evaluation({
  tablePoint,
  setTablePoint,
  footer,
  setFooter,
}) {
  const [check, setCheck] = useState(Array(24).fill("-"));

  const handleRadio = (i) => (e) => {
    const { value } = e.target;
    let newArray = [...tablePoint];
    let chkArray = [...check];
    newArray[i] = value;
    chkArray[i] = value;

    setCheck(chkArray);
    setTablePoint(newArray);
  };

  const sum = tablePoint.reduce(
    (partialSum, a) => parseInt(partialSum) + parseInt(a)
  );

  const sumWeigth = (sum * 0.74).toFixed(0);

  const handleGrade = () => {
    let grade = "F";
    if (sumWeigth >= 90) {
      grade = "A";
    } else if (sumWeigth >= 80) {
      grade = "B";
    } else if (sumWeigth >= 70) {
      grade = "C";
    } else if (sumWeigth >= 50) {
      grade = "D";
    } else {
      grade = "F";
    }

    let checkForm = false;
    if (check == "") {
      checkForm = false;
    } else if (!check.find((info) => info == "-")) {
      checkForm = true;
    } else {
      checkForm = false;
    }

    setFooter({ ...footer, grade: grade, sumPoint: sum, checkForm: checkForm });
  };

  useEffect(() => {
    const initPage = setTimeout(() => {
      handleGrade();
    });

    return () => {
      clearTimeout(initPage);
    };
  }, [tablePoint]);

  return (
    <>
      <Box px={1}>
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
                    <input
                      type="radio"
                      id={i + "10A"}
                      name={info.Question}
                      value="10"
                      onChange={handleRadio(i)}
                    />
                    <label htmlFor={i + "10A"} style={{ marginLeft: "8px" }}>
                      {info.P1}
                    </label>
                  </Td>
                  <Td>
                    <input
                      type="radio"
                      id={i + "5A"}
                      name={info.Question}
                      value="5"
                      onChange={handleRadio(i)}
                    />
                    <label htmlFor={i + "5A"} style={{ marginLeft: "8px" }}>
                      {info.P2}
                    </label>
                  </Td>
                  <Td>
                    <input
                      type="radio"
                      id={i + "0A"}
                      name={info.Question}
                      value="0"
                      onChange={handleRadio(i)}
                    />
                    <label htmlFor={i + "0A"} style={{ marginLeft: "8px" }}>
                      {info.P3}
                    </label>
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
                    <input
                      type="radio"
                      id={i + "5B"}
                      name={info.Question}
                      value="5"
                      onChange={handleRadio(i + 3)}
                    />
                    <label htmlFor={i + "5B"} style={{ marginLeft: "8px" }}>
                      {info.P1}
                    </label>
                  </Td>
                  <Td>
                    <input
                      type="radio"
                      id={i + "3B"}
                      name={info.Question}
                      value="3"
                      disabled={!info.P2}
                      onChange={handleRadio(i + 3)}
                    />
                    <label htmlFor={i + "3B"} style={{ marginLeft: "8px" }}>
                      {info.P2}
                    </label>
                  </Td>
                  <Td>
                    <input
                      type="radio"
                      id={i + "0B"}
                      name={info.Question}
                      value="0"
                      onChange={handleRadio(i + 3)}
                    />
                    <label htmlFor={i + "0B"} style={{ marginLeft: "8px" }}>
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
      </Box>
    </>
  );
}
