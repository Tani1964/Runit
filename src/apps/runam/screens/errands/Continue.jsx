import React, { useState } from "react";
import axios from "axios";
import {
  Box,
  Text,
  Input,
  Button,
  VStack,
  HStack,
  useToast,
  Flex,
  Spacer,
} from "@chakra-ui/react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../../../context/AuthContext"; // Adjust path as needed

const ContinueErrand = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const toast = useToast();
  const { authState } = useAuth();

  // Provide fallback values in case state is null or undefined
  const {
    requestType = "",
    pick_up = "",
    deliverTo = "",
    description = "",
    title = "",
  } = state || {};

  const [price, setPrice] = useState("");
  const [tip, setTip] = useState("");
  const [selectedTip, setSelectedTip] = useState(null);
  const [image, setImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const predefinedTips = [100, 500, 1000];
  const total = parseFloat(price || 0) + parseFloat(tip || 0);

  // Handle file selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size > 1048576) { // 1MB limit
      toast({
        title: "Image Too Large",
        description: "Image size should not exceed 1 MB.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      setImage(null);
    } else {
      setImage(file);
    }
  };

  // Upload image to the task
  const handleImageUpload = async (taskId) => {
    if (!image) return; // If no image is selected, return early

    const formData = new FormData();
    formData.append("image", image);

    try {
      const headers = {
        Authorization: `Bearer ${authState.token}`,
        "Content-Type": "multipart/form-data",
      };

      const response = await axios.post(
        `https://runit-78od.onrender.com/tasks/${taskId}/add-image/`,
        formData,
        { headers }
      );

      toast({
        title: "Image Uploaded",
        description: "Your image has been successfully uploaded.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Image Upload Failed",
        description: "Failed to upload the image. Please try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  // Handle errand submission
  const handleSendErrand = async () => {
    setIsUploading(true);
    try {
      const headers = {
        Authorization: `Bearer ${authState.token}`,
        "Content-Type": "application/json",
      };

      const payload = {
        name: title,
        description,
        pick_up,
        deliver_to: deliverTo,
        bidding_amount: price,
        type: requestType,
      };

      const response = await axios.post(
        "https://runit-78od.onrender.com/tasks/",
        payload,
        { headers }
      );

      const taskId = response.data.id; // Assuming the task ID is returned in the response
      console.log("Errand sent successfully:", response.data);

      if (image) {
        await handleImageUpload(taskId); // Upload image if there's one selected
      }

      toast({
        title: "Success",
        description: "Your errand has been sent successfully!",
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      navigate("/runam/errands");
    } catch (error) {
      console.error("Error sending errand:", error);
      toast({
        title: "Error",
        description: "Failed to send the errand. Please try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Box p={8} bg="gray.50" minH="100vh">
      <VStack spacing={6} align="stretch">
        <Text fontSize="2xl" fontWeight="bold" textAlign="center">
          General Request
        </Text>
        <Text fontSize="md" color="gray.500" textAlign="center">
          Please review and confirm the details of your errand request.
        </Text>

        <Input
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          type="number"
          bg="white"
        />
        <Input
          placeholder="Tip"
          value={tip}
          onChange={(e) => setTip(e.target.value)}
          type="number"
          bg="white"
        />

        <HStack spacing={4} justify="center">
          {predefinedTips.map((tipAmount) => (
            <Button
              key={tipAmount}
              colorScheme={selectedTip === tipAmount ? "teal" : "gray"}
              onClick={() => {
                setSelectedTip(tipAmount);
                setTip(tipAmount.toString());
              }}
            >
              ₦{tipAmount}
            </Button>
          ))}
        </HStack>

        <Flex>
          <Text fontSize="lg">Total:</Text>
          <Spacer />
          <Text fontSize="lg" fontWeight="bold">
            ₦{total.toFixed(2)}
          </Text>
        </Flex>

        <Input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          bg="white"
        />
        {image && <Text>{image.name}</Text>}

        <Button
          colorScheme="teal"
          onClick={handleSendErrand}
          isLoading={isUploading}
        >
          Send Errand
        </Button>
      </VStack>
    </Box>
  );
};

export default ContinueErrand;
