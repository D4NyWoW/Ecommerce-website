import React, { useState, useEffect } from "react";
import Cards from "../../components/Card";
import {
  Grid,
  Box,
  Flex,
  Button,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Input,
  VStack,
} from "@chakra-ui/react";
import { useInfiniteQuery } from "react-query";
import { fetchProductList } from "../../api.js";
import { useParams } from "react-router-dom";

function Products() {
  const { category } = useParams();
  const [search, setSearch] = useState("");
  const [price, setPrice] = useState(0);
  const [filteredData, setFilteredData] = useState([]);

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery(
    ["products", category],
    (page) => fetchProductList({ page, category }),
    {
      getNextPageParam: (lastGroup, allGroups) => {
        const morePagesExist = lastGroup?.length === 12;

        if (!morePagesExist) {
          return;
        } else {
          return allGroups.length + 1;
        }
      },
    }
  );

  useEffect(() => {
    if (data) {
      let products = data.pages.flat();
      if (search) {
        products = products.filter((product) =>
          product.title.toLowerCase().includes(search.toLowerCase())
        );
      }
      if (price > 0) {
        products = products.filter((product) => product.price <= price);
      }
      setFilteredData(products);
    }
  }, [data, search, price]);

  if (status === "loading") return "Loading...";
  if (status === "error") return "An error has occurred: " + error.message;

  return (
    <VStack align={"flex-start"}>
      <VStack
        justifyContent="space-between"
        alignItems="center"
        w={"40%"}
        mb="4"
      >
        <Input
          placeholder="Search by name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <VStack w="100%" align={"start"}>
          <Box>Select price range</Box>
          <Slider
            colorScheme="red"
            defaultValue={0}
            min={0}
            max={500}
            onChange={(val) => setPrice(val)}
          >
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb boxSize={6}>
              <Box color="tomato" />
            </SliderThumb>
          </Slider>
        </VStack>
      </VStack>
      <Flex align={"center"} w="100%">
        <Box className="products">
          <Box display="flex" justifyContent="space-between" p="4"></Box>
          <Grid templateColumns={["1fr", "2fr", "repeat(3,1fr)"]} gap={4}>
            {filteredData.map((item) => (
              <Box w="100%" key={item._id}>
                <Cards item={item} />
              </Box>
            ))}
          </Grid>
        </Box>
        <Flex mt="10" justifyContent="center">
          <Button
            onClick={() => fetchNextPage()}
            isLoading={isFetchingNextPage}
            disabled={!hasNextPage || isFetchingNextPage}
          >
            {isFetchingNextPage
              ? "Loading more..."
              : hasNextPage
              ? "Load More"
              : "Nothing more to load"}
          </Button>
        </Flex>
      </Flex>
    </VStack>
  );
}

export default Products;
