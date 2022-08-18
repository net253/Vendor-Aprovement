import React from "react";
import {
  Box,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";

const sizeForRes = { base: "sm", md: "md" };

export default function HeaderPay() {
  return (
    <>
      <Box py={3} mb={5}>
        <Text
          fontWeight="bold"
          fontSize={{ base: "sm", md: "lg" }}
          className="font-thai"
          textAlign="center"
        >
          รูปแบบการชำระเงิน
        </Text>

        {/* Document */}
        <Text my={5} fontSize={sizeForRes} className="font-thai">
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          บริษัทฯ ขอแจ้งให้ทราบว่า บริษัทฯ
          มีนโยบายจะเปลี่ยนแปลงวิธีการจ่ายชำระสินค้า จากเดิมชำระด้วยธนาคาร
          เปลี่ยนเป็นการชำระ โดยการโอนผ่านธนาคาร ซึ่งทำให้เกิดความคล่องตัว
          ลดขั้นตอนในการเดินทางมารับเช็ค และประหยัดค่าใช้จ่ายในการนำฝาก
          <br />
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;จึงขอให้ท่านช่วยส่งข้อมูลเกี่ยวกับธนาคารที่ประสงค์จะให้บริษัท
          โอนเงินค่าสินค้าและบริการให้แก่บริษัทท่าน
          โดยกรอกข้อมูลตามช่องด้านล่างนี้
          พร้อมอัพโหลดสำเนาหน้าแรกของบัญชีเงินฝาก
        </Text>
        <Text my={3} fontSize={sizeForRes} className="font-thai">
          อัตราค่าธรรมเนียมที่เกิดจากการโอน โดยจะหักจากยอดเงินที่ท่านได้รับ
          ดังนี้
        </Text>

        {/* Table */}
        <TableContainer>
          <Table variant="simple" border="1px" borderColor="gray.200">
            <Thead>
              <Tr>
                <Th fontSize={sizeForRes}>บริการ</Th>
                <Th fontSize={sizeForRes}>ยอดโอนเงิน</Th>
                <Th fontSize={sizeForRes}>อัตราค่าธรรมเนียม</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td fontSize={sizeForRes}>โอนเงินภายในธนาคารกสิกร</Td>
                <Td fontSize={sizeForRes}>ไม่เกิน 5,000,000 บาท / รายการ</Td>
                <Td fontSize={sizeForRes}>8 บาท / รายการ</Td>
              </Tr>
              <Tr>
                <Td fontSize={sizeForRes}>โอนเงินต่างธนาคารกสิกร</Td>
                <Td fontSize={sizeForRes}>สูงสุด 2,000,000 บาท / รายการ</Td>
                <Td fontSize={sizeForRes}>10 บาท / รายการ</Td>
              </Tr>
              <Tr>
                <Td fontSize={sizeForRes}>โอนเงินบาทเน็ต</Td>
                <Td fontSize={sizeForRes}>สูงสุด 10,000,000 บาท / รายการ</Td>
                <Td fontSize={sizeForRes}>
                  ขั้นต่ำ 150 บาท / รายการ <br /> สูงสุดไม่เกิน 750 บาท / รายการ
                </Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
}
