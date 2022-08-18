import React from "react";
import {
  Text,
  Grid,
  GridItem,
  HStack,
  Input,
  Spacer,
  Textarea,
} from "@chakra-ui/react";

export default function Company({ setCompany, company }) {
  return (
    <>
      <HStack mt={5}>
        <Text
          className="font-thai"
          fontWeight="bold"
          fontSize={{ base: "sm", sm: "xl" }}
        >
          รายละเอียดบริษัท / <span>Company Details</span>
        </Text>
        <Spacer />
        <Text fontWeight="light" fontSize="sm">
          Step 1 of 5
        </Text>
      </HStack>

      <Grid
        templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)" }}
        gap={4}
        alignItems="center"
        borderTop="2px"
        borderColor="blackAlpha.600"
        py={3}
        my={1}
        fontSize={{ base: "sm", sm: "md" }}
      >
        <GridItem w="100%">
          <Text className="font-thai">
            ชื่อบริษัท (ภาษาอังกฤษ) / Company name (English)
          </Text>
          <Input
            placeholder="Company name (English)"
            size="sm"
            onChange={({ target: { value: engCompany } }) =>
              setCompany({ ...company, engCompany })
            }
          />
        </GridItem>

        <GridItem w="100%">
          <Text className="font-thai">
            ชื่อบริษัท (ภาษาไทย) / Company name (Thai)
          </Text>
          <Input
            placeholder="Company name (Thai)"
            size="sm"
            onChange={({ target: { value: thaiCompany } }) =>
              setCompany({ ...company, thaiCompany })
            }
          />
        </GridItem>

        <GridItem w="100%">
          <Text className="font-thai">
            ที่อยู่ (ภาษาอังกฤษ) / Address (English)
          </Text>
          <Textarea
            placeholder="Address (English)"
            size="sm"
            onChange={({ target: { value: engAddress } }) =>
              setCompany({ ...company, engAddress })
            }
          />
        </GridItem>

        <GridItem w="100%">
          <Text className="font-thai">ที่อยู่ (ภาษาไทย) / Address (Thai)</Text>
          <Textarea
            placeholder="Address (Thai)"
            size="sm"
            onChange={({ target: { value: thaiAddress } }) =>
              setCompany({ ...company, thaiAddress })
            }
          />
        </GridItem>

        <GridItem w="100%">
          <Text className="font-thai">
            ประเภทของกิจการ / Nature of Business
          </Text>
          <Input
            placeholder="Nature of Business"
            size="sm"
            onChange={({ target: { value: natureBusiness } }) =>
              setCompany({ ...company, natureBusiness })
            }
          />
        </GridItem>

        <GridItem w="100%">
          <Text className="font-thai">เว็บไซต์ของบริษัท / Company Website</Text>
          <Input
            placeholder="Company Website"
            size="sm"
            onChange={({ target: { value: companyWeb } }) =>
              setCompany({ ...company, companyWeb })
            }
          />
        </GridItem>

        <GridItem w="100%">
          <Text className="font-thai">เบอร์โทรศัพท์ / Tel No.</Text>
          <Input
            placeholder="Tel No."
            type="text"
            size="sm"
            onChange={({ target: { value: tel } }) =>
              setCompany({ ...company, tel })
            }
            maxLength={10}
          />
        </GridItem>

        <GridItem w="100%">
          <Text className="font-thai">เบอร์แฟกซ์ / Fax No.</Text>
          <Input
            placeholder="Fax No."
            type="number"
            size="sm"
            onChange={({ target: { value: fax } }) =>
              setCompany({ ...company, fax })
            }
          />
        </GridItem>
      </Grid>
    </>
  );
}
