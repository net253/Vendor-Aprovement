import React from "react";
import {
  Box,
  Text,
  Grid,
  GridItem,
  Divider,
  HStack,
  Icon,
} from "@chakra-ui/react";
import {
  MdAccessTimeFilled,
  MdCheckCircle,
  MdPauseCircle,
} from "react-icons/md";

export default function Timeline({ history, modalInfo, auth }) {
  const { approved, status, approvalLine } = modalInfo;

  const Indicator = (i) => {
    if (history[i]) {
      if (history[i]?.name == approved[i]) {
        return (
          <Box color="green" display="flex" justifyContent="center">
            <Icon as={MdCheckCircle} />
            <Text pl={1} fontSize="sm">
              Completed
            </Text>
          </Box>
        );
      } else if (status == "hold") {
        return (
          <Box color="red" display="flex" justifyContent="center">
            <Icon as={MdPauseCircle} />
            <Text pl={1} fontSize="sm">
              Hold
            </Text>
          </Box>
        );
      }
    } else {
      return (
        <Box color="yellowgreen" display="flex" justifyContent="center">
          <Icon as={MdAccessTimeFilled} />
          <Text pl={1} fontSize="sm">
            Incompleted
          </Text>
        </Box>
      );
    }
  };

  return (
    <>
      <Box mt={8} px={1}>
        <Text fontSize="lg" fontWeight="bold">
          Timeline
        </Text>
        <Divider border="1px" borderColor="blackAlpha.500" mb={5} />

        <Grid templateColumns={`repeat(${approvalLine.length},1fr)`}>
          {Array(approvalLine.length)
            .fill(0)
            .map((_, i) => (
              <GridItem
                key={i}
                border="1px"
                rounded="full"
                mx={2}
                textAlign="center"
              >
                <Text fontWeight="medium">{approvalLine[i]}</Text>
                {Indicator(i)}
              </GridItem>
            ))}
        </Grid>
      </Box>
    </>
  );
}
