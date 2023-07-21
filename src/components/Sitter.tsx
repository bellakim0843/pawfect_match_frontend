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

interface SitterProps {
  imageUrl: string;
  name: string;
  rating: number;
  city: string;
  country: string;
  price: number;
  pk: number;
  is_account: boolean;
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
        >
          {imageUrl ? (
            <Image minH="280" src={imageUrl} />
          ) : (
            <Box minH="280" aspectRatio={1} p={10} bg="gray.400"></Box>
          )}
          <Button
            variant={"unstyled"}
            position={"absolute"}
            top={0}
            right={0}
            onClick={onCameraClick}
            color={"white"}
          >
            {is_account ? (
              <FaCamera size={"20px"} />
            ) : (
              <FaRegHeart size={"20px"} />
            )}
          </Button>
        </Box>
        <Box>
          <Grid gap={2} templateColumns={"4.5fr 1fr"}>
            <Text display={"block"} as="b" noOfLines={1} fontSize={"md"}>
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
          <Text fontSize={"sm"} color={gray}>
            {city}/{country}
          </Text>
        </Box>
        <Text fontSize={"sm"} color={gray}>
          <Text as="b">€{price}</Text>/ day
        </Text>
      </VStack>
    </Link>
  );
}
