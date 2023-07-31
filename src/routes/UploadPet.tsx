import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  Select,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { IOwner, IPet } from "../types";
import { useNavigate, useParams } from "react-router-dom";
import ProtectedPage from "../components/ProtectedPage";
import {
  IUpdatePetVariables,
  IUploadOwnerVariables,
  IUploadPetVariables,
  updatePet,
  uploadOwner,
  uploadPet,
  getPet,
} from "../api";
import useHostOnlyPage from "../components/HostOnlyPage";

export default function UploadPet() {
  const { petPk } = useParams();
  const { register, handleSubmit } = useForm<IUploadPetVariables>();
  const toast = useToast();
  const navigate = useNavigate();

  const { data: uploadPetData, isLoading: isUploadPetDataLoading } =
    useQuery<IPet>(["pets", petPk], getPet);

  // useHostOnlyPage();
  const onSubmit = (data: IUploadPetVariables) => {
    console.log(data); // Add this console.log to print the form data
    uploadPetMutation.mutate(data);
  };

  const uploadPetMutation = useMutation(uploadPet, {
    onSuccess: (petData: IPet) => {
      toast({
        title: "My Pet Profile update complete!",
        status: "success",
        position: "bottom-right",
      });
      console.log(petData);
      navigate(`owners/${petData.id}/pets/${petData.pk}`);
    },
  });

  return (
    <VStack spacing={10} as="form" onSubmit={handleSubmit(onSubmit)} mt={5}>
      <FormControl>
        <FormLabel>Pet Name</FormLabel>
        <Input
          {...register("petname", { required: true })}
          required
          type="text"
        />
        <FormHelperText>Write your pet's name.</FormHelperText>
      </FormControl>
      <FormControl>
        <FormLabel>Gender</FormLabel>
        <Select
          {...register("sex", { required: true })}
          required
          defaultValue=""
        >
          <option value="male">Male</option>
          <option value="female">Female</option>
        </Select>
      </FormControl>
      <FormControl>
        <FormLabel>Pet Age</FormLabel>
        <Input {...register("age", { required: true })} required type="text" />
        <FormHelperText>Write your pet's age.</FormHelperText>
      </FormControl>
      <FormControl>
        <FormLabel>Weight</FormLabel>
        <Input
          {...register("weight", { required: true })}
          required
          type="text"
        />
        <FormHelperText>Write your pet's weight.</FormHelperText>
      </FormControl>
      <FormControl>
        <FormLabel>Breed</FormLabel>
        <Input
          {...register("breed", { required: true })}
          required
          type="text"
        />
        <FormHelperText>Write your pet's breed.</FormHelperText>
      </FormControl>
      <FormControl>
        <FormLabel>Neutering</FormLabel>
        <Checkbox {...register("neutering", { required: true })} />
        <FormHelperText>Check if your pet has neutered.</FormHelperText>
      </FormControl>
      <FormControl>
        <FormLabel>Description</FormLabel>
        <Input
          {...register("description", { required: true })}
          required
          type="text"
        />
        <FormHelperText>Write your pet's information.</FormHelperText>
      </FormControl>

      {/* ... (existing form elements for IPet) */}

      {uploadPetMutation.isError ? (
        <Text color={"red.500"}>Something went wrong...</Text>
      ) : null}
      <Button
        type="submit"
        isLoading={uploadPetMutation.isLoading}
        backgroundColor={"brown"}
        color={"white"}
        size="lg"
        w="100%"
      >
        Upload Pet Information
      </Button>
    </VStack>
  );
}
