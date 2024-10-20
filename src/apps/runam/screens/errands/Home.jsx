import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Center,
  CircularProgress,
  Flex,
  Heading,
  IconButton,
  Tag,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { FaMoneyBillWave, FaPaperPlane } from "react-icons/fa";
import axios  from "axios"; // Import your axios instance
import { useAuth } from "../../../../context/AuthContext";
import { useNavigate } from "react-router-dom"; // Use for web navigation

export default function HomeScreen() {
  const { authState } = useAuth();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const toast = useToast();
  const navigate = useNavigate();

  // Check authentication
  const checkAuth = async () => {
    if (!authState.authenticated) {
      navigate("/runam/onboarding/");
    }
  };

  // Fetch tasks data from API
  const fetchData = async () => {
    try {
      const headers = {
        Authorization: `Bearer ${authState.token}`,
        "Content-Type": "application/json",
      };
      const response = await axios.get(
        "https://runit-78od.onrender.com/tasks/",
        { headers }
      );
      setData(response.data);
      setLoading(false);
    } catch (error) {
      if (error.response?.status === 401) {
        navigate("/auth/main/signIn");
      } else {
        toast({
          title: "Error fetching data.",
          description: error.message,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
      setLoading(false);
    }
  };

  // Accept a task
  const acceptTask = async (id) => {
    try {
      const headers = {
        Authorization: `Bearer ${authState.token}`,
        "Content-Type": "application/json",
      };
      await axios.put(
        `https://runit-78od.onrender.com/tasks/${id}/accept/`,
        {},
        { headers }
      );
      fetchData(); // Refresh tasks
    } catch (error) {
      toast({
        title: "Error accepting task.",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    checkAuth();
    fetchData();
  }, [authState.token]);

  if (loading) {
    return (
      <Center h="100vh">
        <CircularProgress isIndeterminate color="teal" />
      </Center>
    );
  }

  return (
    <VStack spacing={5} align="stretch" p={5}>
        {data.map((item) => (
          <Box
            key={item.id}
            bg="white"
            p={5}
            borderRadius="md"
            shadow="md"
            mb={4}
          >
            <Flex justify="space-between" align="center">
              <Box>
                <Text fontWeight="bold">{item.sender_name}</Text>
                <Text fontSize="sm" color="gray.500">
                  {item.deliver_to || item.pick_up}
                </Text>
              </Box>
              <Tag
                colorScheme={item.type === "Solo" ? "green" : "red"}
                borderRadius="full"
              >
                {item.type}
              </Tag>
            </Flex>

            <Heading size="md" mt={2} mb={1}>
              {item.name}
            </Heading>
            <Text color="gray.600" mb={2}>
              {item.description}
            </Text>

            <Flex align="center" mb={3}>
              <FaMoneyBillWave color="green" />
              <Text ml={2} fontWeight="bold" color="green.500">
                ₦{item.bidding_amount}
              </Text>
            </Flex>

            <Button
              colorScheme="teal"
              onClick={() => acceptTask(item.id)}
              isFullWidth
            >
              Accept Task
            </Button>
          </Box>
        ))}

      <IconButton
        icon={<FaPaperPlane />}
        colorScheme="blue"
        size="lg"
        borderRadius="full"
        position="fixed"
        bottom="20px"
        right="20px"
        onClick={() => navigate("/runam/errands/create")}
      />
    </VStack>
  );
}
