import {
  Box,
  Grid,
  HStack,
  Heading,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { sitterBooking } from "../api";

interface ISitterProps {
  sitterPk: number;
  pk: number;
  imageUrl: string;
  name: string;
  city: string;
  country: string;
  check_in: string;
  check_out: string;
  pets: number;
}

export default function BookingSitter({
  sitterPk,
  pk,
  imageUrl,
  name,
  city,
  country,
  check_in,
  check_out,
  pets,
}: ISitterProps) {
  return (
    <Box>
      <Grid>
        <Link to={`/sitters/${sitterPk}`}>
          <Box
            _hover={{
              color: "black",
              transform: "scale(1.05)",
              opacity: 0.8,
              _before: {
                transform: "scaleX(1)",
              },
            }}
            marginRight={15}
          >
            <HStack
              paddingTop={6}
              borderBottom={"2px"}
              borderColor={"gray.300"}
              marginRight={10}
            >
              <Box
                overflow={"hidden"}
                rounded={"50%"}
                aspectRatio={1}
                marginBottom={10}
                marginTop={5}
                maxHeight={"300px"}
              >
                {imageUrl ? (
                  <Image
                    objectFit="cover"
                    w="100%"
                    h="100%"
                    maxHeight={"300px"}
                    src={imageUrl}
                  />
                ) : (
                  <Box bg="gray.400" />
                )}
              </Box>
              <Box>
                <VStack
                  marginLeft={5}
                  width={"100%"}
                  fontSize={{
                    sm: "25px",
                    md: "25px",
                    lg: "18px",
                    xl: "20px",
                  }}
                >
                  <Text display={"block"} as="b" noOfLines={1}>
                    {name}
                  </Text>
                  <Text display={"block"} as="b" noOfLines={1} fontWeight={500}>
                    {city}, {country}
                  </Text>
                  <Text display={"block"} as="b" noOfLines={2}>
                    From: {check_in}
                  </Text>
                  <Text display={"block"} as="b" noOfLines={1}>
                    To: {check_out}
                  </Text>
                  <Text display={"block"} as="b" noOfLines={1}>
                    Pets: {pets}
                  </Text>
                </VStack>
              </Box>
            </HStack>
          </Box>
        </Link>
      </Grid>
    </Box>
  );
}
