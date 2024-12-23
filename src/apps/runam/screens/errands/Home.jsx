import React, { useEffect, useState } from "react";
import {
  Box,
  Input,
  Grid,
  GridItem,
  Heading,
  Text,
  Tag,
  Flex,
  Button,
  CircularProgress,
  Center,
  useToast,
  Textarea,
  FormControl,
  FormLabel,
  Select,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import axios from "axios";
import { useAuth } from "../../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { FaMoneyBillWave, FaPlus } from "react-icons/fa"; // Added FaPlus for floating button
import TaskSlider from "../../../../components/TaskSlider";
import { format } from "date-fns"; // For date formatting
import { FaPaperPlane } from "react-icons/fa";
import Draggable from "react-draggable";
import QuickStart from "./QuickStart";

const HomeScreen = () => {
  const { authState } = useAuth();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    filterType: "location", // Default filter type
    value: "", // Filter value
  });
  const [selectedTask, setSelectedTask] = useState(null);
  const [bidMessage, setBidMessage] = useState("");
  const [bidPrice, setBidPrice] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = () => {
      if (!authState.authenticated) navigate("/runam/onboarding/");
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
      } catch (error) {
        if (error.response?.status === 401) {
          localStorage.removeItem("runitAuthToken");
          localStorage.removeItem("refreshToken");
          navigate("/");
        }
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
    fetchData();
  }, [authState.token, navigate]);

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleBidSubmit = async () => {
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
      setBidMessage("");
      setBidPrice("");
      fetchData();
    } catch (error) {
      toast({
        title: "Error creating bid.",
        description: error.response?.data?.Error || "Something went wrong.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  // Filter data based on selected filters
  const filteredData = data.filter((task) => {
    const filterValue = filters.value.toLowerCase();

    let filterCondition = false;

    // Filter by location (pick_up or deliver_to)
    if (filters.filterType === "location") {
      filterCondition =
        task.pick_up?.toLowerCase().includes(filterValue) ||
        task.deliver_to?.toLowerCase().includes(filterValue);
    }

    // Filter by name
    if (filters.filterType === "name") {
      filterCondition = task.name?.toLowerCase().includes(filterValue);
    }

    // Filter by keywords (task name or description)
    if (filters.filterType === "keywords") {
      filterCondition =
        task.name?.toLowerCase().includes(filterValue) ||
        task.description?.toLowerCase().includes(filterValue);
    }

    // Filter by date (if date is selected)
    if (filters.filterType === "date") {
      filterCondition =
        format(new Date(task.created_at), "yyyy-MM-dd") === filters.value;
    }

    return filterCondition;
  });

  // Show message if no results are found
  const noResults =
    Object.values(filters).some((filter) => filter) &&
    filteredData.length === 0;

  if (loading) {
    return (
      <Center h="100vh">
        <CircularProgress isIndeterminate color="teal" />
      </Center>
    );
  }

  return (
    <Box spacing={5} align="stretch" bgColor={"gray.50"} p={5}>
      <TaskSlider visibility={["none"]} />
      <QuickStart/>
      <Flex mb={4} gap={4} alignItems={"center"}>
        {/* Filter Type Dropdown */}
        <FormControl width={"30%"} mb={4}>
          <Flex alignItems={"center"}>
            <FormLabel>Filter By:</FormLabel>
            <Select
              bgColor={"white"}
              name="filterType"
              value={filters.filterType}
              onChange={handleFilterChange}
              placeholder="Select filter type"
            >
              <option value="location">Location</option>
              <option value="name">Task Name</option>
              <option value="keywords">Keywords</option>
              {/* <option value="date">Date</option> */}
            </Select>
          </Flex>
        </FormControl>

        {/* Filter Input */}
        <FormControl mb={4}>
          <Flex alignItems={"center"}>
            <FormLabel>
              {filters.filterType.charAt(0).toUpperCase() +
                filters.filterType.slice(1)}
              :
            </FormLabel>
            <Input
              bgColor={"white"}
              placeholder={`Search by ${filters.filterType}...`}
              name="value"
              value={filters.value}
              onChange={handleFilterChange}
              type={filters.filterType === "date" ? "date" : "text"}
            />
          </Flex>
        </FormControl>
      </Flex>

      {/* Display message if no results found */}
      {noResults && (
        <Text color="red.500" mb={4}>
          No tasks found for these filters.
        </Text>
      )}

      <Grid
        width={"85vw"}
        templateColumns={["repeat(1, 1fr)", "repeat(1, 1fr)", "repeat(3, 1fr)"]}
        gap={4}
      >
        {filteredData.map((item) => (
          <GridItem
            key={item.id}
            bg="white"
            width={["80vw", "85vw", "30vw"]}
            p={5}
            borderRadius="lg"
            shadow="md"
            mb={4}
            boxShadow="0 4px 6px rgba(10, 16, 22,0.1)"
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"space-between"}
            borderWidth={1}
            borderColor={"#3182ce"}
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
            <>
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
            </>
            <Flex justifyContent="space-between">
              <Box
                borderWidth={2}
                borderColor={"#0a1016"}
                width={"fit-content"}
                borderRadius={9}
              >
                <Button
                  onClick={() => navigate(`/runam/errands/runner/${item.id}`)}
                  shadow="md"
                >
                  View Task
                </Button>
              </Box>
              <Box
                borderWidth={2}
                borderColor={"#0a1016"}
                width={"fit-content"}
                borderRadius={9}
              >
                <Button
                  colorScheme="blue"
                  shadow="md"
                  onClick={() => setSelectedTask(item) || onOpen()}
                >
                  Create a Bid
                </Button>
              </Box>
            </Flex>
          </GridItem>
        ))}
      </Grid>

      {/* Floating Button for creating a new bid */}
      <Draggable>
        <IconButton
          icon={<FaPaperPlane />}
          colorScheme="blue"
          size="lg"
          borderRadius="full"
          borderWidth={1}
          borderColor={"#0a1016"}
          position="fixed"
          top="80px"
          right="20px"
          zIndex="10"
          onClick={() => navigate("/runam/errands/create")}
        />
      </Draggable>

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
            <Button colorScheme="teal" mr={3} onClick={handleBidSubmit}>
              Submit Bid
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default HomeScreen;
