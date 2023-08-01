import ProtectedPage from "../components/ProtectedPage";
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
  Select,
  Text,
  Textarea,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { FaMoneyBill } from "react-icons/fa";
import {
  IUpdateSitterVariables,
  getServices,
  getCategories,
  getSitter,
  updateSitter,
} from "../api";
import { useMutation, useQuery } from "@tanstack/react-query";
import { IService, ICategory, ISitterDetail } from "../types";
import useHostOnlyPage from "../components/HostOnlyPage";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function SitterEdit() {
  const { sitterPk } = useParams();
  const { register, handleSubmit } = useForm<IUpdateSitterVariables>();
  const toast = useToast();
  const navigate = useNavigate();
  const updateSitterMutation = useMutation(updateSitter, {
    onSuccess: (data: ISitterDetail) => {
      toast({
        title: "Sitter update complete!",
        status: "success",
        position: "bottom-right",
      });

      navigate(`/sitters/${data.id}`);
    },
  });

  const { data: updateSitterData, isLoading: isUpdateSitterDataLoading } =
    useQuery<ISitterDetail>([`sitters`, sitterPk], getSitter);
  let updateSitterServiceList: number[] = [];
  updateSitterData?.services.map((checkService) =>
    updateSitterServiceList.push(checkService.pk)
  );

  //여기부터 고치기
  const { data: servicesData, isLoading: isServicesDataLoading } = useQuery<
    IService[]
  >(["sevices"], getServices);
  const { data: categoriesData, isLoading: isCategoriesDataLoading } = useQuery<
    ICategory[]
  >(["categories"], getCategories);

  useHostOnlyPage();
  const onSubmit = (data: IUpdateSitterVariables) => {
    if (sitterPk) {
      data.sitterPk = sitterPk;
      updateSitterMutation.mutate(data);
    }
  };
  return (
    <ProtectedPage>
      {isUpdateSitterDataLoading ||
      isServicesDataLoading ||
      isCategoriesDataLoading ? null : (
        <Box pb={40} mt={10} px={{ base: 10, lg: 40 }}>
          <Helmet>
            <title>
              {updateSitterData ? updateSitterData.name : "Loading..."}
            </title>
          </Helmet>
          <Container>
            <Heading textAlign={"center"}>Update Sitter</Heading>
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
                  defaultValue={updateSitterData?.name}
                  required
                  type="text"
                />
                <FormHelperText>Write your name</FormHelperText>
              </FormControl>
              <FormControl>
                <FormLabel>Country</FormLabel>
                <Input
                  {...register("country", { required: true })}
                  defaultValue={updateSitterData?.country}
                  required
                  type="text"
                />
              </FormControl>
              <FormControl>
                <FormLabel>City</FormLabel>
                <Input
                  {...register("city", { required: true })}
                  defaultValue={updateSitterData?.city}
                  required
                  type="text"
                />
              </FormControl>
              <FormControl>
                <FormLabel>Address</FormLabel>
                <Input
                  {...register("address", { required: true })}
                  defaultValue={updateSitterData?.address}
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
                    defaultValue={updateSitterData?.price}
                    type="number"
                    min={0}
                  />
                </InputGroup>
              </FormControl>

              <FormControl>
                <FormLabel>Description</FormLabel>
                <Textarea
                  {...register("description", { required: true })}
                  defaultValue={updateSitterData?.description}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Category</FormLabel>
                <Select
                  {...register("category", { required: true })}
                  placeholder="Choose a kind"
                  defaultValue={updateSitterData?.category.category_name}
                >
                  {categoriesData?.map((category) => (
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
                  {servicesData?.map((service) => (
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
              {updateSitterMutation.isError ? (
                <Text color={"red.500"}>Something went wrong...</Text>
              ) : null}
              <Button
                type="submit"
                isLoading={updateSitterMutation.isLoading}
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
      )}
    </ProtectedPage>
  );
}
