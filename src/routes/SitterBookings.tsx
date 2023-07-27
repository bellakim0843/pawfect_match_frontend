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
      <Box pb={40} mt={10} px={{ base: 10, lg: 40 }}>
        <Grid gap={10} templateColumns={"1fr 1fr"}>
          {data?.map((sitterBooking) => (
            <HStack key={sitterBooking.pk}>
              <Avatar name={sitterBooking.user.name} size={"xl"} />
              <Box>
                {sitterBooking.user?.name && (
                  <Text display={"block"} as="b" noOfLines={1} fontSize="md">
                    Reservation name: {sitterBooking.user.name}
                  </Text>
                )}
                <Text display={"block"} noOfLines={1} fontSize="md">
                  Reservation Period: {sitterBooking.check_in} ~{" "}
                  {sitterBooking.check_out}
                </Text>
                <Text display={"block"} noOfLines={1} fontSize="md">
                  Guests: {sitterBooking.pets}
                </Text>
              </Box>
            </HStack>
          ))}
        </Grid>
      </Box>
    </ProtectedPage>
  );
}
