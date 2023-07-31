import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Grid,
  Input,
  Select,
  useToast,
} from "@chakra-ui/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { IOwner } from "../types";
import useHostOnlyPage from "../components/HostOnlyPage";
import { IUpdateOwnerVariables, getOwner, updateOwner } from "../api";
import { useForm } from "react-hook-form";
import ProtectedPage from "../components/ProtectedPage";

export default function OwnerDetail() {
  const { ownerPk } = useParams();
  const { register, handleSubmit } = useForm<IUpdateOwnerVariables>();
  const toast = useToast();
  const navigate = useNavigate();
  const updateOwnerMutation = useMutation(updateOwner, {
    onSuccess: (data: IOwner) => {
      toast({
        title: "My Profile update complete!",
        status: "success",
        position: "bottom-right",
      });
      console.log(data);
      navigate(`/owners/${data.id}`);
    },
  });

  const { data: updateOwnerData, isLoading: isUpdateOwnerDataLoading } =
    useQuery<IOwner>(["owners", ownerPk], getOwner);

  //   useHostOnlyPage();
  const onSubmit = (data: IUpdateOwnerVariables) => {
    if (ownerPk) {
      data.ownerPk = ownerPk;
      updateOwnerMutation.mutate(data);
    }
  };
  return (
    <ProtectedPage>
      {isUpdateOwnerDataLoading ? null : (
        <Box>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid templateColumns="1fr" gap={6}>
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
              <Button
                type="submit"
                isLoading={updateOwnerMutation.isLoading}
                backgroundColor="brown"
                color="white"
                size="lg"
                w="100%"
              >
                Upload My Profile
              </Button>
            </Grid>
          </form>
        </Box>
      )}
    </ProtectedPage>
  );
}
