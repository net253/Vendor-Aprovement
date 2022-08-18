import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Text, Grid, GridItem, Box } from "@chakra-ui/react";
import { FormStaff, VendorTable } from "../components/staffPage";
import { useNavigate } from "react-router-dom";
import { updateAuth } from "../store/slices/authSlice";
import { authPath } from "../UrlPath";
import axios from "axios";

export default function Staff() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const show = useSelector((state) => state.show);
  const auth = useSelector((state) => state.auth);

  const handleLogin = () => {
    axios.get(authPath).then(({ data }) => {
      // console.log(data);
      dispatch(
        updateAuth({
          username: data.username,
          position: data.position,
          isLoggedIn: true,
        })
      );
      if (!data.state) {
        navigate("/");
      }
    });
  };

  useEffect(() => {
    const initPage = setTimeout(() => {
      handleLogin();
    }, 100);
    const interval = setInterval(() => {
      handleLogin();
    }, 8000);

    return () => {
      clearTimeout(initPage);
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      <Grid
        templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)" }}
        gap={2}
        fontSize={{ base: "sm", sm: "md" }}
      >
        <GridItem
          w="100%"
          pr={2}
          borderRight="2px"
          borderColor="blackAlpha.600"
        >
          <Text fontSize="xl" fontWeight="bold">
            Vendor
          </Text>
          <VendorTable />
        </GridItem>

        <GridItem w="100%">
          <Text fontSize="xl" fontWeight="bold" className="font-thai" pt={2}>
            แบบฟอร์มคัดเลือกผู้ขาย
          </Text>
          <Box h="85vh" w={{ base: "100vw", lg: "48vw" }} overflow="auto">
            {show ? (
              <FormStaff auth={auth} />
            ) : (
              <Box
                h="83vh"
                display="flex"
                alignItems="center"
                justifyContent="center"
                fontSize="xl"
                fontWeight="bold"
              >
                <Text textAlign="center" className="font-thai">
                  กรุณาคลิกเลือก Vendor ในตารางด้านซ้าย <br />
                  เพื่อประเมินแบบฟอร์มคัดเลือกผู้ขาย
                </Text>
              </Box>
            )}
          </Box>
        </GridItem>
      </Grid>
    </>
  );
}
