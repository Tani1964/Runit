// three.jsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom"; // React Router for navigation
import { Box, Button, Image, Text, Flex, Spacer } from "@chakra-ui/react";
import Img from "../../../../Assets/runamImages/Group Chat-pana 1.png"

const Three = () => {
  const navigate = useNavigate();

  const handlePress = (nextScreen) => {
    navigate(nextScreen); // Navigate to the specified screen
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
      <Flex justify="center" w="100%" mt={4} px={10} py={5}>
        <Box w="30%" bg="lightgray"  borderRadius="full" />
        <Spacer />
        <Box w="30%"  bg="lightgray"  borderRadius="full" />
        <Spacer />
        <Box w="30%" borderWidth={2} borderRadius="full" borderColor={"teal.500"}/>
      </Flex>

      {/* Image Section */}
      <Image
        src={Img}
        alt="Group Chat Illustration"
        boxSize="400px"
      />

      {/* Text Content */}
      <Box px="5%">
        <Text fontWeight="bold" fontSize="2xl" mb={2}>
          An Area-based Community
        </Text>
        <Text color="gray.500" pr="10%">
          View errands on your home feed as well as connect with other users
          around your area.
        </Text>
      </Box>

      {/* Button Section */}
      <Flex w="100%" px="5%" justify="flex-end">
        <Button
          colorScheme="blue"
          onClick={() => handlePress("/runam/auth/")}
        >
          Sign In
        </Button>
      </Flex>
    </Flex>
  );
};

export default Three;
