import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  Text,
  Grid,
  GridItem,
  HStack,
  Input,
  Spacer,
  Stack,
  Button,
  Icon,
  FormControl,
} from "@chakra-ui/react";
import { TiTimes, TiMediaPlay } from "react-icons/ti";
import Swal from "sweetalert2";
import { updateVendorInfo } from "../../store/slices/vendorSlice";
import { updateShowPayment } from "../../store/slices/showPaymentSlice";

const textOption = [
  {
    thai: "ภพ.20",
    eng: "Vat License",
    value: "vat",
  },
  {
    thai: "หนังสือรับรองบริษัท",
    eng: "Company Affidavit",
    value: "affidavit",
  },
  {
    thai: "แผนที่บริษัท",
    eng: "Company Map",
    value: "map",
  },
  {
    thai: "เอกสารอื่นๆ",
    eng: "Other Documents",
    value: "other",
  },
];

function onUploadFileChange(info, setFile, file) {
  return new Promise((resolve, reject) => {
    const fileToBase64 = (file, cb) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function () {
        cb(null, reader.result);
      };
      reader.onerror = function (error) {
        cb(error, null);
      };
    };

    if (!info.pdf) {
      resolve({ name: info.name, base64: "-", fileName: "-" });
    }
    fileToBase64(info.pdf, (err, result) => {
      let results = result.split(",").slice(1).toLocaleString();
      // console.log(results);
      resolve({ name: info.name, base64: results, fileName: info.pdf.name });
    });
  });
}

export default function Upload(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [time, setTime] = useState("");
  const [upload, setUpload] = useState({
    vat: "",
    affidavit: "",
    map: "",
    mapLink: "",
    other: "",
  });
  const [userName, setUserName] = useState("");
  const [file, setFile] = useState([]);

  const { registor, company, contact, certificate } = props;

  const getTime = () => {
    var dt = new Date();
    var options = {
      hour12: false,
      year: "numeric",
      month: "numeric",
      day: "numeric",
    };
    const dateTime = dt.toLocaleString("en-GB", options);
    setTime(dateTime);
  };

  const handleCancel = () => {
    Swal.fire({
      icon: "warning",
      title: `<p class="font-thai">ยกเลิกการลงทะเบียนใช่หรือไม่?  <br /> <span>Cancel registration?</span></p>`,
      showCancelButton: true,
      confirmButtonText: `<p class="font-thai">ใช่ / <span>Yes</span></p>`,
      cancelButtonText: `<p class="font-thai">ไม่ใช่ / <span>No</span></p>`,
      confirmButtonColor: "red",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/");
      }
    });
  };

  const handleNext = () => {
    Swal.fire({
      icon: "warning",
      title: `<p class="font-thai">ยืนยันการลงทะเบียนใช่หรือไม่?  <br /> <span>Confirm registration?</span></p>`,
      showCancelButton: true,
      confirmButtonText: `<p class="font-thai">ใช่ / <span>Yes</span></p>`,
      cancelButtonText: `<p class="font-thai">ไม่ใช่ / <span>No</span></p>`,
      confirmButtonColor: "green",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(updateShowPayment(true));
        Swal.fire({
          icon: "success",
          title: `<p class="font-thai">บันทึกสำเร็จ / <span>Success</span></p>`,
          timer: 2000,
          showConfirmButton: false,
        }).then(() => navigate("/paymethod"));
      }
    });
  };

  const handleUpload = (text, file) => {
    if (text == "vat") {
      setUpload({ ...upload, vat: file });
    } else if (text == "affidavit") {
      setUpload({ ...upload, affidavit: file });
    } else if (text == "map") {
      setUpload({ ...upload, map: file });
    } else {
      setUpload({ ...upload, other: file });
    }
  };

  const handlePdf = async () => {
    const formPdf = [
      { pdf: certificate.stdPdf[0], name: "stdPackingPdf" },
      { pdf: certificate.moqPdf[0], name: "moqPdf" },
      { pdf: upload.vat[0], name: "vatPdf" },
      { pdf: upload.affidavit[0], name: "affidavitPdf" },
      { pdf: upload.map[0], name: "mapPdf" },
      { pdf: upload.other[0], name: "otherPdf" },
    ];

    // Encode PDF to base64
    const base64File = formPdf.map(
      async (info) => await onUploadFileChange(info, setFile, file)
    );

    Promise.all(base64File).then((values) => {
      // console.log(values);
      const formAxios = {
        companyName: company.engCompany,
        companyRegister: registor,
        companyDetails: [company],
        contactParson: [
          {
            sale: [
              {
                name: contact.salesName,
                email: contact.salesEmail,
                tel: contact.salesTel,
              },
            ],
            saleManager: [
              {
                name: contact.managerName,
                email: contact.managerEmail,
                tel: contact.managerTel,
              },
            ],
            other: [
              {
                name: contact.othersName,
                email: contact.othersEmail,
                tel: contact.othersTel,
              },
            ],
          },
        ],
        stdCertificate: [
          {
            certificate: [...certificate.cerArray, certificate.other],
            payment: [
              certificate.payment,
              certificate.limit,
              certificate.currency,
            ],
            stdPacking: certificate.stdPacking,
            moq: certificate.moq,
          },
        ],
        username: userName,
        pdf: [...values, upload.mapLink],
      };

      dispatch(updateVendorInfo(formAxios));
      handleNext();
    });
  };

  const handleState = () => {
    if (registor == "") {
      handleError(`<b class="font-thai">กรุณาเลือกบริษัทที่ต้องการขึ้นทะเบียน <br />
        <span>Please select the company you want to register.</span></b>`);
    } else if (
      company.thaiCompany == "" ||
      company.engCompany == "" ||
      company.thaiAddress == "" ||
      company.engAddress == "" ||
      company.natureBusiness == "" ||
      company.companyWeb == "" ||
      company.tel == "" ||
      company.fax == ""
    ) {
      handleError(`<b class="font-thai">กรุณากรอกรายละเอียดบริษัทให้ครบถ้วน <br />
        <span>Please complete the company details.</span></b>`);
    } else if (
      contact.salesName == "" ||
      contact.salesEmail == "" ||
      contact.salesTel == "" ||
      contact.salesVEmail == "" ||
      contact.salesVTel == ""
    ) {
      handleError(`<b class="font-thai">กรุณากรอกรายละเอียดบุคคลติดต่อให้ครบถ้วน <br />
        <span>Please complete the contact person.</span></b>`);
    } else if (
      contact.salesVEmail != contact.salesEmail ||
      contact.salesVTel != contact.salesTel ||
      contact.managerVEmail != contact.managerEmail ||
      contact.managerVTel != contact.managerTel ||
      contact.othersVEmail != contact.othersEmail ||
      contact.othersVTel != contact.othersTel
    ) {
      handleError(`<b class="font-thai">กรุณาตรวจสอบรายละเอียดบุคคลติดต่อให้ถูกต้อง <br />
        <span>Please make sure your contact details are correct.</span></b>`);
    } else if (
      certificate.cerArray.length == 0 ||
      certificate.payment == "" ||
      certificate.limit == "" ||
      certificate.currency == "" ||
      certificate.stdPacking == "" ||
      certificate.moq == ""
    ) {
      handleError(`<b class="font-thai">กรุณากรอกรายละเอียดมาตรฐานและการรองรับให้ครบถ้วน <br />
        <span>Please complete the current standards and certifications.</span></b>`);
    } else if (
      certificate.stdPacking == "Yes" &&
      certificate.stdPdf.length == 0
    ) {
      handleError(`<b class="font-thai">กรุณาอัพโหลดเอกสารการบรรจุ <br />
        <span>Please upload packing documents.</span></b>`);
    } else if (certificate.moqPdf.length == 0 && certificate.moq == "Yes") {
      handleError(`<b class="font-thai">กรุณาอัพโหลดเอกสารจำนวนการสั่งซื้อขั้นต่ำ <br />
        <span>Please upload MOQ documents.</span></b>`);
    } else if (upload.vat == "" || upload.affidavit == "" || upload.map == "") {
      handleError(`<b class="font-thai">กรุณาอัพโหลดเอกสารให้ครบถ้วน <br />
        <span>Please upload documents.</span></b>`);
    } else if (upload.mapLink == "") {
      handleError(`<b class="font-thai">กรุณาใส่ลิ้งค์แผนที่บริษัท <br />
        <span>Please enter a google map link.</span></b>`);
    } else {
      handlePdf();
    }
  };

  const handleError = (text) => {
    Swal.fire({
      icon: "warning",
      html: text,
      timer: 4000,
      showConfirmButton: false,
    });
  };

  useEffect(() => {
    const initPage = setTimeout(() => {
      getTime();
    }, 100);
    const timer1m = setInterval(() => {
      getTime();
    }, 3600000);

    return () => {
      clearTimeout(initPage);
      clearInterval(timer1m);
    };
  }, []);

  return (
    <>
      <HStack mt={5}>
        <Text
          className="font-thai"
          fontWeight="bold"
          fontSize={{ base: "sm", sm: "xl" }}
        >
          อัพโหลดเอกสาร / <span>Upload Documents</span>
        </Text>
        <Spacer />
        <Text fontWeight="light" fontSize="sm">
          Step 4 of 5
        </Text>
      </HStack>

      <Grid
        templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)" }}
        gap={3}
        alignItems="center"
        borderTop="2px"
        borderColor="blackAlpha.600"
        py={3}
        my={1}
        fontSize={{ base: "sm", sm: "md" }}
      >
        {/* Upload */}
        <GridItem
          w="100%"
          fontWeight="bold"
          borderRight={{ base: "", md: "2px" }}
          borderColor="blackAlpha.600"
          px={2}
        >
          {textOption.map((info, i) => (
            <Stack key={i} mb={8}>
              <Text className="font-thai">
                {i + 1}. {info.thai} /<span> {info.eng}</span>
              </Text>
              <Input
                type="file"
                accept=".pdf"
                variant="unstyled"
                size="sm"
                onChange={(e) => handleUpload(info.value, e.target.files)}
              />
              {info.thai == "แผนที่บริษัท" ? (
                <Input
                  placeholder="Google Map Link => https://goo.gl/maps/DbHkSj8ZUHu88p9M7"
                  size="sm"
                  mt={3}
                  w="80%"
                  onChange={({ target: { value: mapLink } }) =>
                    setUpload({ ...upload, mapLink })
                  }
                />
              ) : (
                ""
              )}
            </Stack>
          ))}
        </GridItem>

        {/* Certify */}
        <GridItem w="100%" px={5} textAlign="center">
          <Text className="font-thai" fontSize="lg">
            ข้าพเจ้าขอรับรองว่าข้อความและเอกสารข้างต้นเป็นความจริงทุกประการ
          </Text>
          <Text>
            I certify that the information are true and correct in all respects.
          </Text>

          <FormControl
            onKeyPress={({ key }) => {
              if (key === "Enter") {
                handleNext();
              }
            }}
          >
            <Input
              variant="filled"
              textAlign="center"
              placeholder="กรุณาระบุคำนำหน้า / Please specify name title"
              my={5}
              onChange={({ target: { value: name } }) => setUserName(name)}
            />
          </FormControl>
          <Text>(ผู้ให้ข้อมูล)</Text>
          <Text mb={8} mt={2}>
            วันที่ {time}
          </Text>

          {/* Button */}
          <HStack justifyContent="center" gap={8}>
            <Button
              w={{ base: "50%", md: "30%" }}
              rightIcon={<Icon as={TiTimes} />}
              colorScheme="red"
              rounded="xl"
              className="font-thai"
              onClick={() => handleCancel()}
            >
              ยกเลิก / Cancel
            </Button>

            <Button
              w={{ base: "50%", md: "30%" }}
              rightIcon={<Icon as={TiMediaPlay} />}
              colorScheme="green"
              rounded="xl"
              className="font-thai"
              onClick={() => handleState()}
              disabled={userName === ""}
            >
              ต่อไป / Next
            </Button>
          </HStack>
        </GridItem>
      </Grid>
    </>
  );
}
