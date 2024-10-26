import React, { useState, useEffect } from "react";
import {
  Box,
  Heading,
  VStack,
  Text,
  Spinner,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useAuth } from "../../../../context/AuthContext"; // Assuming AuthContext is set up

const TaskHistory = () => {
  const { authState } = useAuth();
  const [senderHistory, setSenderHistory] = useState([]);
  const [erandeeHistory, setErandeeHistory] = useState([]);
  const [isLoadingSender, setIsLoadingSender] = useState(true);
  const [isLoadingErandee, setIsLoadingErandee] = useState(true);
  const toast = useToast();

  // Fetch Task History as Sender
  const fetchSenderHistory = async () => {
    try {
      const response = await axios.get("https://runit-78od.onrender.com/tasks/history/", {
        headers: {
          Authorization: `Bearer ${authState.token}`,
        },
      });
      setSenderHistory(response.data);
    } catch (error) {
      toast({
        title: "Error fetching task history as sender.",
        description: "Please try again later.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoadingSender(false);
    }
  };

  // Fetch Task History as Erandee
  const fetchErandeeHistory = async () => {
    try {
      const response = await axios.get("https://runit-78od.onrender.com/tasks/my-history/", {
        headers: {
          Authorization: `Bearer ${authState.token}`,
        },
      });
      setErandeeHistory(response.data);
    } catch (error) {
      toast({
        title: "Error fetching task history as erandee.",
        description: "Please try again later.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoadingErandee(false);
    }
  };

  useEffect(() => {
    fetchSenderHistory();
    fetchErandeeHistory();
  }, [authState.token]);

  return (
    <Box minH="100vh" bg="gray.100" p={8}>
      <VStack spacing={8} align="stretch">
        <Heading textAlign="center">Task History</Heading>
        <Tabs variant="enclosed">
          <TabList>
            <Tab>As Sender</Tab>
            <Tab>As Runner</Tab>
          </TabList>

          <TabPanels>
            {/* As Sender Tab */}
            <TabPanel>
              {isLoadingSender ? (
                <Spinner size="xl" />
              ) : (
                <VStack spacing={4} align="stretch">
                  {senderHistory.length > 0 ? (
                    senderHistory.map((task) => (
                      <Box
                        key={task.id}
                        p={4}
                        bg="white"
                        borderRadius="md"
                        boxShadow="md"
                      >
                        <Text fontWeight="bold">{task.name}</Text>
                        <Text>Type: {task.type}</Text>
                        <Text>Date Posted: {task.date_posted}</Text>
                      </Box>
                    ))
                  ) : (
                    <Text>No tasks found as sender.</Text>
                  )}
                </VStack>
              )}
            </TabPanel>

            {/* As Erandee Tab */}
            <TabPanel>
              {isLoadingErandee ? (
                <Spinner size="xl" />
              ) : (
                <VStack spacing={4} align="stretch">
                  {erandeeHistory.length > 0 ? (
                    erandeeHistory.map((task, index) => (
                        <Box
                        key={task.id}
                        p={4}
                        bg="white"
                        borderRadius="md"
                        boxShadow="md"
                      >
                        <Text fontWeight="bold">{task.name}</Text>
                        <Text>Type: {task.type}</Text>
                        <Text>Date Posted: {task.date_posted}</Text>
                      </Box>
                    ))
                  ) : (
                    <Text>No errands completed yet.</Text>
                  )}
                </VStack>
              )}
            </TabPanel>
          </TabPanels>
        </Tabs>
      </VStack>
    </Box>
  );
};

export default TaskHistory;
