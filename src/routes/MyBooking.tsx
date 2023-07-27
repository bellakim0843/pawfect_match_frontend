import { useState } from "react";
import { Box, Button, Grid, HStack, Heading, Text } from "@chakra-ui/react";
import BookingSitter from "../components/BookingSitter";
import { useQuery } from "@tanstack/react-query";
import { getUserBookings } from "../api";
import { IUserBookingList } from "../types";
import { FaRegCalendarCheck } from "react-icons/fa6";

export default function MyBooking() {
  const { data } = useQuery<IUserBookingList[]>(
    ["myBookings"],
    getUserBookings
  );
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const toggleSortOrder = () => {
    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  // Sort the data by the 'check_in' date
  const sortedData = data?.sort((a, b) => {
    const dateA = new Date(a.check_in).getTime();
    const dateB = new Date(b.check_in).getTime();
    return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
  });

  return (
    <Box>
      <Box
        marginTop={0}
        justifyContent={"center"}
        display="flex"
        borderBottomWidth={1}
        style={{
          boxShadow: "0px 1px 4px rgba(0, 0, 0, 0.2)", // Add the shadow effect
        }}
        paddingTop={20}
        paddingBottom={20}
      >
        <Heading fontSize={"5.5vh"} fontWeight={500}>
          <HStack>
            <FaRegCalendarCheck size={40} /> <Text> Booking Status</Text>
          </HStack>
        </Heading>
      </Box>
      <Box
        paddingTop={20}
        width={"100%"}
        justifyContent={"center"}
        display="flex"
      >
        <Button margin={3} onClick={() => setSortOrder("asc")}>
          Sort By First Date
        </Button>
        <Button margin={3} onClick={() => setSortOrder("desc")}>
          Sort By Last Date
        </Button>
      </Box>
      <Grid
        mt={20}
        px={{
          base: 10,
          lg: 20,
        }}
        templateColumns={{
          sm: "1fr",
          md: "1fr",
          lg: "1fr 1fr",
        }}
      >
        {sortedData?.map((bookingSitter) => (
          <BookingSitter
            sitterPk={bookingSitter.sitter?.pk}
            pk={bookingSitter.pk}
            imageUrl={bookingSitter.sitter.photos[0]?.file}
            name={bookingSitter.sitter.name}
            city={bookingSitter.sitter.city}
            country={bookingSitter.sitter.country}
            check_in={bookingSitter.check_in}
            check_out={bookingSitter.check_out}
            pets={bookingSitter.pets}
          />
        ))}
      </Grid>
    </Box>
  );
}
