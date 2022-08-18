import React from "react";
import {
  Text,
  Grid,
  GridItem,
  VStack,
  Input,
  Divider,
  Button,
  Icon,
  Link,
} from "@chakra-ui/react";
import { MdDownload } from "react-icons/md";

export default function UploadDoc({ modalInfo }) {
  const { pdf } = modalInfo;

  const dataURItoBlob = (dataURI) => {
    const byteString = window.atob(dataURI);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([int8Array], { type: "application/pdf" });
    return blob;
  };

  const handleDownload = (base64, fileName) => {
    const blob = dataURItoBlob(base64);
    const url = URL.createObjectURL(blob);
    window.open(url, "_blank");
  };

  if (!pdf) {
    return <div />;
  } else {
    const textOption = [
      {
        thai: "ภพ.20",
        eng: "Vat License",
        value: [pdf[2].base64, pdf[2].fileName],
      },
      {
        thai: "หนังสือรับรองบริษัท",
        eng: "Company Affidavit",
        value: [pdf[3].base64, pdf[3].fileName],
      },
      {
        thai: "แผนที่บริษัท",
        eng: "Company Map",
        value: [pdf[4].base64, pdf[4].fileName],
      },
      {
        thai: "เอกสารอื่นๆ",
        eng: "Other Documents",
        value: [pdf[5].base64, pdf[5].fileName],
      },
    ];

    return (
      <>
        <Grid templateColumns="repeat(2, 1fr)" gap={1} alignItems="center">
          <GridItem w="100%" colSpan={2}>
            <Divider my={3} border="1px" borderColor="blackAlpha.400" />
            <Text className="font-thai" fontWeight="bold" fontSize="md">
              เอกสารการอัพโหลด / Uploaded Document
            </Text>
          </GridItem>

          {textOption.map((info, i) => (
            <React.Fragment key={i}>
              <GridItem w="100%" mt={3}>
                <Text className="font-thai" fontSize="sm">
                  {i + 1}. {info.thai} /<span> {info.eng}</span>
                </Text>
              </GridItem>
              <GridItem w="100%" mt={2}>
                <VStack>
                  <Button
                    size="sm"
                    leftIcon={<Icon as={MdDownload} />}
                    colorScheme="whatsapp"
                    w="60%"
                    isDisabled={info.value[0] == "-"}
                    onClick={() => handleDownload(info.value[0], info.value[1])}
                  >
                    {info.eng}
                  </Button>
                  {info.thai == "แผนที่บริษัท" ? (
                    <Link href={pdf[6]} isExternal fontSize="sm">
                      Google map click
                    </Link>
                  ) : (
                    ""
                  )}
                </VStack>
              </GridItem>
            </React.Fragment>
          ))}
        </Grid>
      </>
    );
  }
}
