import React from "react";
import { Text, Grid, GridItem, VStack, Input, Divider } from "@chakra-ui/react";

export default function Bank({ edit, modalInfo }) {
  const { bankAccount } = modalInfo;
  if (!bankAccount) {
    return <div />;
  } else {
    return (
      <>
        <Grid templateColumns="repeat(3, 1fr)" gap={2} alignItems="center">
          <GridItem w="100%" colSpan={3}>
            <Divider my={3} border="1px" borderColor="blackAlpha.400" />
            <Text className="font-thai" fontWeight="bold" fontSize="md">
              ข้อมูลบัญชีธนาคาร / Bank Account Information
            </Text>
          </GridItem>

          <GridItem w="100%">
            <Text className="font-thai">ชื่อบัญชี / Account name</Text>
          </GridItem>
          <GridItem w="100%" colSpan={2}>
            <Input
              variant="filled"
              placeholder="Account name"
              size="sm"
              value={bankAccount[0].accountName}
              readOnly
            />
          </GridItem>

          <GridItem w="100%">
            <Text className="font-thai">เลขบัญชี / Account No.</Text>
          </GridItem>
          <GridItem w="100%" colSpan={2}>
            <Input
              variant="filled"
              placeholder="กรุณาระบุตัวเลขเท่านั้น / Please enter numbers only."
              size="sm"
              value={bankAccount[0].accountNo}
              readOnly
            />
          </GridItem>

          <GridItem w="100%">
            <Text className="font-thai">ธนาคาร / Bank</Text>
          </GridItem>
          <GridItem w="100%" colSpan={2}>
            <Input
              variant="filled"
              size="sm"
              value={
                bankAccount[0].bank != "อื่นๆ / Others"
                  ? bankAccount[0].bank
                  : bankAccount[0].otherBank
              }
              // value={`${bankAccount[0].bank} :  ${bankAccount[0].otherBank}`}
              readOnly
            />
          </GridItem>

          <GridItem w="100%">
            <Text className="font-thai">สาขา / Branch</Text>
          </GridItem>
          <GridItem w="100%" colSpan={2}>
            <Input
              variant="filled"
              size="sm"
              value={bankAccount[0].branch}
              readOnly
            />
          </GridItem>

          <GridItem w="100%">
            <Text className="font-thai">ชื่อผู้ติดต่อ / Contact Person</Text>
          </GridItem>
          <GridItem w="100%" colSpan={2}>
            <Input
              variant="filled"
              placeholder="กรุณาระบุคำนำหน้า / Please specify name title"
              size="sm"
              value={bankAccount[0].contact}
              readOnly
            />
          </GridItem>

          <GridItem w="100%">
            <Text className="font-thai">เบอร์โทรศัพท์ / Tel No.</Text>
          </GridItem>
          <GridItem w="100%" colSpan={2}>
            <Input
              variant="filled"
              size="sm"
              type="number"
              value={bankAccount[0].tel}
              readOnly
            />
          </GridItem>

          <GridItem w="100%">
            <Text className="font-thai">อีเมล / E-mail</Text>
          </GridItem>
          <GridItem w="100%" colSpan={2}>
            <Input
              variant="filled"
              size="sm"
              type="email"
              value={bankAccount[0].email}
              readOnly
            />
          </GridItem>
        </Grid>
      </>
    );
  }
}
