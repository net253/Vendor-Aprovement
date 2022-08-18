import React from "react";
import {
  Box,
  Grid,
  GridItem,
  Text,
  Input,
  Textarea,
  HStack,
  VStack,
  Checkbox,
  Divider,
  Image,
} from "@chakra-ui/react";
import logo from "../img/logo.png";

export const PdfVendor = React.forwardRef((props, ref) => {
  const { datetime, contactParson, companyDetails, stdCertificate, userName } =
    props.modalInfo;

  const handleChk = (info) => {
    const data = stdCertificate[0].certificate.find((chk) => chk == info);
    return data == info;
  };

  const handleChkYN = (choice, text) => {
    if (text == "moq") {
      return stdCertificate[0].moq == choice;
    } else {
      return stdCertificate[0].stdPacking == choice;
    }
  };

  const companyInput = [
    {
      head: "ชื่อบริษัท (ภาษาอังกฤษ) / Company name (English)",
      value: companyDetails[0].engCompany,
    },
    {
      head: "ชื่อบริษัท (ภาษาไทย) / Company name (Thai)",
      value: companyDetails[0].thaiCompany,
    },
    {
      head: "ประเภทของกิจการ / Nature of Business",
      value: companyDetails[0].natureBusiness,
    },
    {
      head: "ที่อยู่ (ภาษาอังกฤษ) / Address (English)",
      value: companyDetails[0].engAddress,
    },
    {
      head: "ที่อยู่ (ภาษาไทย) / Address (Thai)",
      value: companyDetails[0].thaiAddress,
    },
  ];

  const TelInput = [
    { head: "โทรศัพท์ / Tel No.", value: companyDetails[0].tel },
    { head: "แฟกซ์ / Fax No.", value: companyDetails[0].fax },
    { head: "อีเมล / E-mail", value: contactParson[0].sale[0].email },
  ];

  const contactInput = [
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
  return (
    <>
      <Box ref={ref} h="100vh" px={1}>
        <div className="pageFooter mt-1">Page 1 of 1</div>

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

        {/* Attention */}
        <Grid templateColumns="repeat(4,1fr)" fontSize="sm" gap={2} my={3}>
          <GridItem colSpan={4}>
            <Text
              fontWeight="bold"
              textDecorationLine="underline"
              textAlign="center"
              className="font-thai"
            >
              Vendor Registration Sheet
            </Text>
          </GridItem>
          {[
            "เรียน / Attention :",
            "กรรมการรองประธานบริหาร",
            "เบอร์แฟกซ์ / Fax No. :",
            "XXX-XXXXXXX",
          ].map((text, i) => (
            <GridItem
              key={i}
              w="100%"
              textAlign="end"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Text
                className="font-thai"
                fontWeight={`${i % 2 != 0 ? "" : "semibold"}`}
              >
                {text}
              </Text>
            </GridItem>
          ))}
        </Grid>

        <Divider border="1px" />

        {/* Company */}
        <Grid templateColumns="repeat(5,1fr)" fontSize="small" gap={2} mt={3}>
          {companyInput.map((text, i) => (
            <React.Fragment key={i}>
              <GridItem className="font-thai" colSpan={2}>
                {text.head}
              </GridItem>
              <GridItem colSpan={3}>
                {i > 2 ? (
                  <Textarea
                    variant="filled"
                    value={text.value}
                    size="xs"
                    rows={2}
                    readOnly
                  />
                ) : (
                  <Input
                    variant="filled"
                    value={text.value}
                    readOnly
                    size="xs"
                  />
                )}
              </GridItem>
            </React.Fragment>
          ))}
        </Grid>

        {/* Tel */}
        <Grid templateColumns="repeat(6,1fr)" fontSize="small" gap={2} my={3}>
          {TelInput.map((text, i) => (
            <React.Fragment key={i}>
              {i == 1 ? (
                <GridItem className="font-thai" textAlign="end" pr={3}>
                  {text.head}
                </GridItem>
              ) : (
                <GridItem className="font-thai">{text.head}</GridItem>
              )}
              <GridItem colSpan={2}>
                <Input variant="filled" value={text.value} size="xs" readOnly />
              </GridItem>
            </React.Fragment>
          ))}
        </Grid>

        {/* Person */}
        <Grid
          templateColumns="repeat(4, 1fr)"
          gap={1}
          alignItems="center"
          fontSize="small"
        >
          <GridItem w="100%" colSpan={4}>
            <Text className="font-thai" fontWeight="semibold">
              บุคคลติดต่อ / Contact Person
            </Text>
          </GridItem>
          {contactInput.map((info, i) => (
            <React.Fragment key={i}>
              <GridItem w="100%">
                <Text className="font-thai">{info.head}</Text>
              </GridItem>
              <GridItem w="100%" colSpan={3}>
                <Input readOnly value={info.name} variant="filled" size="xs" />
              </GridItem>
              <GridItem>
                <Text className="font-thai">โทรศัพท์ / Tel No.</Text>
              </GridItem>
              <GridItem w="100%">
                <Input readOnly value={info.tel} variant="filled" size="xs" />
              </GridItem>
              <GridItem>
                <Text className="font-thai" textAlign="end" pr={3}>
                  อีเมล / E-mail
                </Text>
              </GridItem>
              <GridItem w="100%">
                <Input readOnly value={info.email} variant="filled" size="xs" />
              </GridItem>
            </React.Fragment>
          ))}
        </Grid>

        {/* Certaficate */}
        <Grid
          templateColumns="repeat(3, 1fr)"
          alignItems="center"
          fontSize="small"
          gap={2}
          my={3}
        >
          <GridItem w="100%" colSpan={3}>
            <Text className="font-thai" fontWeight="semibold">
              1. การรับรองที่ได้รับ / Kind of certificate approved
            </Text>
          </GridItem>
          <GridItem w="100%" colSpan={3}>
            <Grid templateColumns="repeat(5,1fr)" gap={3}>
              {chkText.map((info, i) => (
                <GridItem
                  w="100%"
                  key={i}
                  display="flex"
                  colSpan={i == 8 ? 2 : 1}
                >
                  <Checkbox size="sm" isChecked={handleChk(info)}>
                    <Text className="font-thai" fontSize="smaller">
                      {info}
                    </Text>
                  </Checkbox>
                  {i == 8 &&
                  stdCertificate[0].certificate.find(
                    (chk) => chk == "Other"
                  ) ? (
                    <Input
                      value={
                        stdCertificate[0].certificate[
                          stdCertificate[0].certificate.length - 1
                        ]
                      }
                      readOnly
                      variant="filled"
                      size="xs"
                      pl={4}
                    />
                  ) : (
                    ""
                  )}
                </GridItem>
              ))}
            </Grid>
          </GridItem>
        </Grid>

        {/* Payment */}
        <Grid templateColumns="repeat(4, 1fr)" fontSize="small" gap={1} my={3}>
          <GridItem w="100%" colSpan={4}>
            <Text className="font-thai" fontWeight="semibold">
              2. เงื่อนไขการชำระเงิน / Term of payment
            </Text>
          </GridItem>
          <GridItem w="100%" colSpan={4}>
            <Textarea
              variant="filled"
              value={stdCertificate[0].payment[0]}
              readOnly
              size="xs"
              rows={2}
            />
          </GridItem>
          <GridItem>
            <Text className="font-thai">วงเงินอนุมัติ</Text>
          </GridItem>
          <GridItem colSpan={2}>
            <Input
              variant="filled"
              value={stdCertificate[0].payment[1]}
              readOnly
              size="xs"
            />
          </GridItem>
          <GridItem>
            <Input
              variant="filled"
              value={stdCertificate[0].payment[2]}
              readOnly
              size="xs"
            />
          </GridItem>
        </Grid>

        {/* Pack */}
        <Grid templateColumns="repeat(4, 1fr)" fontSize="small" gap={1} my={5}>
          <GridItem w="100%" colSpan={2}>
            <Text className="font-thai" fontWeight="semibold">
              3. คุณมีมาตรฐานการบรรจุหรือไม่ / Do you have standard packing?
            </Text>
          </GridItem>
          <GridItem>
            <Checkbox size="sm" isChecked={handleChkYN("No", "stdPacking")}>
              <Text className="font-thai" fontSize="smaller">
                ไม่มี / No
              </Text>
            </Checkbox>
          </GridItem>
          <GridItem>
            <Checkbox size="sm" isChecked={handleChkYN("Yes", "stdPacking")}>
              <Text className="font-thai" fontSize="smaller">
                มี / Yes
              </Text>
            </Checkbox>
          </GridItem>
        </Grid>

        {/* MOQ */}
        <Grid templateColumns="repeat(4, 1fr)" fontSize="small" gap={1} my={5}>
          <GridItem w="100%" colSpan={2}>
            <Text className="font-thai" fontWeight="semibold">
              4. คุณมีจำนวนการสั่งซื้อขั้นต่ำหรือไม่ / Do you have MOQ?
            </Text>
          </GridItem>
          <GridItem>
            <Checkbox size="sm" isChecked={handleChkYN("No", "moq")}>
              <Text className="font-thai" fontSize="smaller">
                ไม่มี / No
              </Text>
            </Checkbox>
          </GridItem>
          <GridItem>
            <Checkbox size="sm" isChecked={handleChkYN("Yes", "moq")}>
              <Text className="font-thai" fontSize="smaller">
                มี / Yes
              </Text>
            </Checkbox>
          </GridItem>
        </Grid>

        <Divider border="1px" my={5} />

        {/* Footer */}
        <Grid
          templateColumns="repeat(2, 1fr)"
          fontSize="small"
          gap={2}
          h="100px"
          mb={9}
        >
          {/* Sign */}
          <GridItem borderRight="1px" px={5} mt={2}>
            <VStack textAlign="center">
              <Input
                textAlign="center"
                value={userName}
                readOnly
                variant="filled"
              />
              <Text className="font-thai" fontWeight="semibold">
                ผู้ให้ข้อมูล / Informant
              </Text>
              <Text className="font-thai">วันที่ / Date : {datetime}</Text>
            </VStack>
          </GridItem>

          {/* Number  */}
          <GridItem px={5}>
            <Grid
              templateColumns="repeat(3, 1fr)"
              fontSize="small"
              gap={2}
              alignItems="center"
            >
              {["Register date:", "Supplier code:", "Buyers:"].map(
                (text, i) => (
                  <React.Fragment key={i}>
                    <GridItem>
                      <Text>{text}</Text>
                    </GridItem>
                    <GridItem colSpan={2}>
                      <Input defaultValue="" size="sm" variant="filled" />
                    </GridItem>
                  </React.Fragment>
                )
              )}
            </Grid>
          </GridItem>
        </Grid>
      </Box>
    </>
  );
});
