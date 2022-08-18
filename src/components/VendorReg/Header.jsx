import React from "react";
import { Box, Text } from "@chakra-ui/react";

export default function Header() {
  return (
    <>
      <Box
        textAlign="center"
        py={3}
        my={3}
        borderBottom="2px"
        borderColor="blackAlpha.600"
      >
        <Text
          fontWeight="bold"
          fontSize={{ base: "sm", md: "lg" }}
          className="font-thai"
        >
          กรุณากรอกข้อมูลให้ครบทุกช่อง
          พร้อมกับเอกสารดังต่อไปนี้เพื่อการลงทะเบียน
        </Text>
        <Text fontWeight="bold" fontSize={{ base: "sm", md: "md" }}>
          (Please fill up all the sections in this form and also send to us the
          following documents.)
        </Text>

        {/* Document */}
        <Box
          display={{ lg: "flex" }}
          fontWeight="bold"
          justifyContent="center"
          gap={4}
          py={1}
          fontSize={{ base: "sm", md: "md" }}
        >
          <Text className="font-thai">
            1. ภพ.20 /<span> Vat License</span>
          </Text>
          <Text className="font-thai">
            2. หนังสือรับรอง / <span>Company Affidavit</span>
          </Text>
          <Text className="font-thai">
            3. แผนที่บริษัท / <span>Company Map</span>
          </Text>
          <Text className="font-thai">
            4. เอกสารอื่นๆ / <span>Other Documents</span>
          </Text>
        </Box>

        {/* Note */}
        <Box
          display={{ lg: "flex" }}
          justifyContent="center"
          gap={1}
          fontSize="sm"
          pt={1}
        >
          <Text className="font-thai">
            หมายเหตุ : ไฟล์ที่อัพโหลดต้องเป็นไฟล์ .pdf เท่านั้น /
            <span> Note: The uploaded file must be a .pdf file only.</span>
          </Text>
        </Box>
      </Box>
    </>
  );
}
