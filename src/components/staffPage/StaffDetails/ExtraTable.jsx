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
  Tfoot,
} from "@chakra-ui/react";

const formOption = [
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

export default function ExtraTable({
  tableExtra,
  setTableExtra,
  footer,
  setFooter,
  tablePoint,
}) {
  const [check, setCheck] = useState(Array(11).fill("-"));

  const handleRadio = (i) => (e) => {
    const { value } = e.target;
    let newArray = [...tableExtra];
    let chkArray = [...check];
    newArray[i] = value;
    chkArray[i] = value;

    setCheck(chkArray);
    setTableExtra(newArray);
  };

  const handleFooter = (e) => {
    const { name, value } = e.target;

    setFooter({ ...footer, [name]: value });
  };

  const handleCheck = () => {
    let extraForm = false;
    if (check == "") {
      extraForm = false;
    } else if (!check.find((info) => info == "-")) {
      extraForm = true;
    } else {
      extraForm = false;
    }
    // console.log(extraForm);

    setFooter({ ...footer, extraForm: extraForm });
  };

  const sum = tablePoint.reduce(
    (partialSum, a) => parseInt(partialSum) + parseInt(a)
  );

  useEffect(() => {
    const initPage = setTimeout(() => {
      handleCheck();
    }, 100);

    return () => {
      clearTimeout(initPage);
    };
  }, [check]);

  return (
    <>
      <Box px={1}>
        <HStack justifyContent="space-between" mt={5}>
          <Text className="font-thai" fontWeight="bold">
            ข้อมูลผู้ขายเพิ่มเติม
          </Text>
          <Text fontWeight="light" fontSize="sm">
            Step 3 of 3
          </Text>
        </HStack>
        <Divider border="1px" borderColor="black" mb={2} />

        <TableContainer>
          <Table variant="simple" size="sm">
            <Tbody>
              {formOption.map((info, i) => (
                <Tr key={i}>
                  <Td className="font-thai">
                    {i + 1}. {info.Question}
                  </Td>
                  <Td>
                    <input
                      type="radio"
                      id={i + "P"}
                      name={info.Question}
                      value="5"
                      onChange={handleRadio(i)}
                    />
                    <label htmlFor={i + "P"} style={{ marginLeft: "8px" }}>
                      {info.P1}
                    </label>
                  </Td>
                  <Td>
                    <input
                      type="radio"
                      id={i + "D"}
                      name={info.Question}
                      disabled={!info.P2}
                      value="3"
                      onChange={handleRadio(i)}
                    />
                    <label htmlFor={i + "D"} style={{ marginLeft: "8px" }}>
                      {info.P2}
                    </label>
                  </Td>
                  <Td>
                    <input
                      type="radio"
                      id={i + "F"}
                      name={info.Question}
                      value="0"
                      onChange={handleRadio(i)}
                    />
                    <label htmlFor={i + "F"} style={{ marginLeft: "8px" }}>
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
                <Td fontSize="xl">{footer.grade}</Td>
                <Td></Td>
              </Tr>

              {/* Summary */}
              <Tr>
                <Td className="font-thai" fontWeight="bold">
                  สรุปผลการประเมิน <br />
                  (Evaluation Summary)
                </Td>
                <Td>
                  <input
                    type="radio"
                    id="1"
                    name="summarize"
                    value="เลือก"
                    onChange={handleFooter}
                    disabled={sum * 0.74 < 70}
                  />
                  <label htmlFor="1" style={{ marginLeft: "8px" }}>
                    เลือก
                  </label>
                  <Text className="font-thai" fontSize="smaller">
                    ช่วงคะแนน 70-100%
                  </Text>
                </Td>
                <Td>
                  <input
                    type="radio"
                    id="2"
                    name="summarize"
                    value="ปลดล็อค"
                    onChange={handleFooter}
                  />
                  <label htmlFor="2" style={{ marginLeft: "8px" }}>
                    ปลดล็อคระบบ
                  </label>
                  <Text className="font-thai" fontSize="smaller">
                    -
                  </Text>
                </Td>
                <Td>
                  <input
                    type="radio"
                    id="3"
                    name="summarize"
                    value="ไม่เลือก"
                    onChange={handleFooter}
                  />
                  <label htmlFor="3" style={{ marginLeft: "8px" }}>
                    ไม่คัดเลือก
                  </label>
                  <Text className="font-thai" fontSize="smaller">
                    ช่วงคะแนนต่ำกว่า 70%
                  </Text>
                </Td>
              </Tr>
              <Tr>
                <Td></Td>
                <Td>
                  <Text className="font-thai" fontSize="small">
                    เลือกเป็นผู้ขายรายใหม่ <br /> / ผู้รับจ้างช่วง
                  </Text>
                </Td>
                <Td></Td>
                <Td>
                  <Text className="font-thai" fontSize="small">
                    ไม่คัดเลือกเป็น <br />
                    ผู้ขายรายใหม่ / <br /> ผู้รับจ้างช่วง
                  </Text>
                </Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>

        {/* Indicator */}
        <HStack fontSize="small" justifyContent="space-between" mt={1}>
          <Text>
            A = 90-100% <br />
            (EXCELLENT)
          </Text>
          <Text>
            B = 80-89% <br />
            (GOOD)
          </Text>
          <Text>
            C = 70-79% <br />
            (FAIR)
          </Text>
          <Text>
            D = 50-69% <br />
            (NEED IMPROVED)
          </Text>
          <Text>
            F = 0-50% <br />
            (NEED IMPROVED & AUDIT)
          </Text>
        </HStack>
      </Box>
    </>
  );
}
