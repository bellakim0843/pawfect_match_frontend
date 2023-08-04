import { useQuery } from "@tanstack/react-query";
import { ISitterBookingList } from "../types";
import { getSitterBookings } from "../api";
import { useParams } from "react-router-dom";
import useHostOnlyPage from "../components/HostOnlyPage";
import ProtectedPage from "../components/ProtectedPage";
import {
  Avatar,
  Box,
  Button,
  Grid,
  HStack,
  Heading,
  Text,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import { Fade, ScaleFade, Slide, SlideFade, Collapse } from "@chakra-ui/react";
import { useState } from "react";

export default function SitterBookings() {
  const { sitterPk } = useParams();
  const { data } = useQuery<ISitterBookingList[]>(
    ["sitterBookings", sitterPk],
    getSitterBookings
  );

  useHostOnlyPage();

  function CollapseEx() {
    const [isOpenArray, setIsOpenArray] = useState<boolean[]>([]);

    // Function to handle the click event on a button
    const handleButtonClick = (index: number) => {
      setIsOpenArray((prev) => {
        const updatedArray = [...prev];
        updatedArray[index] = !updatedArray[index]; // Toggle the collapse state
        return updatedArray;
      });
    };

    return (
      <Grid
        gap={10}
        templateColumns={{
          sm: "1fr",
          md: "1fr",
          lg: "1fr 1fr",
          xl: "1fr 1fr 1fr",
        }}
      >
        {data?.map((sitterBooking, index) => (
          <VStack key={sitterBooking.pk} spacing={4}>
            <Button
              onClick={() => handleButtonClick(index)} // Pass the index to the click handler
              width={"100%"}
              minWidth={"500px"}
              maxWidth={"500px"}
              height={"160px"}
              borderRadius={"xl"}
            >
              <Avatar name={sitterBooking.user.name} size={"xl"} />

              <Box marginLeft={"20px"} marginRight={"30px"}>
                {sitterBooking.user?.name && (
                  <Text
                    display={"block"}
                    as="b"
                    noOfLines={1}
                    fontSize="lg"
                    marginBottom={3}
                  >
                    Owner: {sitterBooking.user.name}
                  </Text>
                )}
                <Text display={"block"} noOfLines={1} fontSize="lg">
                  From: {sitterBooking.check_in}
                </Text>
                <Text display={"block"} noOfLines={1} fontSize="lg">
                  To : {sitterBooking.check_out}
                </Text>
              </Box>
            </Button>
            <Collapse in={isOpenArray[index]} animateOpacity>
              <Box
                p="40px"
                color="black"
                bg="orange.100"
                rounded="xl"
                shadow="md"
                minWidth={"490px"}
                maxWidth={"490px"}
              >
                <Text
                  display={"block"}
                  noOfLines={1}
                  fontSize="lg"
                  marginBottom={1}
                >
                  Pet name: {sitterBooking.owner.pet_name}
                </Text>
                <Text
                  display={"block"}
                  noOfLines={1}
                  fontSize="lg"
                  marginBottom={1}
                >
                  Pet age: {sitterBooking.owner.pet_age}
                </Text>
                <Text
                  display={"block"}
                  noOfLines={1}
                  fontSize="lg"
                  marginBottom={1}
                >
                  Pet gender: {sitterBooking.owner.pet_gender}
                </Text>
                <Text
                  display={"block"}
                  noOfLines={1}
                  fontSize="lg"
                  marginBottom={1}
                >
                  Pet Weight: {sitterBooking.owner.pet_weight}
                </Text>
                <Text
                  display={"block"}
                  noOfLines={1}
                  fontSize="lg"
                  marginBottom={1}
                >
                  Pet Breed: {sitterBooking.owner.pet_breed}
                </Text>
                <Text display={"block"} noOfLines={5} fontSize="lg">
                  Pet Description: {sitterBooking.owner.pet_description}
                </Text>
              </Box>
            </Collapse>
          </VStack>
        ))}
      </Grid>
    );
  }

  return (
    <ProtectedPage>
      <Box pb={40} margin={10}>
        <Heading marginBottom={10}>Booking List</Heading>
        <CollapseEx />
      </Box>
    </ProtectedPage>
  );
}
