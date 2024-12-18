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
  Avatar,
  Image,
} from "@chakra-ui/react";
import { useParams, useNavigate } from "react-router-dom";
import { axi, useAuth } from "../../../../context/AuthContext";

const TaskDetails = () => {
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { authState } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [bidders, setBidders] = useState([]);
  const [loadingBidders, setLoadingBidders] = useState(false);
  const [errorBidders, setErrorBidders] = useState(null);
  const [assigning, setAssigning] = useState(false);
  const [completing, setCompleting] = useState(false);
  const [assignedUser, setAssignedUser] = useState(null);
  const [selectedBidderDetails, setSelectedBidderDetails] = useState(null);

  // Fetch task by ID
  const fetchTask = async () => {
    try {
      const response = await axi.get(`/tasks/${id}/`, {
        headers: { Authorization: `Bearer ${authState.token}` },
      });
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
    try {
      const response = await axi.get(`/tasks/${id}/bidders/`, {
        headers: { Authorization: `Bearer ${authState.token}` },
      });
      setBidders(response.data.Bidders);
    } catch (err) {
      setErrorBidders("Failed to load bidders");
    } finally {
      setLoadingBidders(false);
    }
  };

  // Fetch details for a specific bidder
  const getBidderDetails = async (bidder) => {
    try {
      const response = await axi.get(`/tasks/${id}/bidders/${bidder}/details/`, {
        headers: { Authorization: `Bearer ${authState.token}` },
      });
      setSelectedBidderDetails(response.data);
      
    } catch (err) {
      toast({
        title: "Failed to fetch bidder details",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  // Assign task to a bidder
  const assignTask = async (bidderId) => {
    setAssigning(true);
    try {
      await axi.post(
        `/tasks/${id}/bidders/assign/${bidderId}/`,
        {},
        { headers: { Authorization: `Bearer ${authState.token}` } }
      );
      toast({
        title: "Task assigned successfully.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      fetchTask(); // Update task data
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

  return (
    <Box bg="gray.100" minH="100vh" p={5}>
      <Box bg="white" p={5} mb={5} borderRadius="md" boxShadow="md">
        <Heading size="lg">{task.name}</Heading>
        <Text color="gray.500" mt={2}>Task ID: {task.id}</Text>
      </Box>

      <VStack
        spacing={4}
        align="start"
        bg="white"
        p={5}
        borderRadius="md"
        boxShadow="md"
      >
        <Text><strong>Description:</strong> {task.description}</Text>
        <Text><strong>Category:</strong> {task.category}</Text>
        <Text><strong>Budget:</strong> ₦{task.bidding_amount}</Text>
        <Text><strong>Status:</strong> {task.is_active ? "Active" : "Inactive"}</Text>

        {assignedUser && (
          <Text color="green.600">
            <strong>Assigned User:</strong> {assignedUser}
          </Text>
        )}

        <Button colorScheme="blue" onClick={handleViewBidders} isLoading={loadingBidders}>
          View Bidders
        </Button>

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Bidders</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              {loadingBidders ? (
                <Spinner />
              ) : errorBidders ? (
                <Text color="red.500">{errorBidders}</Text>
              ) : bidders.length > 0 ? (
                bidders.map((bidder, idx) => (
                  <Box key={idx} mb={4} p={3} border="1px solid #e0e0e0" borderRadius="md">
                    <Flex align="center">
                      <Avatar size="sm" mr={3} />
                      <Box>
                        <Text><strong>{bidder.user}</strong></Text>
                        <Text>Bid: ₦{bidder.price}</Text>
                        <Text>Proposal: {bidder.message}</Text>
                        {selectedBidderDetails?.user.username === bidder.user && (
                          <Box mt={2}>
                            <Heading size={'sm'}>Contact Info:</Heading>
                            <Text>Phone: {selectedBidderDetails.phone_number}</Text>
                            <Text>Email: {selectedBidderDetails.user.email}</Text>
                          </Box>
                        )}
                        <Flex gap={2} mt={2}>
                          <Button size="sm" onClick={() => getBidderDetails(bidder.user)}>
                            View Details
                          </Button>
                          <Button
                            size="sm"
                            colorScheme="green"
                            onClick={() => assignTask(bidder.user)}
                            isLoading={assigning}
                          >
                            Assign Task
                          </Button>
                        </Flex>
                      </Box>
                    </Flex>
                  </Box>
                ))
              ) : (
                <Text>No bidders available.</Text>
              )}
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" onClick={onClose}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </VStack>
    </Box>
  );
};

export default TaskDetails;
