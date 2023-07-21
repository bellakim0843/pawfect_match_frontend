import {
  Box,
  Button,
  Grid,
  HStack,
  Heading,
  Image,
  Skeleton,
  SkeletonText,
  Text,
  VStack,
} from "@chakra-ui/react";

import Sitter from "../components/Sitter";
import SitterSkeleton from "../components/SitterSkeleton";
import { useQuery } from "@tanstack/react-query";
import { getSitters } from "../api";
import { Link } from "react-router-dom";
import { ISitterList } from "../types";

export default function Home() {
  const { isLoading, data } = useQuery<ISitterList[]>(["sitters"], getSitters);

  return (
    <Grid
      marginLeft={10}
      marginRight={10}
      mt={10}
      columnGap={5}
      rowGap={10}
      templateColumns={{
        sm: "1fr",
        md: "repeat(2, 1fr)",
        lg: "repeat(3, 1fr)",
        xl: "repeat(4, 1fr)",
        "2xl": "repeat(5, 1fr)",
      }}
    >
      {isLoading ? (
        <>
          <SitterSkeleton />
          <SitterSkeleton />
          <SitterSkeleton />
          <SitterSkeleton />
          <SitterSkeleton />
          <SitterSkeleton />
        </>
      ) : null}
      {data?.map((sitter) => (
        <Sitter
          pk={sitter.pk}
          key={sitter.pk}
          is_account={sitter.is_account}
          imageUrl={sitter.photos[0]?.file}
          name={sitter.name}
          rating={sitter.rating}
          city={sitter.city}
          country={sitter.country}
          price={sitter.price}
        />
      ))}
    </Grid>
  );
}