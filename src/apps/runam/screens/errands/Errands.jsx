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
  Button,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../../../context/AuthContext"; // Adjust the path if needed

const Errands = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [requests, setRequests] = useState([]);
  const { authState } = useAuth();

  // Check authentication and redirect if necessary
  const checkAuth = async () => {
    try {
      const auth = await authState.authenticated;
      if (!auth) navigate("/runam/onboarding/");
    } catch (error) {
      console.error(error);
    }
  };

  // Fetch tasks and requests from API
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
    <Box bg="gray.100" minH="85vh" maxH={["100vh", "200vh"] }p={5} maxW={["90vw","93vw", "100vw"]}>
      {/* Header */}
      <Box bg="white" p={5} mb={5} borderRadius="md" boxShadow="md">
        <Heading textAlign="center" mb={3}>
          Pending Tasks
        </Heading>
      </Box>

      <VStack spacing={8} align="stretch">
        {/* Tasks Section */}
        <Box width={"100%"}>
          <Heading size="md" mb={3}>
            My Tasks
          </Heading>
          <Box overflowX={"clip"}>
            <Flex
              gap={4}
              width={"90vw"}
              overflowX={"scroll"}
              paddingRight={20}
              paddingLeft={2}
            >
              {tasks.length > 0 ? (
                tasks.map((task) => <TaskCard key={task.id} task={task} />)
              ) : (
                <Text>No tasks available.</Text>
              )}
            </Flex>
          </Box>
        </Box>

        {/* Requests Section */}
        <Box width={"100%"}>
          <Heading size="md" mb={3}>
            My Requests
          </Heading>
          <Box overflowX={"clip"}>
            <Flex
              gap={4}
              width={"90vw"}
              overflowX={"scroll"}
              paddingRight={20}
              paddingLeft={2}
            >
              {requests.length > 0 ? (
                requests.map((request) => (
                  <RequestCard key={request.id} request={request} />
                ))
              ) : (
                <Text>No requests available.</Text>
              )}
            </Flex>
          </Box>
        </Box>
      </VStack>
    </Box>
  );
};

export default Errands;

const TaskCard = ({ task }) => {
  const navigate = useNavigate();
  return (
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
          name={task.sender_name}
          backgroundColor={"#010030"}
          // src={task.image || "https://randomuser.me/api/portraits/men/44.jpg"}
        />
        <VStack align="start" spacing={0} flex={1}>
          <Text fontWeight="bold">{task.sender_name}</Text>
          {/* <Text fontSize="sm" color="gray.500">
          📍 {task.location}
        </Text> */}
          <Text fontSize="sm" color="gray.500">
            📍 {task.status}
          </Text>
        </VStack>
        <Box
          bg={task.keywords.includes("Solo") ? "orange.100" : "blue.100"}
          px={2}
          py={1}
          borderRadius="md"
        >
          <Text
            fontSize="xs"
            color={task.keywords.includes("Solo") ? "orange.500" : "blue.500"}
          >
            {task.keywords.length > 0 ? task.keywords.join(", ") : "General"}
          </Text>
        </Box>
      </HStack>

      <Text mb={2}>{task.description}</Text>

      <Text fontSize="sm" color="gray.500">
        💰 ₦{task.bidding_amount}
      </Text>
      <Flex direction={"row"} justify={"space-between"}>
        {task.completed ? (
          <Text mb={2} color={"green"}>
            Completed!
          </Text>
        ) : (
          <Text mb={2} color={"orange"}>
            Pending...
          </Text>
        )}
        <Button onClick={() => navigate(`/runam/errands/runner/${task.id}`)}>
          View Task
        </Button>
      </Flex>
    </Box>
  );
};

const RequestCard = ({ request }) => {
  const navigate = useNavigate();

  return (
    <Box
      bg="white"
      p={4}
      borderRadius="md"
      boxShadow="md"
      minW="300px"
      maxW="300px"
    >
      <HStack align="center" mb={3}>
        <Avatar size="md" name={request.sender_name} />
        <VStack align="start" spacing={0} flex={1}>
          <Text fontWeight="bold">{request.sender_name}</Text>
          <Text fontSize="sm" color="gray.500">
            📍 {request.status}
          </Text>
        </VStack>
        <Box bg="orange.100" px={2} py={1} borderRadius="md">
          <Text fontSize="xs" color="orange.500">
            Solo
          </Text>
        </Box>
      </HStack>

      <Text mb={2}>{request.description}</Text>
      <Flex direction={"row"} justify={"space-between"}>
        {request.completed ? (
          <Text mb={2} color={"green"}>
            Completed!
          </Text>
        ) : (
          <Text mb={2}></Text>
        )}
        <Button onClick={() => navigate(`/runam/errands/${request.id}`)}>
          View Task
        </Button>
      </Flex>
    </Box>
  );
};
