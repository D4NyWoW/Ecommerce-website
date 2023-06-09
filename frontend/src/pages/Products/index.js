import { Box, Button, Flex, Grid, Input, VStack } from "@chakra-ui/react";
import MultiRangeSlider from "multi-range-slider-react";
import React, { useEffect, useState } from "react";
import { useInfiniteQuery } from "react-query";
import { useParams } from "react-router-dom";
import { fetchProductList } from "../../api.js";
import Cards from "../../components/Card";

function Products() {
  const { category } = useParams();
  const [search, setSearch] = useState("");
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(1000);
  const [filteredData, setFilteredData] = useState([]);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery(
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
      products = products.filter(
        (product) => product.price >= minValue && product.price <= maxValue
      );
      setFilteredData(products);
    }
  }, [data, search, minValue, maxValue, category]);

  useEffect(() => {
    if (data) {
      setMaxValue(Math.max(...data.pages.flat().map((item) => item.price)));
    }
  }, [data]);

  const handleInput = (e) => {
    setMinValue(e.minValue);
    setMaxValue(e.maxValue);
  };

  return (
    <VStack align={"flex-start"}>
      <VStack
        justifyContent="space-between"
        alignItems="center"
        w={"20%"}
        mb="4"
      >
        <Input
          placeholder="Search by name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <VStack w="100%" align={"start"}>
          <Box>Select price range</Box>
          <MultiRangeSlider
            style={{ width: "100%" }}
            min={0}
            max={100}
            step={5}
            minValue={minValue}
            maxValue={maxValue}
            onInput={(e) => {
              handleInput(e);
            }}
          />
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
      </Flex>
      <Flex mt="10" justifyContent="center" align={"center"} w="100%">
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
    </VStack>
  );
}

export default Products;
