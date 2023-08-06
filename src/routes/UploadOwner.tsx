import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControl,
  FormHelperText,
  FormLabel,
  Grid,
  HStack,
  Heading,
  Input,
  InputGroup,
  InputLeftAddon,
  InputLeftElement,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  Text,
  Textarea,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { FaMoneyBill } from "react-icons/fa";
import useHostOnlyPage from "../components/HostOnlyPage";
import ProtectedPage from "../components/ProtectedPage";
import {
  getServices,
  getCategories,
  IUploadOwnerVariables,
  uploadOwner,
} from "../api";
import { IService, ICategory, IUser } from "../types";
import { useNavigate } from "react-router-dom";

export default function UploadOwner() {
  const { register, handleSubmit } = useForm<IUploadOwnerVariables>();
  const toast = useToast();
  const navigate = useNavigate();
  const mutation = useMutation(uploadOwner, {
    onSuccess: (ownerData: IUser) => {
      toast({
        status: "success",
        title: "User's Pet information created",
        position: "bottom-right",
      });
      console.log(ownerData);
      navigate(`/users/${ownerData.pk}`);
    },
  });

  const onSubmit = (data: IUploadOwnerVariables) => {
    mutation.mutate(data);
  };

  return (
    <ProtectedPage>
      <Box
        pb={40}
        mt={10}
        px={{
          base: 10,
          lg: 40,
        }}
      >
        <Container>
          <Heading textAlign={"center"}>Upload Owner's information</Heading>
          <VStack
            spacing={10}
            as="form"
            onSubmit={handleSubmit(onSubmit)}
            mt={5}
          >
            <FormControl>
              <FormLabel>Pet Name</FormLabel>
              <Input
                {...register("pet_name", { required: true })}
                required
                type="text"
              />
              <FormHelperText>Write your pet's name.</FormHelperText>
            </FormControl>
            <FormControl>
              <FormLabel>Gender</FormLabel>
              <Select
                {...register("pet_gender", { required: true })}
                required
                defaultValue=""
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel>Pet Age</FormLabel>
              <Input
                {...register("pet_age", { required: true })}
                required
                type="text"
              />
              <FormHelperText>Write your pet's age.</FormHelperText>
            </FormControl>
            <FormControl>
              <FormLabel>Weight</FormLabel>
              <Input
                {...register("pet_weight", { required: true })}
                required
                type="text"
              />
              <FormHelperText>Write your pet's weight.</FormHelperText>
            </FormControl>
            <FormControl>
              <FormLabel>Breed</FormLabel>
              <Input
                {...register("pet_breed", { required: true })}
                required
                type="text"
              />
              <FormHelperText>Write your pet's breed.</FormHelperText>
            </FormControl>
            <FormControl>
              <FormLabel>Neutering</FormLabel>
              <Checkbox {...register("neutering")} />
              <FormHelperText>Check if your pet has neutered.</FormHelperText>
            </FormControl>
            <FormControl>
              <FormLabel>Description</FormLabel>
              <Input
                {...register("pet_description", { required: true })}
                required
                type="text"
              />
              <FormHelperText>Write your pet's information.</FormHelperText>
            </FormControl>

            {mutation.isError ? (
              <Text color={"red.500"}>Something went wrong...</Text>
            ) : null}
            <Button
              type="submit"
              isLoading={mutation.isLoading}
              backgroundColor={"brown"}
              color={"white"}
              size="lg"
              w="100%"
            >
              Upload Pet Information
            </Button>
          </VStack>
          <VStack></VStack>
        </Container>
      </Box>
    </ProtectedPage>
  );
}
