import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { fetchProduct } from "../../api";
import ImageGallery from "react-image-gallery";
import {
  Card,
  Stack,
  Heading,
  Text,
  Button,
  CardBody,
  CardFooter,
} from "@chakra-ui/react";
import { useBasket } from "../../contexts/BasketContext";
import { motion } from "framer-motion";

// Adding framer motion component
const MotionCard = motion(Card);

function ProductDetail() {
  const { product_id } = useParams();
  const { addToBasket, items } = useBasket();

  const { isLoading, isError, data } = useQuery(["product", product_id], () =>
    fetchProduct(product_id)
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error...</div>;
  }

  const findBasketItem = items.find((item) => item._id === product_id);
  const images = data.photos.map((url) => ({ original: url }));

  return (
    <div>
      {/* Adding animations to the Card component */}
      <MotionCard
        direction={{ base: "column", sm: "row" }}
        overflow="hidden"
        variant="outline"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }} // How the element will animate when it's removed from the tree
        transition={{ duration: 1 }} // The speed of the animation
      >
        <ImageGallery items={images} showThumbnails={false} />

        <Stack>
          <CardBody>
            <Heading size="md">{data.title}</Heading>

            <Text maxWidth={400} py="2">
              {data.description}
            </Text>
            <Text color="blue.600" fontSize="2xl">
              {data.price}$
            </Text>
          </CardBody>

          <CardFooter>
            <Button
              variant="solid"
              colorScheme={findBasketItem ? "red" : "whatsapp"}
              onClick={() => addToBasket(data, findBasketItem)}
            >
              {findBasketItem ? "Remove from basket" : "Add to Basket"}
            </Button>
          </CardFooter>
        </Stack>
      </MotionCard>
    </div>
  );
}

export default ProductDetail;
