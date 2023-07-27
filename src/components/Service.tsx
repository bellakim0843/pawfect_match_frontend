import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom"; // Import useParams
import { ISitterDetail } from "../types";
import { checkBooking, getSitter, getSitterReviews } from "../api";
import { Box, HStack, Text, VStack } from "@chakra-ui/react";
import {
  FaPersonWalking,
  FaBath,
  FaScissors,
  FaRegHospital,
  FaRegThumbsUp,
  FaCartPlus,
} from "react-icons/fa6";

export interface IService {
  service_name: string;
  description: string;

  // Add other properties related to the sitter here
}

export default function Service() {
  const { sitterPk } = useParams(); // Get the sitterPk value from useParams

  const { isLoading: isSitterLoading, data: sitterData } =
    useQuery<ISitterDetail>([`sitters`, sitterPk], getSitter);

  return (
    <Box>
      {isSitterLoading ? (
        <Text>Loading...</Text>
      ) : (
        <Box>
          {/* Display service[0] */}
          <Box marginBottom={2}>
            <Text>
              {sitterData?.services && sitterData?.services[0] ? (
                <HStack paddingTop={5} paddingBottom={5}>
                  {sitterData?.services?.[0] && (
                    <VStack alignItems="flex-start" marginLeft={5}>
                      <Text fontSize={"20px"} fontWeight={600}>
                        {sitterData?.services[0].service_name}
                      </Text>
                      <Text>
                        {sitterData?.services[0].description || "N/A"}
                      </Text>
                    </VStack>
                  )}
                </HStack>
              ) : null}
            </Text>
          </Box>
          <Box marginBottom={2}>
            <Text>
              {sitterData?.services && sitterData?.services[1] ? (
                <HStack paddingBottom={5}>
                  {sitterData?.services?.[1] && (
                    <VStack alignItems="flex-start" marginLeft={5}>
                      <Text fontSize={"20px"} fontWeight={600}>
                        {sitterData?.services[1].service_name}
                      </Text>
                      <Text>
                        {sitterData?.services[1].description || "N/A"}
                      </Text>
                    </VStack>
                  )}
                </HStack>
              ) : null}
            </Text>
          </Box>

          {/* Display service[2] */}
          <Box marginBottom={2}>
            <Text>
              {sitterData?.services && sitterData?.services[0].service_name ? (
                <HStack paddingBottom={5}>
                  {sitterData?.services?.[2] && (
                    <VStack alignItems="flex-start" marginLeft={5}>
                      <Text fontSize={"20px"} fontWeight={600}>
                        {sitterData?.services[2].service_name}
                      </Text>
                      <Text>
                        {sitterData?.services[2].description || "N/A"}
                      </Text>
                    </VStack>
                  )}
                </HStack>
              ) : null}
            </Text>
          </Box>

          {/* Display service[3] */}
          <Box marginBottom={2}>
            <Text>
              {sitterData?.services && sitterData?.services[3] ? (
                <HStack paddingBottom={5}>
                  {sitterData?.services?.[3] && (
                    <VStack alignItems="flex-start" marginLeft={5}>
                      <Text fontSize={"20px"} fontWeight={600}>
                        {sitterData?.services[3].service_name}
                      </Text>
                      <Text>
                        {sitterData?.services[3].description || "N/A"}
                      </Text>
                    </VStack>
                  )}
                </HStack>
              ) : null}
            </Text>
          </Box>
          <Box marginBottom={2}>
            <Text>
              {sitterData?.services && sitterData?.services[4] ? (
                <HStack paddingBottom={5}>
                  {sitterData?.services?.[4] && (
                    <VStack alignItems="flex-start" marginLeft={5}>
                      <Text fontSize={"20px"} fontWeight={600}>
                        {sitterData?.services[4].service_name}
                      </Text>
                      <Text>
                        {sitterData?.services[4].description || "N/A"}
                      </Text>
                    </VStack>
                  )}
                </HStack>
              ) : null}
            </Text>
          </Box>
          <Box marginBottom={2}>
            <Text>
              {sitterData?.services && sitterData?.services[5] ? (
                <HStack paddingBottom={5}>
                  {sitterData?.services?.[5] && (
                    <VStack alignItems="flex-start" marginLeft={5}>
                      <Text fontSize={"20px"} fontWeight={600}>
                        {sitterData?.services[5].service_name}
                      </Text>
                      <Text>
                        {sitterData?.services[5].description || "N/A"}
                      </Text>
                    </VStack>
                  )}
                </HStack>
              ) : null}
            </Text>
          </Box>
          {/* Add other information related to the sitter and service */}
        </Box>
      )}
    </Box>
  );
}
