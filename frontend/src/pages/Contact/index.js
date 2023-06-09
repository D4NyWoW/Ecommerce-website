import React from "react";
import { useForm } from "react-hook-form";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
  Image,
} from "@chakra-ui/react";
import { motion } from "framer-motion";

const MotionBox = motion(Box);
const MotionFormControl = motion(FormControl);

function ContactMe() {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    window.location.href = `mailto:f_seby@yahoo.com?subject=Contact Request&body=Name: ${data.name}%0D%0AEmail: ${data.email}%0D%0AComment: ${data.comment}`;
  };

  const formVariants = {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
  };

  return (
    <Box display="flex" justifyContent="space-between">
      <MotionBox
        as="form"
        onSubmit={handleSubmit(onSubmit)}
        initial="hidden"
        animate="visible"
        variants={formVariants}
        width="65%"
        p="5"
        boxShadow="base"
        borderRadius="md"
        bg="white"
      >
        <MotionFormControl id="name" mb="3" variants={formVariants}>
          <FormLabel>Name</FormLabel>
          <Input type="text" {...register("name")} required />
        </MotionFormControl>

        <MotionFormControl id="email" mb="3" variants={formVariants}>
          <FormLabel>Email</FormLabel>
          <Input type="email" {...register("email")} required />
        </MotionFormControl>

        <MotionFormControl id="comment" variants={formVariants}>
          <FormLabel>Comment</FormLabel>
          <Input as="textarea" {...register("comment")} required />
        </MotionFormControl>

        <Button
          colorScheme="teal"
          variant="outline"
          type="submit"
          mt="6"
          width="100%"
        >
          Submit
        </Button>

        <Text mt="6">
          <strong>Phone:</strong> +123456789
        </Text>
        <Text>
          <strong>Email:</strong> info@example.com
        </Text>
      </MotionBox>

      <Box
        width="30%"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Image src="/skidialogo.png" alt="Logo" />
      </Box>
    </Box>
  );
}

export default ContactMe;
