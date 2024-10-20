// one.jsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom"; // React Router for web navigation
import { Box, Button, Image, Text, Flex, Spacer } from "@chakra-ui/react";
import { useAuth } from "../../../../context/AuthContext";
import Img from "../../../../Assets/runamImages/Messenger-rafiki 1.png"

const One = () => {
  const { authState } = useAuth();
  const navigate = useNavigate();

  const checkAuth = async () => {
    try {
      const auth = await authState.authenticated;
      if (auth) {
        navigate("/runam/errands/");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const handlePress = (nextScreen) => {
    navigate(nextScreen); // Navigate to next screen
  };

  return (
    <Flex
      direction="column"
      justify="space-between"
      align="center"
      h="100vh"
      bg="white"
      pb="10%"
    >
      {/* Step Indicators */}
      <Flex justify="center" w="100%" mt={4}>
        <Box w="30%" borderWidth={2} borderRadius="full" borderColor={"teal.500"} />
        <Spacer />
        <Box w="30%" bg="lightgray" borderRadius="full" />
        <Spacer />
        <Box w="30%" bg="lightgray" borderRadius="full" />
      </Flex>

      {/* Image Section */}
      <Image
        src={Img}
        alt="Help illustration"
        boxSize="300px"
      />

      {/* Text Content */}
      <Box px="5%">
        <Text fontWeight="bold" fontSize="2xl" mb={2}>
          Get help with your requests
        </Text>
        <Text color="gray.500" pr="10%">
          Need help with some errands around you? Other users can browse through
          requests and offer to help.
        </Text>
      </Box>

      {/* Buttons */}
      <Flex w="100%" px="5%" justify="space-between">
        <Button
          variant="outline"
          colorScheme="gray"
          onClick={() => handlePress("/runam/auth/")}
        >
          Skip
        </Button>
        <Button
          colorScheme="blue"
          onClick={() => handlePress("/runam/onboarding/two")}
        >
          Next &gt;
        </Button>
      </Flex>
    </Flex>
  );
};

export default One;
