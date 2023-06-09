import {
  Box,
  Button,
  CardBody,
  CardFooter,
  Divider,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  Card,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import moment from "moment";
import React from "react";
import { Link } from "react-router-dom";
import { useBasket } from "../../contexts/BasketContext";

const MotionCard = motion(Card);
const MotionButton = motion(Button);

function Cards({ item }) {
  const { addToBasket, items } = useBasket();

  const findBasketItem = items.find(
    (basket_item) => basket_item._id === item._id
  );

  return (
    <MotionCard
      maxW="sm"
      border="1px"
      borderColor="gray.200"
      borderRadius="md"
      boxShadow="lg"
      backgroundColor="gray.50"
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.5 }}
    >
      <Link to={`/product/${item._id}`}>
        <Box p={4}>
          <CardBody>
            <Image
              src={item.photos[0]}
              alt="Product"
              borderRadius="lg"
              loading="lazy"
              boxSize={300}
              objectFit="cover"
            />
            <Stack mt="6" spacing="3">
              <Heading size="md">{item.title}</Heading>
              <Text>{moment(item.createdAt).format("DD/MM/YYYY")}</Text>
              <Text color="blue.600" fontSize="2xl">
                {item.price}$
              </Text>
            </Stack>
          </CardBody>
        </Box>
        <Divider />
      </Link>
      <CardFooter>
        <Flex justify="center" align="center" w="100%">
          {item.stock === 0 ? (
            <MotionButton
              variant="ghost"
              cursor={"not-allowed"}
              colorScheme="red"
              whileHover={{ scale: 1.1 }}
            >
              Out of stock
            </MotionButton>
          ) : (
            <MotionButton
              variant="solid"
              colorScheme={findBasketItem ? "red" : "whatsapp"}
              onClick={() => addToBasket(item, findBasketItem)}
              whileHover={{ scale: 1.1 }}
            >
              {findBasketItem ? "Remove from Basket" : "Add to Basket"}
            </MotionButton>
          )}
        </Flex>
      </CardFooter>
    </MotionCard>
  );
}

export default Cards;
