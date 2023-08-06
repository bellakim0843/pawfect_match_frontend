import { FaStar, FaRegHeart, FaCamera } from "react-icons/fa";
import {
  Box,
  Button,
  Grid,
  HStack,
  Image,
  Text,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { getSitter } from "../api";
import SitterDetail from "../routes/SitterDetail";

interface SitterProps {
  imageUrl: string;
  name: string;
  rating: number;
  city: string;
  country: string;
  price: number;
  pk: number;
  is_account: boolean;
  category: number;
  is_liked: boolean;
}

export default function Sitter({
  pk,
  imageUrl,
  name,
  rating,
  city,
  country,
  price,
  is_account,
  category,
  is_liked,
}: SitterProps) {
  const gray = useColorModeValue("gray.600", "gray.300");
  const navigate = useNavigate();

  const onCameraClick = (event: React.SyntheticEvent<HTMLButtonElement>) => {
    event.preventDefault();
    navigate(`/sitters/${pk}/photos`);
  };

  return (
    <Link to={`/sitters/${pk}`}>
      {" "}
      <VStack spacing={-0.5} alignItems={"flex-start"}>
        <Box
          w="100%"
          position="relative"
          overflow={"hidden"}
          mb={3}
          rounded="2xl"
          aspectRatio={1}
          maxHeight={"100%"}
          maxWidth={"100%"}
        >
          {imageUrl ? (
            <Image objectFit="cover" w="100%" h="100%" src={imageUrl} />
          ) : (
            <Box aspectRatio={1} p={10} bg="gray.400"></Box>
          )}
          {is_account ? (
            <Button
              variant={"unstyled"}
              position={"absolute"}
              top={0}
              right={0}
              onClick={onCameraClick}
              color={"white"}
            >
              <FaCamera size={"20px"} />
            </Button>
          ) : null}
        </Box>
        <Box>
          <Grid gap={2} templateColumns={"4.5fr 1fr"}>
            <Text
              display={"block"}
              as="b"
              noOfLines={1}
              fontSize={"20px"}
              paddingLeft={1}
            >
              {name}
            </Text>
            <HStack
              marginLeft={10}
              _hover={{
                color: "red",
              }}
              spacing={1}
            >
              <FaStar size={20} />
              <Text>{rating}</Text>
            </HStack>
          </Grid>
          <Text fontSize={"md"} color={gray} paddingLeft={1} marginBottom={1}>
            {city}/{country}
          </Text>
        </Box>
        <Text marginBottom={10} fontSize={"sm"} color={gray} paddingLeft={1}>
          <Text as="b">€{price}</Text>/ day
        </Text>
      </VStack>
    </Link>
  );
}
