import React from "react";
import { Box, Heading, Text, Divider, Image, Center } from "@chakra-ui/react";

const About = () => {
  return (
    <Box bg="gray.50" p={10}>
      <Center>
        <Image
          src="/skidialogo.png"
          alt="Company Logo"
          boxSize="400px"
          mb={4}
        />
      </Center>
      <Heading as="h1" size="lg" textAlign="center" color="black" my={4}>
        About Our Online Shop
      </Heading>

      <Text fontSize="md" color="gray.600" mb={4}>
        Our Online Shop was founded in 2023 with one simple goal: to bring you
        the best of the world's products, at the best prices, with the best
        customer service. We believe in making shopping easy and fun for our
        customers.
      </Text>

      <Divider my={4} />

      <Text fontSize="md" color="gray.600" mb={4}>
        We offer a wide range of products, from fashion and beauty to tech and
        homeware. We're always updating our product range to keep up with the
        latest trends and ensure we're offering the best quality items.
      </Text>

      <Divider my={4} />

      <Text fontSize="md" color="gray.600" mb={4}>
        We're dedicated to making your shopping experience as smooth and
        enjoyable as possible. We offer fast shipping, easy returns, and a
        customer service team that's ready to help you with any queries or
        concerns.
      </Text>

      <Divider my={4} />

      <Text fontSize="md" color="gray.600" mb={4}>
        Thank you for choosing Our Online Shop. We're glad to have you as a part
        of our community, and we look forward to serving you for many years to
        come.
      </Text>
    </Box>
  );
};

export default About;
