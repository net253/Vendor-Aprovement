import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Tabs,
  TabList,
  Tab,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Icon,
  HStack,
  Text,
  useDisclosure,
  SkeletonText,
  Box,
} from "@chakra-ui/react";
import {
  MdAccessTimeFilled,
  MdCheckCircle,
  MdPauseCircle,
} from "react-icons/md";

import ModalVendor from "./ModalVendor";
import { updateShow } from "../../store/slices/showSlice";
import { updateModalInfo } from "../../store/slices/modalSlice";
import { updateSign } from "../../store/slices/signSlice";
import { overallPath, historyPath, considerPath } from "../../UrlPath";
import axios from "axios";
import Swal from "sweetalert2";

export default function VendorTable() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modalShow, setModalShow] = useState(false);
  const [filter, setFilter] = useState("");
  const [tableInfo, setTableInfo] = useState();

  const handleModal = (info) => {
    axios
      .post(considerPath, { number: info.number })
      .then(({ data: { results } }) => {
        dispatch(updateModalInfo(results));
        Swal.close();

        setModalShow(true);
        onOpen();
      });

    Swal.fire({
      title: `<p class="font-thai">กำลังโหลดข้อมูล </p>loading information.`,
      html: `<p class="font-thai">กรุณารอสักครู่ อาจใช้เวลา 1-2 นาที<span>(Please wait.)</span> </p>`,
      allowEscapeKey: false,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    axios
      .post(historyPath, { number: info.number })
      .then(({ data: { results } }) => {
        dispatch(updateSign(results));
      });
  };

  const getShow = () => {
    dispatch(updateShow(modalShow));
  };

  const getOverall = () => {
    axios.post(overallPath, { filter }).then(({ data: { results } }) => {
      if (results) {
        setTableInfo(results);
      } else {
        setTableInfo([]);
      }
    });
  };

  const dateForm = (datetime) => {
    const arr = datetime.split(" ").slice(0, -1).join("");
    const date = arr.split("-").reverse().join("/");
    return date;
  };

  useEffect(() => {
    const initPage = setTimeout(() => {
      getShow();
      getOverall();
    }, 100);

    const interval = setInterval(() => {
      getOverall();
    }, 6000);

    return () => {
      clearTimeout(initPage);
      clearInterval(interval);
    };
  }, [modalShow, filter, auth]);

  if (!tableInfo) {
    return (
      <>
        <Box padding="6">
          <Text fontWeight="bold" className="blink">
            Loading Table...
          </Text>
          <SkeletonText mt="4" noOfLines={10} spacing="4" />
        </Box>
      </>
    );
  }

  return (
    <>
      <Tabs variant="enclosed" size="sm" isFitted>
        <TabList className="font-thai">
          <Tab onClick={() => setFilter()}>ทั้งหมด</Tab>
          <Tab onClick={() => setFilter("pending")}>ดำเนินการ</Tab>
          <Tab onClick={() => setFilter("approved")}> สำเร็จ</Tab>
          <Tab onClick={() => setFilter("hold")}>รอพิจารณา</Tab>
        </TabList>
      </Tabs>

      {/* Table */}
      <TableContainer overflowY="auto" h="77vh">
        <Table size="sm">
          <Thead bgColor="blackAlpha.100">
            <Tr>
              <Th textAlign="center">
                ลำดับ <br />
                (No.)
              </Th>
              <Th>
                รหัส <br />
                (ID)
              </Th>
              <Th>
                ชื่อบริษัท <br />
                (Company Name)
              </Th>
              <Th>
                ขึ้นทะเบียนกับ <br />
                (Request to)
              </Th>
              <Th textAlign="center">
                วันที่บันทึก <br />
                (Save date)
              </Th>
              <Th textAlign="center">
                สถานะ <br />
                (Status)
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {tableInfo.map((info, i) => (
              <Tr
                key={i}
                onClick={() => handleModal(info)}
                _hover={{ bg: "gray.100" }}
                _active={{ bg: "gray.300" }}
              >
                <Td textAlign="center">{i + 1}</Td>
                <Td>{info.number}</Td>

                <Td>
                  {info.companyName}
                  <br />
                </Td>

                <Td fontSize="smaller">{info.companyRegister}</Td>
                <Td textAlign="center">{dateForm(info.datetime)}</Td>
                <Td textAlign="center">
                  <Icon
                    as={
                      info.nextApprover != auth.username && info.nextApprover
                        ? MdCheckCircle
                        : info.status == "hold"
                        ? MdPauseCircle
                        : MdAccessTimeFilled
                    }
                    color={
                      info.nextApprover != auth.username && info.nextApprover
                        ? "green"
                        : info.status == "hold"
                        ? "red"
                        : "yellowgreen"
                    }
                    w={5}
                    h={5}
                  />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>

      {/* Indicator */}
      <HStack mt={3} fontSize="sm">
        <Icon as={MdAccessTimeFilled} color="yellowgreen" w={5} h={5} />
        <Text pr={4}>
          ดำเนินการ <span>/ In completed</span>
        </Text>
        <Icon as={MdCheckCircle} color="green" w={5} h={5} />
        <Text pr={4}>
          สำเร็จ <span>/ Completed</span>
        </Text>
        <Icon as={MdPauseCircle} color="red" w={5} h={5} />
        <Text>
          รอพิจารณา <span>/ Hold</span>
        </Text>
      </HStack>

      <ModalVendor
        isOpens={isOpen}
        onCloses={onClose}
        setModalShow={setModalShow}
        auth={auth}
      />
    </>
  );
}
