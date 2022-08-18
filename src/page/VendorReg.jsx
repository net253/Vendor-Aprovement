import React, { useState, useEffect } from "react";
import { Text } from "@chakra-ui/react";
import {
  Header,
  InputForm,
  Company,
  Contact,
  Standard,
  Upload,
} from "../components/VendorReg";

export default function Overview() {
  const [registor, setReistor] = useState("");

  const [company, setCompany] = useState({
    engCompany: "",
    thaiCompany: "",
    engAddress: "",
    thaiAddress: "",
    natureBusiness: "",
    companyWeb: "",
    tel: "",
    fax: "",
  });

  const [contact, setContact] = useState({
    salesName: "",
    salesEmail: "",
    salesTel: "",
    salesVEmail: "",
    salesVTel: "",
    managerName: "",
    managerEmail: "",
    managerTel: "",
    managerVEmail: "",
    managerVTel: "",
    othersName: "",
    othersEmail: "",
    othersTel: "",
    othersVEmail: "",
    othersVTel: "",
  });

  const [certificate, setCertificate] = useState({
    cerArray: [],
    other: "",
    payment: "",
    limit: "",
    currency: "",
    stdPacking: "",
    moq: "",
    stdPdf: [],
    moqPdf: [],
  });

  return (
    <>
      <Text fontSize="3xl" fontWeight="bold">
        Vendor Registration
      </Text>
      <Header />

      <InputForm setReistor={setReistor} registor={registor} />
      <Company setCompany={setCompany} company={company} />
      <Contact setContact={setContact} contact={contact} />
      <Standard setCertificate={setCertificate} certificate={certificate} />
      <Upload
        registor={registor}
        company={company}
        contact={contact}
        certificate={certificate}
      />
    </>
  );
}
