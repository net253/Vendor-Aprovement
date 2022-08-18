import React, { useState } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Icon,
  Text,
  VStack,
  Button,
} from "@chakra-ui/react";
import { FaUser, FaLock } from "react-icons/fa";
import { MdArrowForwardIos } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { updateAuth } from "../../store/slices/authSlice";

import { loginPath, resetPass } from "../../UrlPath";
import axios from "axios";

export default function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login, setLogin] = useState({ username: "", password: "" });

  const handleLogin = () => {
    if (login.username == "" || login.password == "") {
      Swal.fire({
        icon: "error",
        title: `Please type your <br /> username and password.`,
        showConfirmButton: false,
        timer: 2000,
      });
    } else {
      axios.post(loginPath, { ...login }).then(({ data }) => {
        // console.log(data);
        if (data.state) {
          dispatch(
            updateAuth({
              username: login.username,
              level: data.level,
              isLoggedIn: true,
            })
          );
          Swal.fire({
            icon: "success",
            title: "Sign in success",
            showConfirmButton: false,
            timer: 2000,
          }).then(() => navigate("/staff"));
        } else {
          Swal.fire({
            icon: "error",
            title: data.massage,
            showConfirmButton: false,
            timer: 3000,
          });
        }
      });
    }
  };

  const handleForgot = () => {
    Swal.fire({
      title: "E-mail address",
      input: "email",
      inputLabel: "รหัสผ่านใหม่จะถูกส่งไปยังอีเมลของคุณ",
      inputPlaceholder: "Enter your email address",
      showCancelButton: true,
      cancelButtonColor: "red",
    }).then(({ value }) => {
      if (value) {
        Swal.fire({
          title: `Your enter e-mail is ${value}`,
          showCancelButton: true,
          confirmButtonText: "Confirm",
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire({
              title: `<p class="font-thai">กำลังส่งรหัสผ่านใหม่ </p>(Sending new password.)`,
              html: `<p class="font-thai">กรุณารอสักครู่ (Please wait.)</p>`,
              allowEscapeKey: false,
              allowOutsideClick: false,
              didOpen: () => {
                Swal.showLoading();
              },
              timer: 8000,
            });
            axios.post(resetPass, { email: value }).then(({ data }) => {
              if (data.state) {
                Swal.fire({
                  html: `<p class="font-thai" >รหัสผ่านใหม่ถูกส่งไปยังอีเมลของคุณเรียบร้อยแล้ว กรุณาตรวจสอบอีเมล<br /> 
              <span>The new password has been successfully sent to your email. Please check your email.</span></p>`,
                  icon: "success",
                  showConfirmButton: true,
                  timer: 8000,
                });
              } else {
                Swal.fire({
                  icon: "error",
                  title: data.massage,
                  showConfirmButton: false,
                  timer: 3000,
                });
              }
            });
          }
        });
      }
    });
  };

  return (
    <Box
      borderRadius={8}
      boxShadow="lg"
      bg="white"
      py={5}
      px={8}
      w="70%"
      minW="500px"
    >
      <VStack>
        <Text fontSize="lg" className="font-thai">
          <b className="font-thai" style={{ color: "red" }}>
            พนักงานบริษัท เอส เอ็น ซี
          </b>{" "}
          กรุณาลงชื่อเข้าใช้เพื่อเริ่มใช้งาน
        </Text>
        <Text fontSize="md">
          <b style={{ color: "red" }}>SNC staff</b> please log in to start your
          session
        </Text>
      </VStack>

      <FormControl
        mt={6}
        isRequired
        p={5}
        onKeyPress={({ key }) => {
          if (key === "Enter") {
            handleLogin();
          }
        }}
      >
        {/* Username */}
        <FormLabel htmlFor="username" fontSize="xl">
          USERNAME
        </FormLabel>
        <InputGroup>
          <InputLeftElement
            pointerEvents="none"
            children={<Icon as={FaUser} />}
          />
          <Input
            id="username"
            type="text"
            variant="flushed"
            placeholder="Type your username"
            onChange={({ target: { value: username } }) =>
              setLogin({ ...login, username })
            }
          />
        </InputGroup>

        {/* Password */}
        <FormLabel htmlFor="password" mt={4} fontSize="xl">
          PASSWORD
        </FormLabel>
        <InputGroup>
          <InputLeftElement
            pointerEvents="none"
            children={<Icon as={FaLock} />}
          />
          <Input
            id="password"
            type="password"
            variant="flushed"
            placeholder="Type your password"
            onChange={({ target: { value: password } }) =>
              setLogin({ ...login, password })
            }
          />
        </InputGroup>

        {/* Button */}
        <Box
          mt={10}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Button
            rightIcon={<Icon as={MdArrowForwardIos} />}
            bgColor="#787ff6"
            color="#fff"
            variant="solid"
            w="50%"
            rounded="xl"
            size="lg"
            onClick={() => handleLogin()}
          >
            <span className="font-thai">เข้าใช้งาน </span> / Sign in
          </Button>

          <Button
            variant="link"
            rounded="md"
            size="sm"
            color="blue.400"
            onClick={() => handleForgot()}
          >
            ลืมรหัสผ่าน <br />
            Forgot password?
          </Button>
        </Box>
      </FormControl>
    </Box>
  );
}
