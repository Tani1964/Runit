import React, { useEffect, useState } from "react";
import {
  Box,
  Avatar,
  VStack,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  useToast,
  Spinner,
  Flex,
  Text
} from "@chakra-ui/react";
import axios from "axios";
import { useAuth } from "../../../../context/AuthContext"; // Assuming AuthContext is set up

const Settings = () => {
  const { authState } = useAuth();
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const [formData, setFormData] = useState({
    bio: "",
    phone_number: "",
    location: "",
    avatar: "",
  });
  const [newAvatar, setNewAvatar] = useState(null); // To store the new avatar
  const toast = useToast();

  // Fetch User Profile and Avatar
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

      // Fetch profile avatar
      const avatarResponse = await axios.get(
        "https://runit-78od.onrender.com/users/profile/avatar/",
        {
          headers: {
            Authorization: `Bearer ${authState.token}`,
          },
        }
      );

      setProfile(profileResponse.data);
      setFormData({
        bio: profileResponse.data.bio || "",
        phone_number: profileResponse.data.phone_number || "",
        location: profileResponse.data.location || "",
        avatar: avatarResponse.data.avatar || "",
      });
    } catch (error) {
      toast({
        title: "Error fetching profile.",
        description: "Please try again later.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Update User Profile
  const updateProfile = async () => {
    setIsSaving(true);
    try {
      await axios.put(
        "https://runit-78od.onrender.com/users/profile/",
        formData,
        {
          headers: {
            Authorization: `Bearer ${authState.token}`,
            "Content-Type": "application/json",
          },
        }
      );
      toast({
        title: "Profile updated successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error updating profile.",
        description: "Please try again later.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsSaving(false);
    }
  };

  // Upload New Avatar
  const uploadAvatar = async () => {
    if (!newAvatar) return;

    const formData = new FormData();
    formData.append("avatar", newAvatar);

    setIsUploadingAvatar(true);
    try {
      const response = await axios.put(
        "https://runit-78od.onrender.com/users/profile/avatar/",
        formData,
        {
          headers: {
            Authorization: `Bearer ${authState.token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setFormData((prevData) => ({ ...prevData, avatar: response.data.avatar }));
      toast({
        title: "Avatar updated successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error updating avatar.",
        description: "Please try again later.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsUploadingAvatar(false);
    }
  };

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handle avatar file selection
  const handleAvatarChange = (e) => {
    setNewAvatar(e.target.files[0]);
  };

  useEffect(() => {
    fetchProfile();
  }, [authState.token]);

  if (isLoading) {
    return (
      <Box minH="100vh" display="flex" alignItems="center" justifyContent="center">
        <Spinner size="xl" />
      </Box>
    );
  }

  return (
    <Box bg="gray.100" minH="100vh" p={8}>
      <VStack spacing={8} align="stretch">
        <Heading textAlign="center">Settings</Heading>

        <VStack spacing={4} align="stretch" bg="white" p={8} borderRadius="md" boxShadow="md">
          <Avatar size="xl" src={formData.avatar} name={profile?.my_referral_code?.user.username} />

          <FormControl>
            <FormLabel>Update Avatar</FormLabel>
            <Input type="file" accept="image/*" onChange={handleAvatarChange} />
            <Button
              mt={2}
              colorScheme="blue"
              isLoading={isUploadingAvatar}
              onClick={uploadAvatar}
              disabled={!newAvatar}
            >
              Upload Avatar
            </Button>
          </FormControl>

          <FormControl>
            <FormLabel>Username</FormLabel>
            <Input value={profile?.my_referral_code?.user.username} isReadOnly />
          </FormControl>

          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input value={profile?.my_referral_code?.user.email} isReadOnly />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Phone Number</FormLabel>
            <Input
              name="phone_number"
              value={formData.phone_number}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Bio</FormLabel>
            <Textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              placeholder="Tell us a bit about yourself..."
            />
          </FormControl>

          <FormControl>
            <FormLabel>Location</FormLabel>
            <Input
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Enter your location"
            />
          </FormControl>
          <Flex>
            <Text>Referral Code: {profile.my_referral_code.code}</Text>
          </Flex>
          <Button
            colorScheme="teal"
            isLoading={isSaving}
            onClick={updateProfile}
          >
            Save Changes
          </Button>
        </VStack>
      </VStack>
    </Box>
  );
};

export default Settings;
