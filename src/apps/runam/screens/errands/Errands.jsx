import React, { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Text,
  Avatar,
  Progress,
  Heading,
  VStack,
  HStack,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../../../context/AuthContext"; // Assuming you have an AuthContext

const Errands = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [requests, setRequests] = useState([]);
  const { authState } = useAuth();

  const checkAuth = async () => {
    try {
      const auth = await authState.authenticated;
      if (!auth) {
        navigate("/runam/onboarding/");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getTasks = async () => {
    try {
      const headers = {
        Authorization: `Bearer ${authState.token}`,
        "Content-Type": "application/json",
      };

      const [taskResponse, requestResponse] = await Promise.all([
        axios.get("https://runit-78od.onrender.com/tasks/accepted-tasks/", {
          headers,
        }),
        axios.get("https://runit-78od.onrender.com/tasks/created-tasks/", {
          headers,
        }),
      ]);

      setTasks(taskResponse.data);
      setRequests(requestResponse.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    checkAuth();
    getTasks();
  }, [authState.token]);

  return (
    <Box bg="gray.100" minH="100vh" p={5}>
      {/* Header */}
      <Box bg="white" p={5} mb={5} borderRadius="md" boxShadow="md">
        <Heading textAlign="center" mb={3}>
          Errands
        </Heading>
      </Box>

        <VStack spacing={8} align="stretch">
          {/* Tasks Section */}
          <Box>
            <Heading size="md" mb={3}>
              My Tasks
            </Heading>
            <Flex overflowX="auto" gap={4}>
              {tasks.length > 0 ? (
                tasks.map((task, index) => (
                  <TaskCard key={index} />
                ))
              ) : (
                <TaskCard />
              )}
            </Flex>
          </Box>

          {/* Requests Section */}
          <Box>
            <Heading size="md" mb={3}>
              My Requests
            </Heading>
            <Flex overflowX="auto" gap={4}>
              {requests.map((request, index) => (
                <RequestCard key={index} />
              ))}
            </Flex>
          </Box>
        </VStack>
    </Box>
  );
};

// Task Card Component
const TaskCard = () => (
  <Box
    bg="white"
    p={4}
    borderRadius="md"
    boxShadow="md"
    minW="300px"
    maxW="300px"
  >
    <HStack align="center" mb={3}>
      <Avatar
        size="md"
        name="Jane Doe"
        src="https://randomuser.me/api/portraits/women/44.jpg"
      />
      <VStack align="start" spacing={0} flex={1}>
        <Text fontWeight="bold">Jane Doe</Text>
        <Text fontSize="sm" color="gray.500">
          📍 New Hall, Unilag
        </Text>
      </VStack>
      <Box bg="orange.100" px={2} py={1} borderRadius="md">
        <Text fontSize="xs" color="orange.500">
          Solo
        </Text>
      </Box>
    </HStack>
    <Text mb={2}>
      Can somebody help me buy food from Mavis and bring it to Moremi, Jollof
      500, Fried 200, Plantain 700...
    </Text>
    <Text fontSize="sm" color="gray.500">
      📍 Shop 10, Unilag campus
    </Text>
  </Box>
);

// Request Card Component
const RequestCard = () => (
  <Box
    bg="white"
    p={4}
    borderRadius="md"
    boxShadow="md"
    minW="300px"
    maxW="300px"
  >
    <HStack align="center" mb={3}>
      <Avatar
        size="md"
        name="Jane Doe"
        src="https://randomuser.me/api/portraits/women/44.jpg"
      />
      <VStack align="start" spacing={0} flex={1}>
        <Text fontWeight="bold">Jane Doe</Text>
        <Text fontSize="sm" color="gray.500">
          📍 New Hall, Unilag
        </Text>
      </VStack>
      <Box bg="orange.100" px={2} py={1} borderRadius="md">
        <Text fontSize="xs" color="orange.500">
          Solo
        </Text>
      </Box>
    </HStack>
    <Text mb={2}>
      Who can help me buy pineapple from Onike? Just 200 naira own abeg.
    </Text>
    <Progress value={70} size="xs" colorScheme="orange" mt={2} />
    <Text mt={2} fontSize="xs" color="orange.500">
      12 min left
    </Text>
  </Box>
);

export default Errands;
