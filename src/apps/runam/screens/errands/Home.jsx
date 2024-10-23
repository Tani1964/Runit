import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Center,
  CircularProgress,
  Flex,
  Heading,
  IconButton,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Tag,
  Text,
  Textarea,
  VStack,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { FaMoneyBillWave, FaPaperPlane } from "react-icons/fa";
import axios from "axios";
import { useAuth } from "../../../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function HomeScreen() {
  const { authState } = useAuth();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTask, setSelectedTask] = useState(null);
  const [bidMessage, setBidMessage] = useState("");
  const [bidPrice, setBidPrice] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const navigate = useNavigate();

  const checkAuth = async () => {
    if (!authState.authenticated) {
      navigate("/runam/onboarding/");
    }
  };

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
      if (error.response?.status != 401) {
        
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

  const openBidModal = (task) => {
    setSelectedTask(task);
    onOpen();
  };

  const submitBid = async () => {
    try {
      const headers = {
        Authorization: `Bearer ${authState.token}`,
        "Content-Type": "application/json",
      };
      await axios.post(
        `https://runit-78od.onrender.com/tasks/${selectedTask.id}/bid/`,
        { message: bidMessage, price: bidPrice },
        { headers }
      );
      toast({
        title: "Bid created successfully!",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      onClose();
      fetchData(); // Refresh tasks after creating bid
    } catch (error) {
      toast({
        title: "Error creating bid.",
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
        <Box key={item.id} bg="white" p={5} borderRadius="md" shadow="md" mb={4}>
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
            onClick={() => openBidModal(item)}
            isFullWidth
          >
            Create Bid
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

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create a Bid</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Textarea
              placeholder="Enter your message"
              value={bidMessage}
              onChange={(e) => setBidMessage(e.target.value)}
              mb={4}
            />
            <Input
              placeholder="Enter your price"
              type="number"
              value={bidPrice}
              onChange={(e) => setBidPrice(e.target.value)}
            />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="teal" mr={3} onClick={submitBid}>
              Submit Bid
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </VStack>
  );
}
