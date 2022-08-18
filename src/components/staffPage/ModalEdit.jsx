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
  Text,
  Input,
  Textarea,
  Grid,
  GridItem,
  Select,
  Divider,
  Checkbox,
  HStack,
} from "@chakra-ui/react";
import axios from "axios";
import Swal from "sweetalert2";
import { editPath } from "../../UrlPath";

const optionCompany = [
  {
    text: "SNC - เอส เอ็น ซี ฟอร์เมอร์ จำกัด",
    value: "SNC",
  },
  {
    text: "CL - เอส เอ็น ซี คูลลิ่ง ซัพพลาย จำกัด",
    value: "CL",
  },
  {
    text: "IMP - อิมมอทัล พาร์ท จำกัด",
    value: "IMP",
  },
  {
    text: " SNC2 - เอส เอ็น ซี ฟอร์เมอร์ จำกัด (มหาชน) สาขา 2",
    value: "SNC2",
  },
  {
    text: "PRD - พาราไดซ์ พลาสติก จำกัด",
    value: "PRD",
  },
  {
    text: "MSPC - บริษัท เมอิโซะ เอส เอ็น ซี พริซิชั่น จำกัด",
    value: "MSPC",
  },
  {
    text: "SPEC - บริษัท เอส เอ็น ซี ไพยองซาน อีโวลูชั่น จำกัด",
    value: "SPEC",
  },
  {
    text: "IPC - อินฟินิตี้ พาร์ท จำกัด",
    value: "IPC",
  },
  {
    text: "SCAN - บริษัท เอส เอ็น ซี ครีเอติวิตี้ แอนโทโลจี จำกัด",
    value: "SCAN",
  },
  {
    text: "SAHP - บริษัท เอส เอ็น ซี แอตแลนติก ฮีต ปัมพ์ จำกัด",
    value: "SAHP",
  },
  {
    text: "SAWHA - เอส เอ็น ซี แอตแลนติก วอเตอร์ ฮีตเตอร์ เอเชีย จำกัด",
    value: "SAWHA",
  },
  {
    text: "SSMA - บริษัท เอส เอส เอ็ม ออโต้แมนชั่น จำกัด",
    value: "SSMA",
  },
];
const optionQ1 = [
  "ISO 9001:2000",
  "ISO 14001:2004",
  "ISO TS16949:2002",
  "TIS 18001:1999",
  "OHSAS 18001:2007",
  "ISO 26000",
  "มรท. 8001-2546",
  "BOI",
  "Other",
];
const question = [
  {
    thai: "3. คุณมีมาตรฐานการบรรจุหรือไม่",
    eng: "Do you have standard packing?",
    value: "stdPacking",
  },
  {
    thai: "4. คุณมีจำนวนการสั่งซื้อขั้นต่ำหรือไม่",
    eng: "Do you have minimum order quantity (MOQ)?",
    value: "moq",
  },
];
const bankList = [
  "ธนาคารกสิกรไทย / Kasikornbank Public Company Limited",
  "ธนาคารแห่งประเทศไทย / Bank of Thailand",
  "ธนาคารกรุงเทพ /  Bangkok Bank Public Company Limited",
  "ธนาคารกรุงไทย / Krung Thai Bank Public Company Limited",
  "ธนาคารทหารไทยธนชาต / TMBThanachart Bank Public Company Limited",
  "ธนาคารไทยพาณิชย์ / The Siam Commercial Bank Public Company Limited",
  "ธนาคารกรุงศรีอยุธยา /  Bank of Ayudhya Public Company Limited",
  "ธนาคารเกียรตินาคินภัทร / KIATNAKIN PHATRA Bank Public Company Limited",
  "ธนาคารซีไอเอ็มบีไทย / CIMB Thai Bank Public Company Limited",
  "ธนาคารทิสโก้ / TISCO Bank Public Company Limited",
  "ธนาคารยูโอบี / United Overseas Bank (Thai) Public Company Limited ",
  "ธนาคารไทยเครดิตเพื่อรายย่อย / Thai Credit Retail Bank",
  "ธนาคารแลนด์ แอนด์ เฮ้าส์ / Land and Houses Public Company Limited",
  "ธนาคารไอซีบีซี (ไทย) / ICBC (Thai) Leasing Company Limited",
  "ธนาคารพัฒนาวิสาหกิจขนาดกลางและขนาดย่อมแห่งประเทศไทย",
  "ธนาคารเพื่อการเกษตรและสหกรณ์การเกษตร /  Bank for Agriculture and Agricultural Cooperatives",
  "ธนาคารเพื่อการส่งออกและนำเข้าแห่งประเทศไทย / Export-Import Bank of Thailand",
  "ธนาคารออมสิน / The Government Savings Bank.",
  "ธนาคารอาคารสงเคราะห์ / Government Housing Bank",
  "ธนาคารอิสลามแห่งประเทศไทย / Islamic Bank of Thailand",
  "ธนาคารเมกะ สากลพาณิชย์ / MEGA INTERNATIONAL COMMERCIAL BANK PUBLIC.",
  "ธนาคารแห่งประเทศจีน / Bank of China",
  "ธนาคารเอเอ็นแซด (ไทย) / ANZ BANK (THAI) PUBLIC COMPANY LIMITED.",
  "ธนาคารซูมิโตโม มิตซุย ทรัสต์ (ไทย) / SUMITOMO MITSUI TRUST BANK (THAI) PUBLIC COMPANY LIMITED",
  "ธนาคารสแตนดาร์ดชาร์เตอร์ด (ไทย) / Standard Chartered (Thai)",
  "ธนาคารซิตี้แบงก์ / Citibank",
  "อื่นๆ / Others",
];

export default function ModalEdit({
  onClose,
  isOpen,
  modalInfo,
  onCloses,
  setModalShow,
}) {
  const {
    companyRegister,
    companyDetails,
    contactParson,
    stdCertificate,
    bankAccount,
  } = modalInfo;

  if (
    !companyRegister ||
    !companyDetails ||
    !contactParson ||
    !stdCertificate ||
    !bankAccount
  ) {
    return <div />;
  } else {
    const formInit = {
      companyRegister: companyRegister,

      engCompany: companyDetails[0].engCompany,
      thaiCompany: companyDetails[0].thaiCompany,
      engAddress: companyDetails[0].engAddress,
      thaiAddress: companyDetails[0].thaiAddress,
      natureBusiness: companyDetails[0].natureBusiness,
      companyWeb: companyDetails[0].companyWeb,
      tel: companyDetails[0].tel,
      fax: companyDetails[0].fax,

      salesName: contactParson[0].sale[0].name,
      salesEmail: contactParson[0].sale[0].email,
      salesTel: contactParson[0].sale[0].tel,
      managerName: contactParson[0].saleManager[0].name,
      managerEmail: contactParson[0].saleManager[0].email,
      managerTel: contactParson[0].saleManager[0].tel,
      othersName: contactParson[0].other[0].name,
      othersEmail: contactParson[0].other[0].email,
      othersTel: contactParson[0].other[0].tel,

      other:
        stdCertificate[0].certificate[stdCertificate[0].certificate.length - 1],
      payment: stdCertificate[0].payment[0],
      limit: stdCertificate[0].payment[1],
      currency: stdCertificate[0].payment[2],

      accountName: bankAccount[0].accountName,
      accountNo: bankAccount[0].accountNo,
      bank: bankAccount[0].bank,
      otherBank: bankAccount[0].otherBank,
      branch: bankAccount[0].branch,
      contact: bankAccount[0].contact,
      telBank: bankAccount[0].tel,
      email: bankAccount[0].email,
    };
    const [checked, setChecked] = useState(
      stdCertificate[0].certificate.slice(0, -1)
    );
    const [information, setInformation] = useState({
      ...formInit,
    });
    const [certificate, setCertificate] = useState({
      cerArray: stdCertificate[0].certificate.slice(0, -1),
    });

    const handleChk = (info) => {
      const data = stdCertificate[0].certificate.find((chk) => chk == info);
      return data == info;
    };
    const handleChkYN = (choice, text) => {
      if (text == "moq") {
        return stdCertificate[0].moq == choice;
      } else {
        return stdCertificate[0].stdPacking == choice;
      }
    };

    const handleEdit = () => {
      const formAxios = {
        companyRegister: information.companyRegister,
        companyDetails: [
          {
            engCompany: information.engCompany,
            thaiCompany: information.thaiCompany,
            engAddress: information.engAddress,
            thaiAddress: information.thaiAddress,
            natureBusiness: information.natureBusiness,
            companyWeb: information.companyWeb,
            tel: information.tel,
            fax: information.fax,
          },
        ],
        contactParson: [
          {
            sale: [
              {
                name: information.salesName,
                email: information.salesEmail,
                tel: information.salesTel,
              },
            ],
            saleManager: [
              {
                name: information.managerName,
                email: information.managerEmail,
                tel: information.managerTel,
              },
            ],
            other: [
              {
                name: information.othersName,
                email: information.othersEmail,
                tel: information.othersTel,
              },
            ],
          },
        ],
        stdCertificate: [
          {
            certificate: [...certificate.cerArray, information.other],
            payment: [
              information.payment,
              information.limit,
              information.currency,
            ],
            stdPacking: stdCertificate[0].stdPacking,
            moq: stdCertificate[0].moq,
          },
        ],
        bankAccount: [
          {
            accountName: information.accountName,
            accountNo: information.accountNo,
            bank: information.bank,
            otherBank: information.otherBank,
            branch: information.branch,
            contact: information.contact,
            tel: information.telBank,
            email: information.email,
          },
        ],
        level: 0,
        status: "pending",
        number: modalInfo.number,
      };

      // console.log(formAxios);

      Swal.fire({
        icon: "warning",
        title: `<p class="font-thai">ยืนยันการแก้ไขข้อมูล?  <br /> <span>Confirm to edit data</span></p>`,
        showCancelButton: true,
        confirmButtonText: `<p class="font-thai">ใช่ / <span>Yes</span></p>`,
        cancelButtonText: `<p class="font-thai">ไม่ใช่ / <span>No</span></p>`,
        confirmButtonColor: "green",
        customClass: {
          container: "my-swal",
        },
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: `<p class="font-thai">กำลังบันทึกข้อมูล </p>(Saving information.)`,
            html: `<p class="font-thai">กรุณารอสักครู่ (Please wait.) </p>`,
            allowEscapeKey: false,
            allowOutsideClick: false,
            didOpen: () => {
              Swal.showLoading();
            },
            timer: 8000,
            customClass: {
              container: "my-swal",
            },
          });
          axios.post(editPath, { ...formAxios }).then(({ data }) => {
            console.log(data);
            if (data.state) {
              Swal.fire({
                icon: "success",
                title: `<p class="font-thai">บันทึกสำเร็จ / <span>Success</span></p>`,
                customClass: {
                  container: "my-swal",
                },
              }).then(() => {
                handleClose();
                onCloses();
                setModalShow(false);
              });
            } else {
              Swal.fire({
                icon: "error",
                title: data.massage,
                showConfirmButton: false,
                timer: 5000,
                customClass: {
                  container: "my-swal",
                },
              });
            }
          });
        }
      });
    };

    const handleClose = () => {
      setInformation({ ...formInit });
      setCertificate({
        ...certificate,
        cerArray: stdCertificate[0].certificate.slice(0, -1),
      });
      onClose();
    };

    const handleChange = (info) => {
      setInformation({
        ...information,
        [info.target.name]: info.target.value,
      });
    };

    const handleCheck = (event) => {
      var cerArray = [...checked];
      if (event.target.checked) {
        cerArray = [...checked, event.target.value];
      } else {
        cerArray.splice(checked.indexOf(event.target.value), 1);
      }
      setChecked(cerArray);
      setCertificate({ ...certificate, cerArray });
    };

    const companyFill = [
      {
        head: "ชื่อบริษัท (ภาษาอังกฤษ) / Company name (English)",
        value: companyDetails[0].engCompany,
        name: "engCompany",
      },
      {
        head: "ชื่อบริษัท (ภาษาไทย) / Company name (Thai)",
        value: companyDetails[0].thaiCompany,
        name: "thaiCompany",
      },
      {
        head: "ที่อยู่ (ภาษาอังกฤษ) / Address (English)",
        value: companyDetails[0].engAddress,
        name: "engAddress",
      },
      {
        head: "ที่อยู่ (ภาษาไทย) / Address (Thai)",
        value: companyDetails[0].thaiAddress,
        name: "thaiAddress",
      },
      {
        head: "ประเภทของกิจการ / Nature of Business",
        value: companyDetails[0].natureBusiness,
        name: "natureBusiness",
      },
      {
        head: "เว็บไซต์ / Website",
        value: companyDetails[0].companyWeb,
        name: "companyWeb",
      },
      {
        head: "เบอร์โทรศัพท์ / Tel No.",
        value: companyDetails[0].tel,
        name: "tel",
      },
      {
        head: "เบอร์แฟกซ์ / Fax No.",
        value: companyDetails[0].fax,
        name: "fax",
      },
    ];
    const contactFill = [
      {
        head: "งานขาย / Sales",
        value: contactParson[0].sale[0].name,
        name: "saleName",
      },
      {
        head: "อีเมล / E-mail",
        value: contactParson[0].sale[0].email,
        name: "saleEmail",
      },
      {
        head: "เบอร์ติดต่อ / Ext. No.",
        value: contactParson[0].sale[0].tel,
        name: "saleTel",
      },
      {
        head: "ผู้จัดการฝ่ายขาย / Sales Manager",
        value: contactParson[0].saleManager[0].name,
        name: "managerName",
      },
      {
        head: "อีเมล / E-mail",
        value: contactParson[0].saleManager[0].email,
        name: "managerEmail",
      },
      {
        head: "เบอร์ติดต่อ / Ext. No.",
        value: contactParson[0].saleManager[0].tel,
        name: "managerTel",
      },
      {
        head: "งานส่วนอื่นๆ / Others",
        value: contactParson[0].other[0].name,
        name: "othersName",
      },
      {
        head: "อีเมล / E-mail",
        value: contactParson[0].other[0].email,
        name: "othersEmail",
      },
      {
        head: "เบอร์ติดต่อ / Ext. No.",
        value: contactParson[0].other[0].tel,
        name: "othersTel",
      },
    ];
    const bankFill = [
      {
        head: "ชื่อบัญชี / Account name",
        value: bankAccount[0].accountName,
        name: "accountName",
      },
      {
        head: "เลขบัญชี / Account No.",
        value: bankAccount[0].accountNo,
        name: "accountNo",
      },
      {
        head: "ธนาคาร / Bank",
        value: bankAccount[0].bank,
        name: "bank",
      },
      {
        head: "สาขา / Branch",
        value: bankAccount[0].branch,
        name: "branch",
      },
      {
        head: "ชื่อผู้ติดต่อ / Contact Person",
        value: bankAccount[0].contact,
        name: "contact",
      },
      {
        head: "เบอร์โทรศัพท์ / Tel No.",
        value: bankAccount[0].tel,
        name: "telBank",
      },
      {
        head: "อีเมล / E-mail",
        value: bankAccount[0].email,
        name: "email",
      },
    ];

    return (
      <>
        <Modal
          size="4xl"
          isOpen={isOpen}
          onClose={onClose}
          scrollBehavior="inside"
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>
              <Text className="font-thai">
                แก้ไขรายละเอียดบริษัท <span>/ Edit Company Details. </span>
              </Text>
            </ModalHeader>
            <ModalCloseButton />

            <ModalBody>
              <Grid
                templateColumns="repeat(4, 1fr)"
                gap={2}
                alignItems="center"
                //   fontSize="sm"
              >
                <GridItem w="100%">
                  <Text className="font-thai">
                    บริษัทที่ขึ้นทะเบียน <br />/ Company to be registered.
                  </Text>
                </GridItem>
                <GridItem w="100%" colSpan={3}>
                  <Select
                    placeholder="Select the company you want to register."
                    defaultValue={companyRegister}
                    variant="filled"
                    name="companyRegister"
                    onChange={handleChange}
                  >
                    {optionCompany.map((info, i) => (
                      <option key={i} value={info.value}>
                        {info.text}
                      </option>
                    ))}
                  </Select>
                </GridItem>

                <GridItem w="100%" colSpan={4} mt={3}>
                  <Text className="font-thai" fontWeight="bold" fontSize="md">
                    รายละเอียดบริษัท / <span>Company Details</span>
                  </Text>
                  <Divider border="1px" borderColor="blackAlpha.400" />
                </GridItem>
                {companyFill.map((info, i) => (
                  <React.Fragment key={i}>
                    <GridItem w="100%" colSpan={2}>
                      <Text className="font-thai">{info.head}</Text>
                      {i == 2 || i == 3 ? (
                        <Textarea
                          name={info.name}
                          defaultValue={info.value}
                          variant="filled"
                          size="sm"
                          onChange={handleChange}
                        />
                      ) : (
                        <Input
                          name={info.name}
                          defaultValue={info.value}
                          variant="filled"
                          size="sm"
                          onChange={handleChange}
                        />
                      )}
                    </GridItem>
                  </React.Fragment>
                ))}

                <GridItem w="100%" colSpan={4} mt={3}>
                  <Text className="font-thai" fontWeight="bold" fontSize="md">
                    บุคคลติดต่อ / <span>Contact Person</span>
                  </Text>
                  <Divider border="1px" borderColor="blackAlpha.400" />
                </GridItem>
                {contactFill.map((info, i) => (
                  <React.Fragment key={i}>
                    <GridItem w="100%" colSpan={i % 3 ? 2 : 4}>
                      <Text
                        className="font-thai"
                        fontWeight={i % 3 ? "" : "semibold"}
                      >
                        {info.head}
                      </Text>
                      <Input
                        name={info.name}
                        defaultValue={info.value}
                        variant="filled"
                        size="sm"
                        onChange={handleChange}
                      />
                    </GridItem>
                  </React.Fragment>
                ))}

                <GridItem w="100%" colSpan={4} mt={3}>
                  <Text className="font-thai" fontWeight="bold" fontSize="md">
                    มาตรฐานและการรับรองที่ได้รับในปัจจุบัน /{" "}
                    <span>Current Standards and Certifications</span>
                  </Text>
                  <Divider border="1px" borderColor="blackAlpha.400" />
                </GridItem>
                {/* Q1 */}
                <GridItem w="100%" colSpan={4}>
                  <Text className="font-thai">
                    1. การรับรองที่ได้รับ / Kind of certificate approved
                  </Text>
                </GridItem>
                <GridItem w="100%" colSpan={4}>
                  <Grid templateColumns="repeat(5,1fr)" gap={3}>
                    {optionQ1.map((info, i) => (
                      <GridItem w="100%" key={i}>
                        <Checkbox
                          defaultChecked={handleChk(info)}
                          value={info}
                          onChange={handleCheck}
                        >
                          {info}
                        </Checkbox>
                      </GridItem>
                    ))}
                    <GridItem w="100%">
                      {!certificate.cerArray.find((chk) => chk == "Other") ? (
                        <Input variant="flushed" size="sm" disabled />
                      ) : (
                        <Input
                          variant="flushed"
                          size="sm"
                          name="other"
                          defaultValue={
                            stdCertificate[0].certificate[
                              stdCertificate[0].certificate.length - 1
                            ]
                          }
                          onChange={handleChange}
                        />
                      )}
                    </GridItem>
                  </Grid>
                </GridItem>

                {/* Q2 */}
                <GridItem w="100%" colSpan={4}>
                  <Text className="font-thai">
                    2. เงื่อนไขการชำระเงิน / <span>Term of payment</span>
                  </Text>
                  <Textarea
                    defaultValue={stdCertificate[0].payment[0]}
                    size="sm"
                    rows={3}
                    variant="filled"
                    name="payment"
                    onChange={handleChange}
                  />
                </GridItem>
                <GridItem w="100%">
                  <Text className="font-thai">
                    วงเงินอนุมัติ / <span>Approval limit</span>
                  </Text>
                </GridItem>
                <GridItem w="100%" colSpan={2}>
                  <Input
                    defaultValue={stdCertificate[0].payment[1]}
                    type="number"
                    name="limit"
                    variant="filled"
                    onChange={handleChange}
                  />
                </GridItem>
                <GridItem w="100%">
                  <Select
                    defaultValue={stdCertificate[0].payment[2]}
                    variant="filled"
                    name="currency"
                    onChange={handleChange}
                  >
                    <option value="บาท / THB">บาท / THB</option>
                    <option value="ดอลลาร์สหรัฐ / USD">
                      ดอลลาร์สหรัฐ / USD
                    </option>
                  </Select>
                </GridItem>

                {question.map((text, i) => (
                  <React.Fragment key={i}>
                    <GridItem w="100%" colSpan={3}>
                      <Text className="font-thai">
                        {text.thai} <span>/ {text.eng}</span>
                      </Text>
                    </GridItem>
                    <GridItem w="100%">
                      <HStack justifyContent="center">
                        <Checkbox
                          isDisabled
                          isChecked={handleChkYN("No", text.value)}
                        >
                          ไม่มี / No
                        </Checkbox>
                        <Checkbox
                          isDisabled
                          isChecked={handleChkYN("Yes", text.value)}
                        >
                          มี / Yes
                        </Checkbox>
                      </HStack>
                    </GridItem>
                  </React.Fragment>
                ))}

                <GridItem w="100%" colSpan={4}>
                  <Text className="font-thai" fontWeight="bold" fontSize="md">
                    ข้อมูลบัญชีธนาคาร / <span>Bank Account Information</span>
                  </Text>
                  <Divider border="1px" borderColor="blackAlpha.400" />
                </GridItem>
                {bankFill.map((info, i) => (
                  <React.Fragment key={i}>
                    <GridItem w="100%" colSpan={i == 4 ? 4 : 2}>
                      <Text className="font-thai">{info.head}</Text>
                      {i != 2 ? (
                        <Input
                          name={info.name}
                          defaultValue={info.value}
                          variant="filled"
                          size="sm"
                          onChange={handleChange}
                        />
                      ) : (
                        <Select
                          defaultValue={info.value}
                          size="sm"
                          variant="filled"
                          name={info.name}
                          onChange={handleChange}
                        >
                          {bankList.map((info, i) => (
                            <option value={info} key={i}>
                              {info}
                            </option>
                          ))}
                        </Select>
                      )}
                      {information.bank == "อื่นๆ / Others" && i == 2 ? (
                        <Input
                          defaultValue={bankAccount[0].otherBank}
                          mt={2}
                          variant="filled"
                          size="sm"
                          name="otherBank"
                          onChange={handleChange}
                        />
                      ) : (
                        ""
                      )}
                    </GridItem>
                  </React.Fragment>
                ))}
              </Grid>
            </ModalBody>

            {/* Button */}
            <ModalFooter>
              <Button
                colorScheme="green"
                rounded="full"
                w="15%"
                onClick={() => handleEdit()}
              >
                <Text className="font-thai">
                  บันทึก <span>/ Save</span>
                </Text>
              </Button>
              <Button
                colorScheme="red"
                ml={3}
                rounded="full"
                w="15%"
                onClick={() => handleClose()}
              >
                <Text className="font-thai">
                  ยกเลิก <span>/ Cancel</span>
                </Text>
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    );
  }
}
