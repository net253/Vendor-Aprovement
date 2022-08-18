import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
  Icon,
  InputRightElement,
  InputGroup,
  Text,
} from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import Swal from "sweetalert2";

import axios from "axios";
import { changePass } from "../../UrlPath";

export default function PasswordModal({ isOpen, onClose }) {
  const [password, setPassword] = useState({
    oldPassword: "",
    newPassword: "",
  });
  const [verify, setVerify] = useState("");
  const [show, setShow] = useState(false);

  const handleClick = () => setShow(!show);

  const handleClose = () => {
    onClose();
    setPassword({ ...password, oldPassword: "", newPassword: "" });
    setVerify("");
  };

  const handleChange = () => {
    Swal.fire({
      icon: "warning",
      title: `<p class="font-thai">ยืนยันการเปลี่ยนรหัสผ่าน <span>/ Confirm change password?</span></p>`,
      showCancelButton: true,
      confirmButtonText: `<p class="font-thai">ใช่ / <span>Yes</span></p>`,
      cancelButtonText: `<p class="font-thai">ไม่ใช่ / <span>No</span></p>`,
      confirmButtonColor: "#1ca7ec",
      customClass: {
        container: "my-swal",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        axios.post(changePass, { ...password }).then(({ data }) => {
          console.log(data);
          handleClose();
          if (data.state) {
            Swal.fire({
              icon: "success",
              title: `<p class="font-thai">เปลี่ยนรหัสผ่านสำเร็จ <span>/ Password has been change.</span></p>`,
              showConfirmButton: false,
              timer: 5000,
            });
          } else {
            Swal.fire({
              icon: "error",
              title: data.massage,
              showConfirmButton: false,
              timer: 5000,
            });
          }
        });
      }
    });
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader className="font-thai">
            เปลี่ยนรหัสผ่าน / <span>Change password</span>
          </ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            <Text className="font-thai">รหัสผ่านเดิม / Password</Text>
            <Input
              placeholder="Password"
              type="password"
              onChange={({ target: { value: oldPassword } }) => {
                setPassword({ ...password, oldPassword });
              }}
            />

            <Text mt={4} className="font-thai">
              รหัสผ่านใหม่ / New password
            </Text>
            <InputGroup>
              <Input
                variant="filled"
                placeholder="New password"
                type={show ? "text" : "password"}
                onChange={({ target: { value: newPassword } }) => {
                  setPassword({ ...password, newPassword });
                }}
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={handleClick}>
                  {show ? (
                    <Icon as={IoMdEyeOff} w={5} h={5} />
                  ) : (
                    <Icon as={IoMdEye} w={5} h={5} />
                  )}
                </Button>
              </InputRightElement>
            </InputGroup>

            <Text mt={4} className="font-thai">
              ยืนยันรหัสผ่าน / Verify new password
            </Text>
            <InputGroup>
              <Input
                variant="filled"
                placeholder="Verify new password"
                type={show ? "text" : "password"}
                onChange={({ target: { value: verifyPassword } }) => {
                  setVerify(verifyPassword);
                }}
              />
              <InputRightElement
                children={
                  verify != "" && verify == password.newPassword ? (
                    <CheckIcon color="green.500" />
                  ) : (
                    ""
                  )
                }
              />
            </InputGroup>
          </ModalBody>

          {/* Button */}
          <ModalFooter className="font-thai">
            <Button
              colorScheme="green"
              mr={3}
              w="30%"
              rounded="full"
              onClick={() => handleChange()}
              disabled={verify == "" || verify != password.newPassword}
            >
              ยืนยัน / Confirm
            </Button>
            <Button
              colorScheme="red"
              w="30%"
              rounded="full"
              onClick={() => handleClose()}
            >
              ยกเลิก / Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
