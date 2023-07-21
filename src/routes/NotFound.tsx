import { Button, Heading, VStack, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <VStack justifyContent={"center"} minHeight={"100vh"}>
      <Heading>Page not found</Heading>
      <Text>It seems that you're lost.</Text>
      <Link to="/">
        <Button colorScheme={"telegram"}>Go home</Button>
      </Link>
    </VStack>
  );
}
