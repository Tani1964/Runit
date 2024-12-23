import React from "react";
import { Box, Image, Text, SimpleGrid, Flex, Heading } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook

// Import the icons
import AssemblyIcon from "../../../../Assets/runamImages/services/Handyman.png";
import MountingIcon from "../../../../Assets/runamImages/services/Tutorials.png";
import MovingIcon from "../../../../Assets/runamImages/services/delivery.png";
import CleaningIcon from "../../../../Assets/runamImages/services/cleaning.png";
import OutdoorHelpIcon from "../../../../Assets/runamImages/services/software.png";
import HomeRepairsIcon from "../../../../Assets/runamImages/services/delivery.png";
import PaintingIcon from "../../../../Assets/runamImages/services/Health Services.png";
import TrendingIcon from "../../../../Assets/runamImages/services/delivery.png";
import FoodIcon from "../../../../Assets/runamImages/services/catering.png";

const QuickStart = () => {
  const navigate = useNavigate(); // Initialize the navigate function

  // Define services
  const services = [
    { icon: AssemblyIcon, label: "Handyman" },
    { icon: MountingIcon, label: "Tutorials or Assistance" },
    { icon: MovingIcon, label: "Delivery" },
    { icon: CleaningIcon, label: "Cleaning" },
    { icon: PaintingIcon, label: "Medical Assistance" },
    { icon: FoodIcon, label: "Catering and Restaurants" }
  ];

  // Handle service click and navigate
  const handleServiceClick = (label) => {
    const category = label.toLowerCase().replace(/\s+/g, "-"); // Format label for URL
    navigate(`/runam/errands/create/${category}`);
  };

  return (
    <Box
      bg="white"
      p={6}
      boxShadow="xl"
      borderRadius="lg"
      margin={4}
      maxW="1200px"
      mx="auto"
    >
      <Heading as="h2" size="lg" mb={6} color="teal.600" textAlign="center">
        Quick Start
      </Heading>
      <SimpleGrid
        columns={{ base: 2, sm: 3, md: 4 }}
        gap={6}
        justifyContent="center"
      >
        {services.map((service, index) => (
          <Box
            key={index}
            textAlign="center"
            p={4}
            borderRadius="md"
            borderWidth="1px"
            borderColor="gray.300"
            _hover={{
              transform: "scale(1.05)",
              transition: "all 0.3s ease-in-out",
              backgroundColor: "#f0f4f8",
              boxShadow: "lg",
              cursor: "pointer",
            }}
            onClick={() => handleServiceClick(service.label)}
          >
            <Image
              src={service.icon}
              alt={service.label}
              boxSize="60px"
              mx="auto"
              mb={3}
            />
            <Text fontSize="md" fontWeight="semibold" color="gray.800">
              {service.label}
            </Text>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default QuickStart;
