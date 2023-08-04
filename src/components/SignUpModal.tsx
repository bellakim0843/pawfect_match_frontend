import {
  Box,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  VStack,
  Select,
  useToast,
  FormControl,
  FormErrorMessage,
  Checkbox,
  FormLabel,
} from "@chakra-ui/react";
import { FaUserNinja, FaLock, FaEnvelope, FaUserSecret } from "react-icons/fa";
import SocialLogin from "./SocialLogin";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { SignUp } from "../api";

interface IForm {
  name: string;
  email: string;
  username: string;
  password: string;
  is_sitter: boolean;
}

interface SignUpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SignUpModal({ isOpen, onClose }: SignUpModalProps) {
  const { register, handleSubmit, reset, formState } = useForm<IForm>();
  const toast = useToast();
  const queryClient = useQueryClient();

  const { errors } = formState;

  const mutation = useMutation(SignUp, {
    onSuccess: () => {
      toast({ title: "Welcome!", status: "success" });
      onClose();
      queryClient.refetchQueries(["me"]);
      reset();
    },
    onError: () => {
      reset();
    },
  });

  const onSubmit = ({ username, password, name, email, is_sitter }: IForm) => {
    mutation.mutate({
      username,
      email,
      name,
      password,
      is_sitter,
    });
  };
  return (
    <Modal onClose={onClose} isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Sign up</ModalHeader>
        <ModalCloseButton />
        <ModalBody as="form" onSubmit={handleSubmit(onSubmit)}>
          <VStack>
            <InputGroup>
              <InputLeftElement
                children={
                  <Box color="gray.500">
                    <FaUserSecret />
                  </Box>
                }
              />
              <Input
                {...register("name", { required: true })}
                placeholder="Name"
                variant="filled"
              />
            </InputGroup>
            <InputGroup>
              <InputLeftElement
                children={
                  <Box color="gray.500">
                    <FaEnvelope />
                  </Box>
                }
              />
              <Input
                {...register("email", {
                  required: "Email is required", // Add required validation message
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address", // Add validation message for pattern
                  },
                })}
                placeholder="Email"
                variant="filled"
              />
            </InputGroup>
            <FormControl isInvalid={!!errors.email}>
              <FormErrorMessage>{errors?.email?.message}</FormErrorMessage>
            </FormControl>
            <InputGroup>
              <InputLeftElement
                children={
                  <Box color="gray.500">
                    <FaUserNinja />
                  </Box>
                }
              />
              <Input
                {...register("username", { required: true })}
                placeholder="Account ID"
                variant="filled"
              />
            </InputGroup>
            <InputGroup>
              <InputLeftElement
                children={
                  <Box color="gray.500">
                    <FaLock />
                  </Box>
                }
              />
              <Input
                {...register("password", { required: true })}
                placeholder="password"
                variant="filled"
                type="password"
              />
            </InputGroup>
            <InputGroup marginTop={5}>
              <FormLabel>If you are a sitter, please check this.</FormLabel>
              <Checkbox {...register("is_sitter")} />
            </InputGroup>
          </VStack>
          <Button
            isLoading={mutation.isLoading}
            w="full"
            colorScheme="red"
            mt={4}
            type="submit"
          >
            Sign in
          </Button>
          <SocialLogin />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
