import { useQuery } from "@tanstack/react-query";
import { ISitterBookingList } from "../types";
import { getSitterBookings } from "../api";
import { useParams } from "react-router-dom";
import useHostOnlyPage from "../components/HostOnlyPage";
import ProtectedPage from "../components/ProtectedPage";
import { Avatar, Box, Grid, HStack, Text } from "@chakra-ui/react";

export default function SitterBookings() {
  const { sitterPk } = useParams();
  const { data } = useQuery<ISitterBookingList[]>(
    ["sitterBookings", sitterPk],
    getSitterBookings
  );

  console.log("Data:", data);

  useHostOnlyPage();

  return (
    <ProtectedPage>
      <Box pb={40} mt={10} marginLeft={10}>
        <Grid gap={10} templateColumns={{ sm: "1fr", md: "1fr 1fr" }}>
          {data?.map((sitterBooking) => (
            <HStack key={sitterBooking.pk}>
              <Avatar name={sitterBooking.user.name} size={"xl"} />
              <Box>
                {sitterBooking.user?.name && (
                  <Text display={"block"} as="b" noOfLines={1} fontSize="md">
                    Owner: {sitterBooking.user.name}
                  </Text>
                )}
                <Text display={"block"} noOfLines={2} fontSize="md">
                  From: {sitterBooking.check_in} To : {sitterBooking.check_out}
                </Text>
                <Text display={"block"} noOfLines={1} fontSize="md">
                  Pets: {sitterBooking.pets}
                </Text>
              </Box>
            </HStack>
          ))}
        </Grid>
      </Box>
    </ProtectedPage>
  );
}
