// Signin.jsx
import React, { useState } from "react";
import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Link as ChakraLink,
  Spinner,
  Text,
  VStack,
  Image,
  useToast,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Logo from "../../../../Assets/runamImages/Frame 238.png"

const Signin = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();

  const submitHandler = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        "https://runit-78od.onrender.com/users/login/",
        formData,
        { headers: { "Content-Type": "application/json" } }
      );
      console.log(response.data)
      localStorage.setItem("runitAuthToken", response.data.tokens.access);
      toast({
        title: "Login successful.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      navigate("/"); // Navigate to home or dashboard
    } catch (error) {
      const status = error.response?.status || 500;
      let message = "An unexpected error occurred. Please try again.";
      if (status === 400 || status === 422) message = "Invalid email or password.";
      else if (status === 401) message = "Unauthorized. Check your credentials.";
      else if (status === 403) message = "Access forbidden. Contact support.";
      else if (status === 404) message = "User not found.";
      toast({ title: "Login Failed", description: message, status: "error", duration: 3000, isClosable: true });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Center minH="100vh" bg="gray.50">
      <Box bg="white" p={8} borderRadius="lg" shadow="md" width="400px">
        <VStack spacing={6} align="stretch">
          <Flex justifyContent={'center'}>

          <Image src={Logo} alt="Logo" width="30%" mb={6} />
          </Flex>
          <Box>
            <Heading size="lg" mb={2}>Welcome Back!</Heading>
            <Text color="gray.500">Enter your email to sign into your account</Text>
          </Box>
          <VStack spacing={4} align="stretch">
            <FormControl>
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                placeholder="Email address"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value.toLowerCase() })}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  type={passwordVisible ? "text" : "password"}
                  placeholder="Password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <InputRightElement>
                  <Button
                    variant="ghost"
                    onClick={() => setPasswordVisible(!passwordVisible)}
                    size="sm"
                  >
                    {passwordVisible ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <ChakraLink as={Link} to="/auth/forgotPassword/createNew" color="blue.500" alignSelf="flex-start">
              Forgot your password?
            </ChakraLink>
            <Button
              colorScheme="teal"
              isFullWidth
              onClick={submitHandler}
              isLoading={loading}
            >
              Sign in
            </Button>
          </VStack>
          <Text textAlign="center">
            Don't have an account?{" "}
            <ChakraLink as={Link} to="/runam/auth/signup" color="blue.500" fontWeight="bold">
              Sign up
            </ChakraLink>
          </Text>
        </VStack>
      </Box>
    </Center>
  );
};

export default Signin;
