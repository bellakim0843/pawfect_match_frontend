import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { checkBooking, getSitter, getSitterReviews } from "../api";
import { IReview, ISitterDetail } from "../types";
import type { Value } from "react-calendar/dist/cjs/shared/types";
import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  GridItem,
  HStack,
  Heading,
  Image,
  Skeleton,
  Text,
  VStack,
} from "@chakra-ui/react";
import { FaStar } from "react-icons/fa";
import { useEffect, useState } from "react";

export default function SitterDetail() {
  const { sitterPk } = useParams();
  const { isLoading: isSitterLoading, data: sitterData } =
    useQuery<ISitterDetail>([`sitters`, sitterPk], getSitter);
  const { isLoading: isReviewsLoading, data: reviewsData } = useQuery<
    IReview[]
  >([`sitter`, sitterPk, `reviews`], getSitterReviews);
  const [dates, setDates] = useState<Date[] | undefined>();
  const { isLoading: isBookingChecking, data: checkBookingData } = useQuery(
    ["check", sitterPk, dates],
    checkBooking,
    {
      cacheTime: 0,
      enabled: dates !== undefined,
    }
  );
  const handleDateChange = (value: any) => {
    setDates(value);
  };

  console.log(isBookingChecking, dates);

  return (
    <Box
      mt={10}
      px={{
        base: 10,
        lg: "12vh",
      }}
      width={"100%"}
    >
      <Skeleton height={"43px"} width="50%" isLoaded={!isSitterLoading}>
        <Heading>{sitterData?.name}</Heading>
      </Skeleton>
      <Grid
        mt={8}
        rounded="xl"
        overflow={"hidden"}
        gap={2}
        aspectRatio={2}
        width="100%"
        templateRows={"1fr 1fr"}
        templateColumns={"repeat(4, 1fr)"}
      >
        {[0, 1, 2, 3, 4].map((index) => (
          <GridItem
            colSpan={index === 0 ? 2 : 1}
            rowSpan={index === 0 ? 2 : 1}
            overflow={"hidden"}
            key={index}
          >
            <Skeleton isLoaded={!isSitterLoading} h="100%" w="100%">
              {sitterData?.photos && sitterData.photos.length > 0 ? (
                <Image
                  objectFit={"cover"}
                  w="100%"
                  h="100%"
                  src={sitterData?.photos[index].file}
                />
              ) : null}
            </Skeleton>
          </GridItem>
        ))}
      </Grid>

      <Grid gap={20} templateColumns={"2fr 1fr"} maxW="container.lg">
        <Box>
          <HStack width={"50%"} justifyContent={"space-between"} mt={10}>
            <VStack alignItems={"flex-start"}>
              <Skeleton
                isLoaded={!isSitterLoading}
                width={"300px"}
                height={"30px"}
              >
                <Heading>Good sitter</Heading>
              </Skeleton>
              <Skeleton isLoaded={!isSitterLoading} height={"30px"}>
                <HStack alignItems={"flex-start"} w="100%">
                  <Text>
                    {sitterData?.price} {sitterData?.city},{" "}
                    {sitterData?.country}
                  </Text>
                </HStack>
              </Skeleton>
            </VStack>
            <Avatar
              alignContent={"flex-end"}
              size={"lg"}
              name={sitterData?.name}
            />
          </HStack>

          <Box mt={10}>
            <Heading mb={5} fontSize={"2xl"}>
              <HStack>
                <FaStar />
                <Text> {sitterData?.rating}</Text>
                <Text>
                  {reviewsData?.length} review
                  {reviewsData?.length === 1 ? "" : "s"}
                </Text>
              </HStack>
            </Heading>
            <Container mt={16} maxW="container.lg" marginX="none" mb={20}>
              <Grid gap={10} templateColumns={"1fr 1fr"}>
                {reviewsData?.map((review, index) => (
                  <VStack alignItems={"flex-start"} key={index}>
                    <HStack>
                      <Avatar name={review.user.name} size="md" />
                      <VStack spacing={0} alignItems={"flex-start"}>
                        <Heading fontSize={"md"}>{review.user.name}</Heading>
                        <HStack spacing={1}>
                          <FaStar size="12px" />
                          <Text>{review.rating}</Text>
                        </HStack>
                      </VStack>
                    </HStack>
                    <Text>{review.payload}</Text>
                  </VStack>
                ))}
              </Grid>
            </Container>
          </Box>
        </Box>
        <Box pt={30}>
          <Calendar
            onChange={handleDateChange}
            next2Label={null}
            minDetail="month"
            minDate={new Date()}
            maxDate={new Date(Date.now() + 60 * 60 * 24 * 7 * 4 * 6 * 1000)}
            selectRange
          />
          <Button
            my={5}
            w="100%"
            colorScheme={"red"}
            isLoading={isBookingChecking}
            isDisabled={!checkBookingData?.ok}
          >
            Make booking
          </Button>
          {!isBookingChecking && !checkBookingData?.ok ? (
            <Text color="red.500">Can't book on those dates, sorry.</Text>
          ) : null}
        </Box>
      </Grid>
    </Box>
  );
}
