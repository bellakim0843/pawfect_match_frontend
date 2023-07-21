import { useForm } from "react-hook-form";
import { Box, Button, Divider, HStack, VStack, Text } from "@chakra-ui/react";
import { FaGithub, FaFacebook } from "react-icons/fa";

export default function SocialLogin() {
  return (
    <Box>
      <HStack my={8}>
        <Divider />
        <Text
          textTransform={"uppercase"}
          color="gray.500"
          fontSize={"xs"}
          as="b"
        >
          Or
        </Text>
        <Divider />
      </HStack>
      <VStack>
        <Button
          width={"100%"}
          leftIcon={<FaFacebook />}
          colorScheme={"facebook"}
          marginBottom={1}
        >
          Continue with FaceBook
        </Button>
        <Button
          as="a"
          width={"100%"}
          leftIcon={<FaGithub />}
          backgroundColor="black"
          color={"white"}
          marginBottom={5}
        >
          Continue with Github
        </Button>
      </VStack>
    </Box>
  );
}
