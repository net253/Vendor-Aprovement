import React from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { Box } from "@chakra-ui/react";
import { motion } from "framer-motion";

export default function ContentWarpper({ content: Content, page: Page }) {
  const pageTransition = {
    ease: "anticipate",
    type: "tween",
  };

  return (
    <>
      <Box bg="#eee" height="100vh">
        <Navbar page={Page} />

        <Box h="92vh" px={3} py={1}>
          <Box
            bg="white"
            rounded="xl"
            h="100%"
            shadow="md"
            px={3}
            overflowY="auto"
          >
            <motion.div
              initial={{ opacity: 0, y: "1%" }}
              animate={{ opacity: 1, y: "0%" }}
              exit={{ opacity: 0, y: "1%" }}
              transition={pageTransition}
            >
              <Content />
            </motion.div>
          </Box>
        </Box>
        <Footer />
      </Box>
    </>
  );
}
