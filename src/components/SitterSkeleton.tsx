import { Box, Skeleton, SkeletonText } from "@chakra-ui/react";

export default function RoomSkeleton() {
  return (
    <Box>
      <Skeleton rounded={"2xl"} mb={3} height={"280"} />
      <SkeletonText w={"70%"} noOfLines={1} />
      <SkeletonText mt={2} w={"40%"} noOfLines={1} />
      <SkeletonText mt={4} w={"30%"} noOfLines={1} />
    </Box>
  );
}
