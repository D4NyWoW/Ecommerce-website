import { Center, Container, Flex, Image, Text } from "@chakra-ui/react";
import React from "react";

const Footer = () => {
  return (
    <Flex as="footer" role="contentinfo" py="6" w="100%" justify={"start"}>
      <Container maxW="container.md" centerContent>
        <Center>
          <Image src="/skidialogo.png" alt="Company Logo" boxSize="50px" />
        </Center>
        <Text fontSize="sm" color="gray.500" textAlign="center">
          © {new Date().getFullYear()} Skidia. All rights reserved.
        </Text>
      </Container>
    </Flex>
  );
};

export default Footer;
