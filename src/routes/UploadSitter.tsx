import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControl,
  FormHelperText,
  FormLabel,
  Grid,
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
  IUploadSitterVariables,
  uploadSitter,
} from "../api";
import { IService, ICategory, ISitterDetail } from "../types";
import { useNavigate } from "react-router-dom";

interface IForm {
  name: string;
  country: string;
  city: string;
  address: string;
  price: number;
  description: string;
  services: number[];
  category: number[];
}

export default function UploadSitter() {
  const { register, handleSubmit } = useForm<IUploadSitterVariables>();
  const toast = useToast();
  const navigate = useNavigate();
  const mutation = useMutation(uploadSitter, {
    onSuccess: (sitterData: ISitterDetail) => {
      toast({
        status: "success",
        title: "Sitter created",
        position: "bottom-right",
      });
      navigate(`/sitters/${sitterData.id}`);
    },
  });
  const { data: services } = useQuery<IService[]>(["services"], getServices);
  const { data: categories } = useQuery<ICategory[]>(
    ["categories"],
    getCategories
  );
  useHostOnlyPage();

  const onSubmit = (data: IUploadSitterVariables) => {
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
          <Heading textAlign={"center"}>Upload Profile</Heading>
          <VStack
            spacing={10}
            as="form"
            onSubmit={handleSubmit(onSubmit)}
            mt={5}
          >
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input
                {...register("name", { required: true })}
                required
                type="text"
              />
              <FormHelperText>Write the user's name.</FormHelperText>
            </FormControl>
            <FormControl>
              <FormLabel>Country</FormLabel>
              <Input
                {...register("country", { required: true })}
                required
                type="text"
              />
            </FormControl>
            <FormControl>
              <FormLabel>City</FormLabel>
              <Input
                {...register("city", { required: true })}
                required
                type="text"
              />
            </FormControl>
            <FormControl>
              <FormLabel>Address</FormLabel>
              <Input
                {...register("address", { required: true })}
                required
                type="text"
              />
            </FormControl>
            <FormControl>
              <FormLabel>Price</FormLabel>
              <InputGroup>
                <InputLeftAddon children={<FaMoneyBill />} />
                <Input
                  {...register("price", { required: true })}
                  type="number"
                  min={0}
                />
              </InputGroup>
            </FormControl>
            <FormControl>
              <FormLabel>Description</FormLabel>
              <Textarea />
            </FormControl>
            <FormControl>
              <FormLabel>Category</FormLabel>
              <Select
                {...register("category", { required: true })}
                placeholder="Choose a kind"
              >
                {categories?.map((category) => (
                  <option key={category.pk} value={category.pk}>
                    {category.category_name}
                  </option>
                ))}
              </Select>
              <FormHelperText>
                What Category describes your pet-sitting style?
              </FormHelperText>
            </FormControl>
            <FormControl>
              <FormLabel>Services</FormLabel>
              <Grid templateColumns={"1fr 1fr"} gap={5}>
                {services?.map((service) => (
                  <Box key={service.pk}>
                    <Checkbox
                      value={service.pk}
                      {...register("services", { required: true })}
                    >
                      {service.service_name}
                    </Checkbox>
                    <FormHelperText>{service.description}</FormHelperText>
                  </Box>
                ))}
              </Grid>
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
              Upload Room
            </Button>
          </VStack>
        </Container>
      </Box>
    </ProtectedPage>
  );
}
