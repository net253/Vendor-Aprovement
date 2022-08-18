import React from "react";
import { Text, Box, Icon } from "@chakra-ui/react";
import { AiOutlineCopyright } from "react-icons/ai";

export default function Footer() {
  return (
    <Box display="flex " justifyContent="space-between" px={3}>
      <Box display="flex" h="2vh" fontSize="small" alignItems="center">
        <Text>Copyright</Text>
        <Icon as={AiOutlineCopyright} mx={1} />
        <Text>2022.</Text>
        <Box mx={3} display="flex" alignItems="center">
          <Text>SNC Pyongsan Evolution Co., Ltd</Text>
        </Box>
      </Box>
      <Text fontSize="small">IIoT-Team</Text>
    </Box>
  );
}
