import React from "react";
import {
  Grid,
  GridItem,
  Text,
  Box,
  Button,
  Spacer,
  Icon,
  Image,
} from "@chakra-ui/react";
import LoginForm from "../components/LoginPage/LoginForm";
import Footer from "../components/warpper/Footer";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import logo from "../components/img/logo.png";

export default function Login() {
  const navigate = useNavigate();
  const handleVendor = () => {
    navigate("/vendor");
  };
  return (
    <>
      <Box bg="#f2f2f2" height="100vh" overflow="auto">
        <Grid
          templateColumns="repeat(2, 1fr)"
          gap={6}
          me={10}
          height="97vh"
          w="90vw"
        >
          {/* For Vendor */}
          <GridItem
            w="100%"
            alignItems="center"
            justifyContent="end"
            h="100%"
            display="flex"
          >
            <Box
              me={10}
              pe={10}
              pb={12}
              borderRight="4px"
              minH="45vh"
              alignItems="center"
              display="flex"
              flexDirection="column"
            >
              <Image
                // src={logo}
                w={{ md: "25vw", base: "50vw" }}
                srcSet={logo}
                fallbackSrc="./assets/logo.d5523e24.png"
              />

              <Spacer />
              <Button
                leftIcon={<Icon as={MdOutlineArrowBackIosNew} />}
                bgColor="#7bd5f5"
                size="lg"
                variant="solid"
                rounded="xl"
                mt={10}
                onClick={() => handleVendor()}
              >
                <span className="font-thai"> สำหรับผู้ขาย</span> / For vendor
              </Button>
              <Text className="font-thai" pt={2} fontSize="sm" color="gray.500">
                หมายเหตุ: ไม่ต้องลงชื่อเข้าใช้
              </Text>
            </Box>
          </GridItem>

          {/* For Staff */}
          <GridItem w="100%" alignItems="center" h="100%" display="flex">
            <LoginForm />
          </GridItem>
        </Grid>
        <Footer />
      </Box>
    </>
  );
}
