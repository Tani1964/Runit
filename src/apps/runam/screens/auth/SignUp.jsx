import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Image,
  Text,
  VStack,
  Flex,
  Alert,
  AlertIcon,
  Link as ChakraLink,
  Center,
} from "@chakra-ui/react";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Logo from "../../../../Assets/runamImages/Frame 238.png";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [referralCode, setReferralCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const submitHandler = async () => {
    if (!email || !fullName || !password) {
      setError("Please fill in all fields.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    setLoading(true);
    try {
      await axios.post("https://runit-78od.onrender.com/users/register/", {
        email,
        username: fullName,
        password,
        password2: password,
        referralCode,
      });

      navigate("/runam/auth/signin");
    } catch (error) {
      const status = error.response?.status || 500;
      let message = "An error occurred. Please try again.";
      if (status === 409 || status === 400) message = "Email already exists. Please sign in.";
      else message = "Network error. Please check your connection.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Center maxH="100vh" bg="gray.50" color="#010030">
      <Box bg="white" p={8} borderRadius="lg" shadow="md" width={["80vw","70vw", "30vw"]}>
        <VStack spacing={6} align="stretch">
          <Flex justifyContent={"center"}>
            <Image src={Logo} alt="Logo" width="30%" mb={6} />
          </Flex>
          <Text color="gray.500" textAlign="center">
            Enter your details to create your account
          </Text>

          {error && (
            <Alert status="error" borderRadius="md">
              <AlertIcon />
              {error}
            </Alert>
          )}

          <VStack spacing={4} align="stretch">
            <FormControl isRequired>
              <FormLabel>Full Name</FormLabel>
              <Input
                placeholder="User name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Email Address</FormLabel>
              <Input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Referral Code</FormLabel>
              <Input
                placeholder="Enter referral code (optional)"
                value={referralCode}
                onChange={(e) => setReferralCode(e.target.value)}
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  type={passwordVisible ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <InputRightElement>
                  <Button
                    size="sm"
                    onClick={() => setPasswordVisible(!passwordVisible)}
                    variant="ghost"
                  >
                    {passwordVisible ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>

            <Button
              colorScheme="teal"
              width="full"
              onClick={submitHandler}
              isLoading={loading}
              loadingText="Signing Up..."
            >
              Sign Up
            </Button>

            <Text textAlign="center">
              Already have an account?{" "}
              <ChakraLink
                color="blue.500"
                onClick={() => navigate("/runam/auth/signin")}
              >
                Sign in
              </ChakraLink>
            </Text>

            <Text fontSize="sm" color="gray.500" textAlign="center">
              By creating an account, you agree to ACSS & PITCH's{" "}
              <ChakraLink color="blue.500" href="/terms">
                Privacy Policy
              </ChakraLink>{" "}
              and{" "}
              <ChakraLink color="blue.500" href="/terms">
                Terms of Use
              </ChakraLink>
            </Text>
          </VStack>
        </VStack>
      </Box>
    </Center>
  );
};

export default Signup;
