import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Grid,
  useEditable,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/react";
import Sitter from "../components/Sitter";
import SitterSkeleton from "../components/SitterSkeleton";
import { useQuery } from "@tanstack/react-query";
import {
  getMe,
  getOwner,
  getOwners,
  getSitters,
  getUserBookings,
} from "../api";
import { IOwner, ISitterList, IUser } from "../types";
import {
  FaRegCheckCircle,
  FaDog,
  FaChalkboardTeacher,
  FaUserNurse,
  FaBone,
} from "react-icons/fa";
import { color } from "framer-motion";

export default function Home() {
  const { isLoading, data } = useQuery<ISitterList[]>(["sitters"], getSitters);
  const { isLoading: isOwnerLoading, data: ownerData } = useQuery<IOwner[]>(
    ["owners"],
    getOwner
  );
  const { data: userData } = useQuery<IUser[]>(["users"], getMe);
  console.log(userData);

  const [filterCategory, setFilterCategory] = useState<number | null>(null);

  if (isLoading) {
    return (
      <Grid
        marginLeft={10}
        marginRight={10}
        mt={10}
        columnGap={5}
        templateColumns="repeat(auto-fit, minmax(0px, 1fr))"
      >
        <SitterSkeleton />
        <SitterSkeleton />
        <SitterSkeleton />
        <SitterSkeleton />
        <SitterSkeleton />
        <SitterSkeleton />
      </Grid>
    );
  }

  const handleFilterChange = (categoryPk: number | null) => {
    setFilterCategory(categoryPk);
  };

  const filteredSitters = filterCategory
    ? data?.filter((sitter) => sitter.category === filterCategory)
    : data;
  return (
    <Box>
      <Box>
        <HStack justifyContent={"center"} marginTop={5} marginBottom={12}>
          <Button
            marginRight={10}
            color="gray.500"
            onClick={() => handleFilterChange(null)}
            variant="unstyled"
            position="relative"
            _hover={{
              color: "black",
              transform: "scale(1.05)",
              opacity: 0.8,
              _before: {
                transform: "scaleX(1)",
              },
            }}
            _before={{
              content: '""',
              position: "absolute",
              bottom: "-35px", // Adjust this value to change the position
              left: 0,
              width: "100%",
              height: "2px",
              backgroundColor: "black", // Change this to the desired color of the line
              transform: "scaleX(0)",
              transformOrigin: "left",
              transition: "transform 0.2s ease",
            }}
          >
            <VStack>
              <FaRegCheckCircle size={30} />
              <Text fontWeight="medium" fontSize={15}>
                All Sitter
              </Text>
            </VStack>
          </Button>
          <Button
            marginRight={10}
            color="gray.500"
            onClick={() => handleFilterChange(1)}
            variant="unstyled"
            position="relative"
            _hover={{
              color: "black",
              transform: "scale(1.05)",
              opacity: 0.8,
              _before: {
                transform: "scaleX(1)",
              },
            }}
            _before={{
              content: '""',
              position: "absolute",
              bottom: "-35px", // Adjust this value to change the position
              left: 0,
              width: "100%",
              height: "2px",
              backgroundColor: "black", // Change this to the desired color of the line
              transform: "scaleX(0)",
              transformOrigin: "left",
              transition: "transform 0.2s ease",
            }}
          >
            <VStack>
              <FaDog size={30} />
              <Text fontWeight={"medium"} fontSize={15}>
                Friendly Sitter
              </Text>
            </VStack>
          </Button>
          <Button
            marginRight={10}
            color="gray.500"
            onClick={() => handleFilterChange(3)}
            variant="unstyled"
            position="relative"
            _hover={{
              color: "black",
              transform: "scale(1.05)",
              opacity: 0.8,
              _before: {
                transform: "scaleX(1)",
              },
            }}
            _before={{
              content: '""',
              position: "absolute",
              bottom: "-35px", // Adjust this value to change the position
              left: 0,
              width: "100%",
              height: "2px",
              backgroundColor: "black", // Change this to the desired color of the line
              transform: "scaleX(0)",
              transformOrigin: "left",
              transition: "transform 0.2s ease",
            }}
          >
            <VStack>
              <FaChalkboardTeacher size={30} />
              <Text fontWeight={"medium"} fontSize={15}>
                Dog Behaviourist
              </Text>
            </VStack>
          </Button>
          <Button
            marginRight={10}
            color="gray.500"
            onClick={() => handleFilterChange(4)}
            variant="unstyled"
            position="relative"
            _hover={{
              color: "black",
              transform: "scale(1.05)",
              opacity: 0.8,
              _before: {
                transform: "scaleX(1)",
              },
            }}
            _before={{
              content: '""',
              position: "absolute",
              bottom: "-35px", // Adjust this value to change the position
              left: 0,
              width: "100%",
              height: "2px",
              backgroundColor: "black", // Change this to the desired color of the line
              transform: "scaleX(0)",
              transformOrigin: "left",
              transition: "transform 0.2s ease",
            }}
          >
            <VStack>
              <FaUserNurse size={30} />
              <Text fontWeight={"medium"} fontSize={15}>
                Dog Nurse
              </Text>
              nutritionist
            </VStack>
          </Button>

          <Button
            color="gray.500"
            onClick={() => handleFilterChange(5)}
            variant="unstyled"
            position="relative"
            _hover={{
              color: "black",
              transform: "scale(1.05)",
              opacity: 0.8,
              _before: {
                transform: "scaleX(1)",
              },
            }}
            _before={{
              content: '""',
              position: "absolute",
              bottom: "-35px", // Adjust this value to change the position
              left: 0,
              width: "100%",
              height: "2px",
              backgroundColor: "black", // Change this to the desired color of the line
              transform: "scaleX(0)",
              transformOrigin: "left",
              transition: "transform 0.2s ease",
            }}
          >
            <VStack>
              <FaBone size={30} />
              <Text fontWeight={"medium"} fontSize={15}>
                Dog nutritionist
              </Text>
            </VStack>
          </Button>
        </HStack>
      </Box>
      {/* Add more buttons for other categories if needed */}
      <hr
        style={{
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)", // Add the shadow effect
        }}
      />
      <Grid
        marginLeft={10}
        marginRight={10}
        mt={10}
        columnGap={5}
        templateColumns={"repeat(auto-fit, minmax(250px, 1fr))"}
      >
        {filteredSitters?.map((sitter) => (
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
            category={sitter.category}
            is_liked={sitter.is_liked}
          />
        ))}
      </Grid>
      <Grid
        marginLeft={10}
        marginRight={10}
        mt={10}
        columnGap={5}
        templateColumns="repeat(auto-fit, minmax(250px, 1fr))"
      ></Grid>
    </Box>
  );
}
