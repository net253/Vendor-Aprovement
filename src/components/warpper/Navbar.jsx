import React from "react";
import {
  Text,
  Icon,
  Button,
  Box,
  Spacer,
  useDisclosure,
  Image,
} from "@chakra-ui/react";
import { MdArrowForwardIos, MdOutlineLock } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import PasswordModal from "./PasswordModal";
import logo from "../img/logo.png";

import axios from "axios";
import { logoutPath } from "../../UrlPath";

export default function Navbar({ page: Page }) {
  const navigate = useNavigate();
  const linkPage = () => navigate("/");
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleSignIn = () => {
    Swal.fire({
      icon: "warning",
      title: `${Page ? "ลงชื่อเข้าใช้ / Sign in" : "Sign out"}`,
      showCancelButton: true,
      confirmButtonText: `<p class="font-thai">ใช่ / <span>Yes</span></p>`,
      cancelButtonText: `<p class="font-thai">ไม่ใช่ / <span>No</span></p>`,
      confirmButtonColor: "#1ca7ec",
    }).then((result) => {
      if (result.isConfirmed) {
        if (Page) {
          linkPage();
        } else {
          axios.post(logoutPath).then(({ data }) => {
            // console.log(data);
            if (data.state) {
              linkPage();
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
      }
    });
  };

  return (
    <>
      <Box
        h="5vh"
        px={2}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Image
          // src={logo}
          srcSet={logo}
          w={{ md: "5vw", base: "8vw", lg: "4vw" }}
          fallbackSrc="./assets/logo.d5523e24.png"
        />

        <Spacer />
        {Page ? (
          ""
        ) : (
          <Button
            variant="ghost"
            rounded="full"
            size="sm"
            rightIcon={<Icon as={MdOutlineLock} />}
            onClick={onOpen}
          >
            Change password
          </Button>
        )}
        <Button
          variant="ghost"
          rounded="full"
          size="sm"
          rightIcon={<Icon as={MdArrowForwardIos} />}
          onClick={() => handleSignIn()}
        >
          {Page ? "Sign in" : "Sign out"}
        </Button>
      </Box>

      <PasswordModal isOpen={isOpen} onClose={onClose} />
    </>
  );
}
