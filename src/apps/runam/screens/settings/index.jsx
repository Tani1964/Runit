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
  Text,
  Divider,
  Card,
  CardBody,
  CardFooter,
} from "@chakra-ui/react";
import axios from "axios";
import { useAuth } from "../../../../context/AuthContext";

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
  const [newAvatar, setNewAvatar] = useState(null);
  const toast = useToast();

  const fetchProfile = async () => {
    try {
      const [profileResponse, avatarResponse] = await Promise.all([
        axios.get("https://runit-78od.onrender.com/users/profile/", {
          headers: { Authorization: `Bearer ${authState.token}` },
        }),
        axios.get("https://runit-78od.onrender.com/users/profile/avatar/", {
          headers: { Authorization: `Bearer ${authState.token}` },
        }),
      ]);
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
    } catch {
      toast({
        title: "Error updating profile.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsSaving(false);
    }
  };

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
      setFormData((prev) => ({ ...prev, avatar: response.data.avatar }));
      toast({
        title: "Avatar updated successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch {
      toast({
        title: "Error updating avatar.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsUploadingAvatar(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAvatarChange = (e) => {
    setNewAvatar(e.target.files[0]);
  };

  useEffect(() => {
    fetchProfile();
  }, [authState.token]);

  if (isLoading) {
    return (
      <Box
        minH="100vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Spinner size="xl" />
      </Box>
    );
  }
  console.log(profile);
  return (
    <Box bg="gray.50" minH="100vh" py={10} px={5}>
      <VStack spacing={8}>
        <Heading size="lg">Settings</Heading>
        <Card bg="white" borderRadius="lg" boxShadow="md" w="100%" maxW="lg">
          <CardBody>
            <VStack spacing={5}>
              <Avatar
                size="2xl"
                src={formData.avatar}
                name={profile?.username}
              />
              <FormControl>
                <FormLabel>Update Avatar</FormLabel>
                <Flex align="center" gap={3}>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarChange}
                  />
                  {newAvatar && <Text fontSize="sm">{newAvatar.name}</Text>}
                </Flex>
                <Button
                  mt={2}
                  colorScheme="blue"
                  onClick={uploadAvatar}
                  isLoading={isUploadingAvatar}
                  isDisabled={!newAvatar}
                >
                  Upload
                </Button>
              </FormControl>
              <Divider />
              <FormControl>
                <FormLabel>Username</FormLabel>
                <Input
                  value={profile?.my_referral_code.user.username}
                  isReadOnly
                />
              </FormControl>
              <FormControl>
                <FormLabel>Email</FormLabel>
                <Input
                  value={profile?.my_referral_code.user.email}
                  isReadOnly
                />
              </FormControl>
              <FormControl>
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
                />
              </FormControl>
            </VStack>
          </CardBody>
          <CardFooter>
            <Button
              colorScheme="blue"
              onClick={updateProfile}
              isLoading={isSaving}
              w="full"
            >
              Save Changes
            </Button>
          </CardFooter>
        </Card>
      </VStack>
    </Box>
  );
};

export default Settings;
