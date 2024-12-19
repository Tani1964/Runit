import {
  Box,
  Button,
  Flex,
  Heading,
  Text,
  Progress,
  Avatar,
  Link,
  Image,
  useToast,
  Spinner,
} from "@chakra-ui/react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import image1 from "../Assets/runamImages/3done.png";
import image2 from "../Assets/runamImages/3dtwo.png";
import image3 from "../Assets/runamImages/3dthree.png";

function CustomCard() {
  const { authState } = useAuth();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [profile, setProfile] = useState(null);
  const [picture, setPicture] = useState(null)
  const [isLoading, setIsLoading] = useState(true);
  const toast = useToast();

  const fetchProfile = async () => {
    try {
      // Fetch profile details
      const profileResponse = await axios.get(
        "https://runit-78od.onrender.com/users/profile/",
        {
          headers: {
            Authorization: `Bearer ${authState.token}`,
          },
        }
      );
      const profilePic = await axios.get("https://runit-78od.onrender.com/users/profile/avatar/", {
        headers: { Authorization: `Bearer ${authState.token}` },
      })


      setPicture(profilePic.data.avatar)
      setProfile(profileResponse.data);
    } catch (error) {
      // toast({
      //   title: "Error fetching profile.",
      //   description: "Please try again later.",
      //   status: "error",
      //   duration: 5000,
      //   isClosable: true,
      // });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  // Array of slides with text and image
  const slides = [
    {
      title: "Post tasks and earn 10x more daily",
      subtitle: "Connect with clients faster and get hired",
      image: image1,
    },
    {
      title: "Manage all your tasks effortlessly",
      subtitle: "Save time and stay productive",
      image: image2,
    },
    {
      title: "Grow your income with smart task management",
      subtitle: "Run your business with ease",
      image: image3,
    },
  ];

  // Automatically cycle through slides every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 3000);

    return () => clearInterval(interval); // Cleanup on unmount
  }, [slides.length]);

  return (
    <Flex
      gap={6}
      paddingY={6}
      align="center"
      display={["none", "none", "flex"]}
    >
      {/* Left Promotional Section with Slider */}
      <Box
        bgColor="#2B6CB0"
        borderRadius="20px"
        padding={6}
        color="white"
        minHeight="250px"
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        position="relative"
        minWidth="70%"
      >
        <Box>
          <Text fontWeight="bold" fontSize="sm" mb={2}>
            {slides[currentIndex].subtitle}
          </Text>
          <Heading size="lg">{slides[currentIndex].title}</Heading>
        </Box>
        <Box borderWidth={2} borderColor={"#0a1016"} width={'fit-content' } borderRadius={9}>
          <Button
            bgColor="white"
            color="#115e59"
            size="md"
            width="fit-content"
            _hover={{ bgColor: "gray.100" }}
          >
            Create a task now
          </Button>
        </Box>

        {/* Slider Image */}
        <Image
          src={slides[currentIndex].image}
          alt="Slider Image"
          position="absolute"
          bottom="10px"
          right="10px"
          boxSize="180px"
          borderRadius="10px"
          bg="#2b6cb0"
        />
      </Box>

      {/* Right Profile Section */}
      <Box
        bgColor="white"
        color={"#2b6cb0"}
        borderColor={"#2b6cb0"}
        borderWidth={2}
        borderRadius="20px"
        padding={4}
        boxShadow="sm"
        minHeight="250px"
        minWidth="27%"
        display="flex"
        flexDirection="column"
        alignItems="center"
        textAlign="center"
      >
        {isLoading ? (
          <Spinner size="lg" color="teal.500" mt={10} />
        ) : profile ? (
          <>
            <Avatar
              size="lg"
              colorScheme="blue"
              name={profile.my_referral_code?.user?.username || "Unknown"}
              src={picture}
              mb={2}
            />
            <Link fontWeight="bold" fontSize="md" color="#2b6cb0" isTruncated>
              {profile.my_referral_code?.user?.username || "User"}
            </Link>
            <Text fontSize="sm" color="gray.600" mt={1}>
              {profile.bio || "No bio available"}
            </Text>
            <Text fontSize="sm" color="gray.600" mt={1}>
              {profile.phone_number || "No phone number"}
            </Text>
            <Link color="#2b6cb0" fontSize="sm" mt={2}>
              Referral Code: {profile.my_referral_code?.code || "N/A"}
            </Link>
            <Progress
              value={100}
              size="sm"
              colorScheme="blue"
              width="100%"
              mt={2}
              borderRadius="full"
            />
            <Text fontSize="xs" color="gray.500" mt={1}>
              Profile Complete: 100%
            </Text>
          </>
        ) : (
          <Text color="red.500" fontSize="md">
            Unable to load profile details.
          </Text>
        )}
      </Box>
    </Flex>
  );
}

export default CustomCard;
