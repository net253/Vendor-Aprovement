import React from "react";
import { Text, Grid, GridItem, Input, Divider } from "@chakra-ui/react";

export default function Person({ modalInfo }) {
  const { companyRegister, companyDetails, contactParson } = modalInfo;

  if (!companyRegister || !companyDetails || !contactParson) {
    return <div />;
  } else {
    const inputFill = [
      {
        head: "บริษัท / Company",
        value: companyRegister,
      },
      {
        head: "เรียน / Attention",
        value: "กรรมการรองประธานบริหาร",
      },
      {
        head: "เบอร์แฟกซ์ / Fax No.",
        value: "XXX-XXXXXXX",
      },
      {
        head: "ชื่อบริษัท / Company Name",
        value: `${companyDetails[0].thaiCompany} / ${companyDetails[0].engCompany}`,
      },
      {
        head: "เว็บไซต์ / Website",
        value: companyDetails[0].companyWeb,
      },
    ];

    const inputContact = [
      {
        head: "งานขาย / Sales",
        name: contactParson[0].sale[0].name,
        tel: contactParson[0].sale[0].tel,
        email: contactParson[0].sale[0].email,
      },
      {
        head: "ผู้จัดการฝ่ายขาย / Sales Manager",
        name: contactParson[0].saleManager[0].name,
        tel: contactParson[0].saleManager[0].tel,
        email: contactParson[0].saleManager[0].email,
      },
      {
        head: "งานส่วนอื่นๆ / Others",
        name: contactParson[0].other[0].name,
        tel: contactParson[0].other[0].tel,
        email: contactParson[0].other[0].email,
      },
    ];

    return (
      <>
        <Grid
          templateColumns="repeat(3, 1fr)"
          gap={1}
          alignItems="center"
          fontSize="sm"
        >
          {inputFill.map((info, i) => (
            <React.Fragment key={i}>
              <GridItem w="100%">
                <Text className="font-thai">{info.head}</Text>
              </GridItem>
              <GridItem w="100%" colSpan={2}>
                <Input
                  value={info.value}
                  variant="flushed"
                  size="sm"
                  readOnly
                />
              </GridItem>
            </React.Fragment>
          ))}
        </Grid>

        <Grid templateColumns="repeat(4, 1fr)" gap={1} alignItems="center">
          <GridItem w="100%" colSpan={4}>
            <Divider my={3} border="1px" borderColor="blackAlpha.400" />
            <Text className="font-thai" fontWeight="bold" fontSize="md">
              บุคคลติดต่อ / Contact Person
            </Text>
          </GridItem>
          {inputContact.map((info, i) => (
            <React.Fragment key={i}>
              <GridItem w="100%" fontWeight="semibold">
                <Text className="font-thai">{info.head}</Text>
              </GridItem>
              <GridItem w="100%" colSpan={3}>
                <Input value={info.name} variant="flushed" size="sm" readOnly />
              </GridItem>
              <GridItem>
                <Text className="font-thai">โทรศัพท์ / Tel No.</Text>
              </GridItem>
              <GridItem w="100%">
                <Input value={info.tel} variant="flushed" size="sm" readOnly />
              </GridItem>
              <GridItem>
                <Text className="font-thai" textAlign="end" pr={3}>
                  อีเมล / E-mail
                </Text>
              </GridItem>
              <GridItem w="100%">
                <Input
                  value={info.email}
                  variant="flushed"
                  size="sm"
                  readOnly
                />
              </GridItem>
            </React.Fragment>
          ))}
        </Grid>
      </>
    );
  }
}
