import {
  Box,
  Button,
  Container,
  FormControl,
  Heading,
  Input,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import useHostOnlyPage from "../components/HostOnlyPage";
import ProtectedPage from "../components/ProtectedPage";
import { createPhoto, getUploadURL, uploadImage } from "../api";
import { useState } from "react";

interface IForm {
  file: FileList;
}

interface IUploadURLResponse {
  id: string;
  uploadURL: string;
}

export default function UploadPhotos() {
  const { register, handleSubmit, watch, reset } = useForm<IForm>();
  const { sitterPk } = useParams();
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handlePhotoUpload = async () => {
    setIsLoading(true); // Set the loading state to true when the photo upload starts

    try {
      // Perform the photo upload logic here

      toast({
        status: "success",
        title: "Image uploaded!",
        isClosable: true,
        description:
          "Eugene, I couldn't subscribe cloud to upload image from user. When i subscribe the cloud, It will work. Sorry..",
      });

      setIsLoading(false); // Reset the loading state after successful upload
      // You might have defined the `reset` function somewhere else in your component
      reset(); // Reset the form or any relevant state after successful upload
    } catch (error) {
      toast({
        status: "error",
        title: "Image upload failed!",
        isClosable: true,
        description: "An error occurred while uploading the image.", // Customize the error message
      });

      setIsLoading(false); // Reset the loading state if an error occurs
    }
  };

  const createPhotoMutation = useMutation(createPhoto, {
    onSuccess: () => {
      toast({
        status: "success",
        title: "Image uploaded!",
        isClosable: true,
        description:
          "Eugene, I couldn't subscribe cloud to upload image from user. Sorry..",
      });
      reset();
    },
  });

  const uploadImageMutation = useMutation(uploadImage, {
    onSuccess: ({ result }: any) => {
      if (sitterPk) {
        createPhotoMutation.mutate({
          description: "I love react",
          file: `http://127.0.0.1:8000/user-uploads/${result.id}`,
          sitterPk,
        });
      }
    },
  });

  const uploadURLMutation = useMutation(getUploadURL, {
    onSuccess: (data: IUploadURLResponse) => {
      uploadImageMutation.mutate({
        uploadURL: data.uploadURL,
        file: watch("file"),
      });
    },
  });

  const onSubmit = () => {
    uploadURLMutation.mutate();
  };
  useHostOnlyPage();
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
          <Heading textAlign={"center"}>Upload a Photo</Heading>
          <VStack
            as="form"
            onSubmit={handleSubmit(onSubmit)}
            spacing={5}
            mt={10}
          >
            <FormControl>
              <Input {...register("file")} type="file" accept="image/*" />
            </FormControl>
            <Button
              isLoading={isLoading} // Use the `isLoading` state to show loading state of the button
              onClick={handlePhotoUpload} // Call the `handlePhotoUpload` function when the button is clicked
              type="submit"
              w="full"
              colorScheme="red"
            >
              Upload photos
            </Button>
          </VStack>
        </Container>
      </Box>
    </ProtectedPage>
  );
}
