// two.jsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom"; // React Router for navigation
import { Box, Button, Image, Text, Flex, Spacer } from "@chakra-ui/react";
import Img from "../../../../Assets/runamImages/Location tracking-rafiki 1.png"

const Two = () => {
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
        <Box w="30%" bg="lightgray" borderRadius="full" 
         />
        <Spacer />
        <Box w="30%" borderWidth={2}  borderRadius="full" borderColor={"teal.500"}/>
        <Spacer />
        <Box w="30%" bg="lightgray" borderRadius="full" />
      </Flex>
      {/* Image Section */}
      <Image
        src={Img}
        alt="Location Tracking Illustration"
        boxSize="300px"
      />

      {/* Text Content */}
      <Box px="5%">
        <Text fontWeight="bold" fontSize="2xl" mb={2}>
          Search for Errands Near your Location
        </Text>
        <Text color="gray.500" pr="10%">
          Identifying areas with high request traffic can be done easily and quickly.
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
          onClick={() => handlePress("/runam/onboarding/three")}
        >
          Next
        </Button>
      </Flex>
    </Flex>
  );
};

export default Two;
