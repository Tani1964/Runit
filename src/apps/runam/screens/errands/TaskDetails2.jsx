import React, { useEffect, useState } from "react";
import {
  Box,
  Text,
  Heading,
  VStack,
  Button,
  Spinner,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  useToast,
  Flex,
} from "@chakra-ui/react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { axi, useAuth } from "../../../../context/AuthContext"; // Adjust the path if needed

const TaskDetails = () => {
  const { id } = useParams(); // Extract the task ID from the route
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { authState } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();

  // Modal controls
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [bidders, setBidders] = useState([]);
  const [loadingBidders, setLoadingBidders] = useState(false);
  const [errorBidders, setErrorBidders] = useState(null);
  const [assigning, setAssigning] = useState(false);
  const [completing, setCompleting] = useState(false); // New state for marking task as completed

  // Fetch task by ID
  const fetchTask = async () => {
    try {
      const headers = {
        Authorization: `Bearer ${authState.token}`,
        "Content-Type": "application/json",
      };
      const response = await axi.get(`/tasks/${id}/`, { headers });
      setTask(response.data);
    } catch (err) {
      setError("Failed to load task");
    } finally {
      setLoading(false);
    }
  };

  // Fetch bidders for the task
  const fetchBidders = async () => {
    setLoadingBidders(true);
    setErrorBidders(null);
    try {
      const headers = {
        Authorization: `Bearer ${authState.token}`,
        "Content-Type": "application/json",
      };
      const response = await axi.get(`/tasks/${id}/bidders/`, { headers });

      
      setBidders(response.data.Bidders);
    } catch (err) {
      setErrorBidders("Failed to load bidders");
    } finally {
      setLoadingBidders(false);
    }
  };

  // Assign task to a bidder
  const assignTask = async (bidderId) => {
    setAssigning(true);
    try {
      const headers = {
        Authorization: `Bearer ${authState.token}`,
        "Content-Type": "application/json",
      };
      await axi.post(
        `/tasks/${id}/bidders/assign/${bidderId}/`,
        {},
        { headers }
      );
      toast({
        title: "Task assigned successfully.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      onClose();
    } catch (err) {
      toast({
        title: "Failed to assign task.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setAssigning(false);
    }
  };

  // Mark task as completed
  const completeTask = async () => {
    setCompleting(true);
    try {
      const headers = {
        Authorization: `Bearer ${authState.token}`,
        "Content-Type": "application/json",
      };
      await axi.put(`/tasks/${id}/complete/`, {}, { headers });
      toast({
        title: "Task marked as completed.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      // Optionally, update task state to reflect completion
      setTask({ ...task, completed: true });
    } catch (err) {
      toast({
        title: "Failed to mark task as completed.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setCompleting(false);
    }
  };

  useEffect(() => {
    fetchTask();
  }, [id]);

  const handleViewBidders = () => {
    fetchBidders();
    onOpen();
  };

  if (loading) {
    return (
      <Box textAlign="center" mt={10}>
        <Spinner size="xl" />
        <Text>Loading task details...</Text>
      </Box>
    );
  }

  if (error) {
    return (
      <Box textAlign="center" mt={10}>
        <Text color="red.500">{error}</Text>
      </Box>
    );
  }

  if (!task) {
    return null; // Render nothing if task is not available yet
  }

  return (
    <Box bg="gray.100" minH="100vh" p={5}>
      <Box bg="white" p={5} mb={5} borderRadius="md" boxShadow="md">
        <Heading size="lg">{task.name}</Heading>

        <Text color="gray.500" mt={2}>
          Task ID: {task.id}
        </Text>
        {task.completed ? (
          <Text mb={2} color={"green"}>
            Completed!
          </Text>
        ) : (
          <Text mb={2} color={"orange"}>Pending...</Text>
        )}
      </Box>

      <VStack
        spacing={4}
        align="start"
        bg="white"
        p={5}
        borderRadius="md"
        boxShadow="md"
      >
        {/* Task Details */}
        <Text fontSize="md">
          <strong>Description:</strong> {task.description}
        </Text>
        <Text fontSize="md">
          <strong>Category:</strong> {task.category}
        </Text>
        <Text fontSize="md">
          <strong>Sender Name:</strong> {task.sender_name}
        </Text>
        <Text fontSize="md">
          <strong>Sender's Budget:</strong> ₦{task.bidding_amount}
        </Text>
        <Text fontSize="md">
          <strong>Status:</strong> {task.is_active ? "Active" : "Inactive"}
        </Text>
        <Text fontSize="md">
          <strong>Picked Up:</strong> {task.picked_up ? "Yes" : "No"}
        </Text>
        <Text fontSize="md">
          <strong>Completed:</strong> {task.completed ? "Yes" : "No"}
        </Text>
        <Text fontSize="md">
          <strong>Paid:</strong> {task.paid ? "Yes" : "No"}
        </Text>

        {/* Modal for Bidders */}
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Bidders for Task</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              {loadingBidders ? (
                <Spinner size="md" />
              ) : errorBidders ? (
                <Text color="red.500">{errorBidders}</Text>
              ) : bidders.length > 0 ? (
                bidders.map((bidder, index) => (
                  <Box key={index} p={3} borderBottom="1px solid #e0e0e0">
                    <Text>
                      <strong>Bidder {index + 1}</strong>
                    </Text>
                    <Text>Name: {bidder.user}</Text>
                    <Text>Bid Amount: ₦{bidder.price}</Text>
                    <Text>Proposal: {bidder.message}</Text>
                    <Button
                      colorScheme="green"
                      mt={2}
                      isLoading={assigning}
                      onClick={() => assignTask(bidder.user)}
                    >
                      Assign Task
                    </Button>
                  </Box>
                ))
              ) : (
                <Text>No bidders available.</Text>
              )}
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        <Flex width={"100%"} direction="row" justify="space-between">
          {/* View Bidders Button */}
          {/* <Button colorScheme="blue" onClick={handleViewBidders}>
            View Bidders
          </Button> */}

          {/* Complete Task Button */}
          {/* <Button
            colorScheme="green"
            isLoading={completing}
            onClick={completeTask}
            disabled={task.completed} // Disable if task is already completed
          >
            {task.completed ? "Task Completed" : "Mark as Completed"} */}
          {/* </Button> */}

          {/* Navigation Back */}
          <Button colorScheme="blue" onClick={() => navigate(-1)}>
            Go Back
          </Button>
        </Flex>
      </VStack>
    </Box>
  );
};

export default TaskDetails;
