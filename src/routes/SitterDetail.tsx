import { useMutation, useQuery } from "@tanstack/react-query";
import { Link, useParams, useNavigate } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../calendar.css";
import { IReview, ISitterDetail, ICategory, IUser } from "../types";
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
  InputGroup,
  InputLeftAddon,
  Select,
  Skeleton,
  Text,
  VStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  useToast,
  Input,
} from "@chakra-ui/react";

import {
  ISitterBookingError,
  ISitterBookingSuccess,
  ISitterBookingVariables,
  checkBooking,
  getMe,
  getSitter,
  getSitterReviews,
  sitterBooking,
} from "../api";

import { useBreakpointValue } from "@chakra-ui/react";
import { FaBookOpen, FaEdit, FaStar, FaUserFriends } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet";
import { formatDate } from "../lib/utils";

export default function SitterDetail() {
  const { register, handleSubmit } = useForm<ISitterBookingVariables>();
  const { sitterPk } = useParams();
  const { userPk } = useParams();
  const { data: userData } = useQuery<IUser>([`users`, userPk], getMe);
  console.log(userData);
  const { isLoading: isSitterLoading, data: sitterData } =
    useQuery<ISitterDetail>([`sitters`, sitterPk], getSitter);
  const { data: reviewsData } = useQuery<IReview[]>(
    [`sitter`, sitterPk, `reviews`],
    getSitterReviews
  );
  const [dates, setDates] = useState<any>();
  const { data: checkBookingData, isLoading: isCheckingBooking } = useQuery(
    ["check", sitterPk, dates],
    checkBooking,
    {
      cacheTime: 0,
      enabled: dates !== undefined,
    }
  );
  const navigate = useNavigate();
  const onEditClick = (event: React.SyntheticEvent<HTMLButtonElement>) => {
    event.preventDefault(); // click이 링크로 전파되는것을 방지(버블링 방지)한다.
    navigate(`/sitters/${sitterData?.id}/edit`);
  };

  const onBookingUsersClick = (
    event: React.SyntheticEvent<HTMLButtonElement>
  ) => {
    event.preventDefault(); // click이 링크로 전파되는것을 방지(버블링 방지)한다.
    navigate(`/sitters/${sitterData?.id}/bookings`);
  };

  const toast = useToast();
  const sitterBookingMutation = useMutation<
    ISitterBookingSuccess,
    ISitterBookingError,
    ISitterBookingVariables
  >(sitterBooking, {
    onSuccess: (data) => {
      toast({
        title: "Booking complete!",
        description: `From: ${data.check_in} To: ${data.check_out} Booking Completed`,
        status: "success",
        position: "bottom-right",
      });
    },
  });
  const doBooking = (data: ISitterBookingVariables) => {
    if (dates && sitterPk) {
      const [firstDate, secondDate] = dates;
      const checkIn = formatDate(firstDate);
      const checkOut = formatDate(secondDate);
      data.check_in = checkIn;
      data.check_out = checkOut;
      data.sitterPk = sitterPk;
      sitterBookingMutation.mutate(data);
    }
  };

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
      <Helmet>
        <title>{sitterData ? sitterData.name : "Loading..."}</title>
      </Helmet>
      <Skeleton height={"43px"} width="50%" isLoaded={!isSitterLoading}>
        <HStack>
          <Heading marginLeft={5}>{sitterData?.category.category_name}</Heading>
          <Button variant={"unstyled"} onClick={onEditClick}>
            {sitterData?.is_account ? <FaEdit size={25} /> : null}
          </Button>
          <Button variant={"unstyled"} onClick={onBookingUsersClick}>
            {sitterData?.is_account ? <FaBookOpen size={25} /> : null}
          </Button>
        </HStack>
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
          // backgroundColor={"red"}
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
                  // backgroundColor={"yellow"}
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
                    borderTop={"2px"}
                    borderTopColor={"gray.300"}
                    marginTop={5}
                    width={"100%"}
                    // backgroundColor={"purple.500"}
                    alignItems={"flex-start"}
                  >
                    <Text marginTop={10} fontWeight={800} fontSize={"23px"}>
                      {sitterData?.services.length} service
                      {sitterData?.services.length === 1 ? "" : "s"}
                    </Text>
                    <Service />
                  </VStack>

                  <Box borderTop={"2px"} borderTopColor={"gray.300"}>
                    <Text marginTop={10} marginBottom={10} marginLeft={5}>
                      {sitterData?.description}
                    </Text>
                  </Box>
                  <Box
                    minWidth={"300px"}
                    borderTop={"2px"}
                    borderTopColor={"gray.300"}
                  >
                    <Heading marginTop={10} mb={5} fontSize={"2xl"}>
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
        {!userData?.is_sitter ? (
          <>
            {isLgScreen && (
              <Box
                marginLeft={-20}
                mt={8}
                paddingX={4}
                paddingY={6}
                borderRadius="xl"
              >
                <Calendar
                  goToRangeStartOnSelect
                  onChange={setDates}
                  next2Label={null}
                  minDetail="month"
                  minDate={new Date()}
                  maxDate={
                    new Date(Date.now() + 60 * 60 * 24 * 7 * 4 * 6 * 1000)
                  }
                  selectRange
                />
                <Grid
                  templateColumns={"1fr"}
                  as={"form"}
                  onSubmit={handleSubmit(doBooking)}
                >
                  <HStack mt={5} mb={2}>
                    <Text>Pets</Text>
                    <InputGroup>
                      <InputLeftAddon children={<FaUserFriends />} />
                      <Select
                        {...register("pets", { required: true })}
                        defaultValue={1}
                        w={"55%"}
                      >
                        {[1, 2, 3, 4, 5].map((guest) => (
                          <option key={guest} value={guest}>
                            {guest}
                          </option>
                        ))}
                      </Select>
                    </InputGroup>
                    <InputGroup>
                      <Input placeholder="Pet"></Input>
                    </InputGroup>
                  </HStack>
                  <Button
                    type={"submit"}
                    isDisabled={!checkBookingData?.ok}
                    isLoading={isCheckingBooking && dates !== undefined}
                    w={"70%"}
                    colorScheme={"red"}
                  >
                    Make Booking
                  </Button>
                  {!isCheckingBooking && !checkBookingData?.ok ? (
                    <Text color="red.500">
                      Can't book on those dates, sorry.
                    </Text>
                  ) : null}
                </Grid>
              </Box>
            )}
          </>
        ) : null}
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
