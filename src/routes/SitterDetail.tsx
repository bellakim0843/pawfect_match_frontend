import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { checkBooking, getSitter, getSitterReviews } from "../api";
import { IReview, ISitterDetail, ICategory } from "../types";
import Service from "../components/Service";
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
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
} from "@chakra-ui/react";
import { useBreakpointValue } from "@chakra-ui/react";
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

  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  const handleImageClick = (photoFile: string) => {
    setSelectedPhoto(photoFile);
  };

  const closeModal = () => {
    setSelectedPhoto(null);
  };

  const isLgScreen = useBreakpointValue({ base: false, md: true });

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
        <Heading marginLeft={5}>{sitterData?.category.category_name}</Heading>
      </Skeleton>
      <Grid
        mt={8}
        rounded="xl"
        overflow={"hidden"}
        gap={2}
        aspectRatio={2}
        width="100%"
        minWidth={"30%"}
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
                  onClick={() =>
                    handleImageClick(sitterData?.photos[index].file)
                  }
                  cursor="pointer" // Add cursor pointer to indicate the image is clickable
                />
              ) : null}
            </Skeleton>
          </GridItem>
        ))}
      </Grid>

      <Grid
        gap={20}
        templateColumns={{
          sm: "1fr",
          md: "3fr 2fr",
          lg: "3fr 2fr",
          xl: "3fr 2fr",
        }}
        maxW="container.xl"
      >
        <Box
          marginTop={5}
          marginLeft={2}
          backgroundColor={"red"}
          minH={"fit-content"}
        >
          <HStack width={"87%"} justifyContent={"space-between"}>
            <VStack width={"90%"} alignItems={"flex-start"}>
              <Skeleton
                isLoaded={!isSitterLoading}
                width={"300px"}
                height={"30px"}
              >
                <Heading fontSize={"40px"}>{sitterData?.name}</Heading>
              </Skeleton>
              <Skeleton isLoaded={!isSitterLoading} height={"30px"}>
                <VStack
                  backgroundColor={"yellow"}
                  minWidth={"360px"}
                  maxWidth={"500px"}
                  minH={"fit-content"}
                >
                  <HStack marginTop={4} alignItems={"flex-start"} w="100%">
                    <Text fontSize={"20px"} fontWeight={"bold"}>
                      {sitterData?.price} {sitterData?.city},{" "}
                      {sitterData?.country}
                    </Text>
                  </HStack>
                  <VStack
                    marginTop={5}
                    marginLeft={5}
                    width={"100%"}
                    backgroundColor={"purple.500"}
                    alignItems={"flex-start"}
                  >
                    <Text fontWeight={800} fontSize={"23px"}>
                      {sitterData?.services.length} service
                      {sitterData?.services.length === 1 ? "" : "s"}
                    </Text>
                    <Service />
                  </VStack>
                  <Text marginTop={5} marginBottom={10} marginLeft={5}>
                    {sitterData?.description}
                  </Text>
                  <Box minWidth={"300px"} backgroundColor={"green"}>
                    <Heading mb={5} fontSize={"2xl"}>
                      <HStack>
                        <FaStar />
                        <Text> {sitterData?.rating}</Text>
                        <Text>
                          · {reviewsData?.length} review
                          {reviewsData?.length === 1 ? "" : "s"}
                        </Text>
                      </HStack>
                    </Heading>
                    <Container
                      mt={8}
                      maxW="container.lg"
                      marginX="none"
                      mb={20}
                    >
                      <Grid
                        gap={10}
                        templateColumns={{
                          sm: "1fr",
                        }}
                      >
                        {reviewsData?.map((review, index) => (
                          <VStack alignItems={"flex-start"} key={index}>
                            <HStack>
                              <Avatar name={review.user.name} size="md" />
                              <VStack spacing={0} alignItems={"flex-start"}>
                                <Heading fontSize={"md"}>
                                  {review.user.name}
                                </Heading>
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
                </VStack>
              </Skeleton>
            </VStack>
            <Avatar
              alignContent={"flex-end"}
              size={"lg"}
              name={sitterData?.name}
            />
          </HStack>
        </Box>
        {isLgScreen && (
          <Box
            backgroundColor={"blue"}
            marginLeft={-20}
            mt={8}
            paddingX={4}
            paddingY={6}
            borderRadius="xl"
          >
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
        )}
      </Grid>
      <Modal isOpen={selectedPhoto !== null} onClose={closeModal} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            {selectedPhoto && (
              <Image
                objectFit="contain"
                w="100%"
                h="100%"
                src={selectedPhoto}
              />
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
}
