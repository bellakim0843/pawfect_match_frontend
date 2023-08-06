import { FaPaw, FaMoon, FaSun } from "react-icons/fa";
import {
  Box,
  Button,
  Stack,
  ToastId,
  HStack,
  IconButton,
  useColorMode,
  useColorModeValue,
  useDisclosure,
  Text,
  Avatar,
  LightMode,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useToast,
} from "@chakra-ui/react";
import { Link, useNavigate, useParams } from "react-router-dom";
import LoginModal from "./LoginModal";
import SignUpModal from "./SignUpModal";
import useUser from "../lib/useUser";
import { getMe, getOwner, getOwnerMe, getOwners, logOut } from "../api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";
import { IUser } from "../types";

export default function Header() {
  const { userLoading, isLoggedIn, user } = useUser();
  const {
    isOpen: isLoginOpen,
    onClose: onLoginClose,
    onOpen: onLoginOpen,
  } = useDisclosure();
  const {
    isOpen: isSignUpOpen,
    onClose: onSignUpClose,
    onOpen: onSignUpOpen,
  } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();
  const logoColor = useColorModeValue("orange.500", "orange.200");
  const Icon = useColorModeValue(FaMoon, FaSun);
  const toast = useToast();
  const queryClient = useQueryClient();
  const toastId = useRef<ToastId>();
  const mutation = useMutation(logOut, {
    onMutate: () => {
      toastId.current = toast({
        title: "Logging out...",
        description: "Sad to see you go...",
        status: "loading",
        position: "bottom-right",
      });
    },
    onSuccess: () => {
      if (toastId.current) {
        queryClient.invalidateQueries(["me"]); // Invalidate the "me" query instead of refetching
        toast.update(toastId.current, {
          status: "success",
          title: "Done!",
          description: "See you later!",
        });
        window.location.reload(); // Refresh the page after successful logout
      }
    },
  });

  const onLogOut = async () => {
    mutation.mutate();
  };
  const { ownerPk } = useParams();
  const { userPk } = useParams();
  const { data: userData } = useQuery<IUser>([`users`, ownerPk], getMe);
  const { isLoading: isOwnerLoading, data: ownerData } = useQuery<IUser>(
    [`users`, ownerPk],
    getOwner
  );
  const navigate = useNavigate();
  const onEditClick = (event: React.SyntheticEvent<HTMLButtonElement>) => {
    event.preventDefault(); // click이 링크로 전파되는것을 방지(버블링 방지)한다.
    // navigate(`/users/${ownerData?.pk}`);
    navigate(`/users/me`);
  };
  return (
    <Box width={"100%"}>
      <Stack
        backgroundColor={"orange.300"}
        justifyContent={"space-between"}
        spacing={{
          sm: 3,
          md: 0,
        }}
        alignItems={"center"}
        py={5}
        px={10}
        direction={{
          sm: "column",
          md: "row",
        }}
        borderBottomWidth={1}
        style={{
          boxShadow: "0px 1px 4px rgba(0, 0, 0, 0.2)", // Add the shadow effect
        }}
      >
        <Box px={10} color={logoColor}>
          <Link to={"/"}>
            <FaPaw size={"48"} />
          </Link>
        </Box>
        <Box>
          <Text fontFamily={"Gill Sans"} fontSize={30} color={"white"}>
            Pawfect Match
          </Text>
        </Box>
        <HStack spacing={2}>
          <IconButton
            onClick={toggleColorMode}
            variant={"ghost"}
            aria-label="Toggle dark mode"
            color={"orange.900"}
            icon={<Icon />}
          />
          {!userLoading ? (
            !isLoggedIn ? (
              <>
                <Button onClick={onLoginOpen}>Log in</Button>
                <LightMode>
                  <Button onClick={onSignUpOpen} colorScheme={"red"}>
                    Sign up
                  </Button>
                </LightMode>
              </>
            ) : (
              <Menu>
                <MenuButton>
                  <Avatar name={user?.name} size={"md"} />
                </MenuButton>
                <MenuList>
                  {user?.is_sitter ? (
                    <Link to="/sitters/upload">
                      <MenuItem>Upload Sitter's profile</MenuItem>
                    </Link>
                  ) : (
                    <Link to="/owners/upload">
                      <MenuItem>Upload Owner's profile</MenuItem>
                    </Link>
                  )}

                  {user?.is_sitter ? null : (
                    <MenuItem onClick={onEditClick}>My Profile</MenuItem>
                  )}

                  {user?.is_sitter ? null : (
                    <Link to="/mybooking">
                      <MenuItem>My Booking</MenuItem>
                    </Link>
                  )}

                  <MenuItem onClick={onLogOut}>Log Out</MenuItem>
                </MenuList>
              </Menu>
            )
          ) : null}
        </HStack>
        <LoginModal isOpen={isLoginOpen} onClose={onLoginClose} />
        <SignUpModal isOpen={isSignUpOpen} onClose={onSignUpClose} />
      </Stack>
    </Box>
  );
}
