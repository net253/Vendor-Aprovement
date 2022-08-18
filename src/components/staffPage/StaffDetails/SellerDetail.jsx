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
} from "@chakra-ui/react";

export default function SellerDetail({ company, seller, setSeller }) {
  const [checked, setChecked] = useState([]);

  const inputFill = [
    {
      head: "ชื่อบริษัท / Company Name",
      value: `${company.thaiCompany} / ${company.engCompany}`,
    },
    {
      head: "ที่อยู่ / Address",
      value: `${company.thaiAddress} / ${company.engAddress}`,
    },
    {
      head: "โทรศัพท์ / Tel No.",
      value: company.tel,
    },
    {
      head: "แฟกซ์ / Fax No.",
      value: company.fax,
    },
    {
      head: "อีเมล / E-mail",
      value: company.companyWeb,
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

  const handleCheck = (event) => {
    var chk = [...checked];
    if (event.target.checked) {
      chk = [...checked, event.target.value];
    } else {
      chk.splice(checked.indexOf(event.target.value), 1);
    }
    setChecked(chk);
    setSeller({ ...seller, chk });
  };

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
                <Checkbox size="sm" value={info} onChange={handleCheck}>
                  <Text className="font-thai">{info}</Text>
                </Checkbox>
              </GridItem>
            ))}
            <GridItem colSpan={2} display="flex">
              <Input
                variant="filled"
                size="sm"
                isDisabled={!seller.chk.find((info) => info == "Other")}
                onChange={({ target: { value: other } }) =>
                  setSeller({ ...seller, other })
                }
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
          <Box key={i} display="flex" alignItems="center" gap={3} mb={2}>
            <Text fontSize="sm">{i + 1}.</Text>
            <Input
              key={i}
              variant="filled"
              size="sm"
              name={`product${i + 1}`}
              onChange={({ target: { value: product, name: name } }) =>
                setSeller({ ...seller, [name]: product })
              }
            />
          </Box>
        ))}
    </>
  );
}
