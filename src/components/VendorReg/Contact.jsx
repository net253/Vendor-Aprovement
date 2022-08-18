import React from "react";
import {
  Text,
  Grid,
  GridItem,
  HStack,
  Input,
  Spacer,
  Divider,
  useBreakpoint,
  InputRightElement,
  InputGroup,
} from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";

const textInput = [
  { thai: "งานขาย", eng: "Sales" },
  { thai: "ผู้จัดการฝ่ายขาย", eng: "Manager" },
  { thai: "งานส่วนอื่นๆ", eng: "Others" },
];

export default function Contact({ setContact, contact }) {
  const lineShow = useBreakpoint();

  const handleChange = (info) => {
    setContact({
      ...contact,
      [info.target.name]: info.target.value,
    });
  };

  let verify = [false, false, false, false, false, false];
  const {
    salesEmail,
    salesVEmail,
    salesTel,
    salesVTel,
    managerEmail,
    managerVEmail,
    managerTel,
    managerVTel,
    othersEmail,
    othersVEmail,
    othersTel,
    othersVTel,
  } = contact;
  const handleVerify = (info, ver) => info == ver;

  if (salesEmail) {
    verify[0] = handleVerify(salesEmail, salesVEmail);
  }
  if (managerEmail) {
    verify[1] = handleVerify(managerEmail, managerVEmail);
  }
  if (othersEmail) {
    verify[2] = handleVerify(othersEmail, othersVEmail);
  }
  if (salesTel) {
    verify[3] = handleVerify(salesTel, salesVTel);
  }
  if (managerTel) {
    verify[4] = handleVerify(managerTel, managerVTel);
  }
  if (othersTel) {
    verify[5] = handleVerify(othersTel, othersVTel);
  }

  return (
    <>
      <HStack mt={5}>
        <Text
          className="font-thai"
          fontWeight="bold"
          fontSize={{ base: "sm", sm: "xl" }}
        >
          บุคคลติดต่อ / <span>Contact Person</span>
        </Text>
        <Spacer />
        <Text fontWeight="light" fontSize="sm">
          Step 2 of 5
        </Text>
      </HStack>

      <Grid
        templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(3, 1fr)" }}
        gap={4}
        alignItems="center"
        borderTop="2px"
        borderColor="blackAlpha.600"
        py={3}
        my={1}
        fontSize={{ base: "sm", sm: "md" }}
      >
        {textInput.map((info, i) => (
          <React.Fragment key={i}>
            {/* Name */}
            <GridItem w="100%">
              {lineShow == "base" && i > 0 ? <Divider mb={3} /> : ""}
              {i == 1 ? (
                <Text className="font-thai" fontWeight="bold">
                  {info.thai} / Sales Manager
                </Text>
              ) : (
                <Text className="font-thai" fontWeight="bold">
                  {info.thai} / {info.eng}
                </Text>
              )}
              <Input
                placeholder={`${info.eng}`}
                size="sm"
                name={`${info.eng.toLowerCase()}Name`}
                onChange={handleChange}
              />
            </GridItem>

            {/* email */}
            <GridItem w="100%">
              <Text className="font-thai">อีเมล / E-mail</Text>
              <Input
                placeholder="E-mail"
                type="email"
                size="sm"
                name={`${info.eng.toLowerCase()}Email`}
                onChange={handleChange}
              />
              <InputGroup>
                <Input
                  placeholder="ยืนยันอีเมล / Verify E-mail"
                  type="email"
                  size="sm"
                  mt={2}
                  name={`${info.eng.toLowerCase()}VEmail`}
                  onChange={handleChange}
                />
                <InputRightElement
                  children={verify[i] ? <CheckIcon color="green.500" /> : ""}
                />
              </InputGroup>
            </GridItem>

            {/* Tel */}
            <GridItem w="100%">
              <Text className="font-thai">เบอร์ติดต่อ / Ext. No.</Text>
              <Input
                placeholder="Ext. No."
                type="text"
                size="sm"
                name={`${info.eng.toLowerCase()}Tel`}
                onChange={handleChange}
                maxLength={10}
              />
              <InputGroup>
                <Input
                  placeholder="ยืนยันเบอร์ติดต่อ / Verify Ext. No."
                  type="text"
                  size="sm"
                  mt={2}
                  name={`${info.eng.toLowerCase()}VTel`}
                  onChange={handleChange}
                  maxLength={10}
                />
                <InputRightElement
                  children={
                    verify[i + 3] ? <CheckIcon color="green.500" /> : ""
                  }
                />
              </InputGroup>
            </GridItem>
          </React.Fragment>
        ))}
      </Grid>
    </>
  );
}
