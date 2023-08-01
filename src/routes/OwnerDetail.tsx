import { useForm } from "react-hook-form";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormHelperText,
  FormLabel,
  Grid,
  Heading,
  Input,
  Select,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { IOwner, IUser } from "../types";
import useHostOnlyPage from "../components/HostOnlyPage";
import {
  IUpdateOwnerVariables,
  getMe,
  getOwner,
  getOwnerMe,
  getOwners,
  updateOwner,
} from "../api";
import ProtectedPage from "../components/ProtectedPage";
import React from "react";

export default function OwnerDetail() {
  const { ownerPk } = useParams();
  const { userPk } = useParams();
  const { data: userData } = useQuery<IUser>([`users`, userPk], getOwners);

  const { data: ownerData, isLoading: isOwnerDataLoading } = useQuery<IOwner>(
    ["owners", "me"],
    getMe
  );

  const { register, handleSubmit, setValue } = useForm<IUpdateOwnerVariables>();
  const toast = useToast();
  const navigate = useNavigate();
  const updateOwnerMutation = useMutation(updateOwner, {
    onSuccess: (data: IOwner) => {
      toast({
        title: "My Profile update complete!",
        status: "success",
        position: "bottom-right",
      });

      navigate(`/owners/${ownerData?.id}`);
    },
  });
  const { data: updateOwnerData, isLoading: isUpdateOwnerDataLoading } =
    useQuery<IOwner>(["owners", ownerPk], getOwnerMe);
  React.useEffect(() => {
    if (!isUpdateOwnerDataLoading && updateOwnerData) {
      setValue("name", updateOwnerData.name);
      setValue("gender", updateOwnerData.gender);
      setValue("pet_name", updateOwnerData.pet_name);
      setValue("pet_gender", updateOwnerData.pet_gender);
      setValue("pet_age", updateOwnerData.pet_age);
      setValue("pet_weight", updateOwnerData.pet_weight);
      setValue("pet_breed", updateOwnerData.pet_breed);
      setValue("neutering", updateOwnerData.neutering);
      setValue("pet_description", updateOwnerData.pet_description);
    }
  }, [isUpdateOwnerDataLoading, updateOwnerData, setValue]);

  const onSubmit = async (data: IUpdateOwnerVariables) => {
    if (ownerPk) {
      data.ownerPk = ownerPk;
      try {
        // Send a PUT request to update the owner's information
        await updateOwnerMutation.mutateAsync(data);

        // Redirect to the updated owner's profile page
        navigate(`/owners/me`);
      } catch (error) {
        // Handle the error if the update request fails
        toast({
          title: "Error updating profile!",
          description:
            "An error occurred while updating profile. Please try again.",
          status: "error",
          position: "bottom-right",
        });
      }
    }
  };

  return (
    <ProtectedPage>
      {isUpdateOwnerDataLoading ? null : (
        <Box pb={40} mt={10} px={{ base: 10, lg: 40 }}>
          <Heading textAlign={"center"}>Update My Profile</Heading>
          <VStack
            spacing={10}
            as={"form"}
            mt={5}
            onSubmit={handleSubmit(onSubmit)}
          >
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input
                {...register("name", { required: true })}
                defaultValue={updateOwnerData?.name}
                required
                type="text"
              />
              <FormHelperText>Write your name</FormHelperText>
            </FormControl>
            <FormControl>
              <FormLabel>Category</FormLabel>
              <Select
                {...register("gender", { required: true })}
                placeholder="Choose your gender"
                defaultValue={updateOwnerData?.gender}
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel>Pet Name</FormLabel>
              <Input
                {...register("pet_name", { required: true })}
                defaultValue={updateOwnerData?.pet_name}
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
                defaultValue={updateOwnerData?.pet_gender}
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
                defaultValue={updateOwnerData?.pet_age}
              />
              <FormHelperText>Write your pet's age.</FormHelperText>
            </FormControl>
            <FormControl>
              <FormLabel>Weight</FormLabel>
              <Input
                {...register("pet_weight", { required: true })}
                required
                type="text"
                defaultValue={updateOwnerData?.pet_weight}
              />
              <FormHelperText>Write your pet's weight.</FormHelperText>
            </FormControl>
            <FormControl>
              <FormLabel>Breed</FormLabel>
              <Input
                {...register("pet_breed", { required: true })}
                required
                type="text"
                defaultValue={updateOwnerData?.pet_breed}
              />
              <FormHelperText>Write your pet's breed.</FormHelperText>
            </FormControl>
            <FormControl>
              <FormLabel>Neutering</FormLabel>
              <Checkbox
                {...register("neutering", { required: true })}
                defaultChecked={updateOwnerData?.neutering}
              ></Checkbox>
              <FormHelperText>Check if your pet has neutered.</FormHelperText>
            </FormControl>
            <FormControl>
              <FormLabel>Description</FormLabel>
              <Input
                {...register("pet_description", { required: true })}
                required
                type="text"
                defaultValue={updateOwnerData?.pet_description}
              />
              <FormHelperText>Write your pet's information.</FormHelperText>
            </FormControl>

            <Button
              type="submit"
              isLoading={updateOwnerMutation.isLoading}
              backgroundColor="brown"
              color="white"
              size="lg"
              w="100%"
            >
              Update My Profile
            </Button>
          </VStack>
        </Box>
      )}
    </ProtectedPage>
  );
}
