import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import {
  Box,
  Flex,
  IconButton,
  Collapse,
  VStack,
  Divider,
  Image,
  Button,
  useBreakpointValue,
  useToast,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons"; // Assuming AuthContext is configured
import companyLogo from "../../Assets/runamImages/Frame 238.png"; // Replace with the correct path to your logo
import { useAuth } from "../../context/AuthContext";

const ProfileLayout = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const { signout } = useAuth(); // Context method to handle signout
  const navigate = useNavigate();
  const toast = useToast();
  const isMobile = useBreakpointValue({ base: true, md: false });

  const toggleSidebar = () => setIsOpen(!isOpen);

  // Handle user signout
  const handleSignOut = () => {
    signout(); // Clear token or auth data
    toast({
      title: "Signed out successfully.",
      status: "info",
      duration: 3000,
      isClosable: true,
    });
    navigate("/"); // Redirect to home or login page
  };

  return (
    <Box>
      <Flex
        as="header"
        justifyContent="space-between"
        alignItems="center"
        p={4}
        bg="teal.500"
        color="white"
      >
        <Image src={companyLogo} alt="Company Logo" />
        {isMobile ? (
          <IconButton
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            onClick={toggleSidebar}
            aria-label="Toggle Navigation"
          />
        ) : (
          <Flex align="center">
            <Link to="/runam/errands" style={{ marginRight: "20px" }}>
              Home
            </Link>
            <Link to="/runam/errands/pending" style={{ marginRight: "20px" }}>
              Pending Tasks
            </Link>
            <Link to="/runam/errands/history" style={{ marginRight: "20px" }}>
              History
            </Link>
            <Link to="/runam/settings" style={{ marginRight: "20px" }}>
              Settings
            </Link>
            <Button variant="ghost" colorScheme="whiteAlpha" onClick={handleSignOut}>
              Signout
            </Button>
          </Flex>
        )}
      </Flex>

      <Flex>
        {isMobile && (
          <Collapse in={isOpen} animateOpacity>
            <VStack
              align="start"
              p={4}
              bg="teal.50"
              w="200px"
              position="absolute"
              zIndex="10"
            >
              <Link to="/runam/errands" style={{ padding: "10px 0" }}>
                Home
              </Link>
              <Link to="/runam/errands/pending" style={{ padding: "10px 0" }}>
                Pending Tasks
              </Link>
              <Link to="/runam/errands/history" style={{ padding: "10px 0" }}>
                History
              </Link>
              <Link to="/runam/settings" style={{ padding: "10px 0" }}>
                Settings
              </Link>
              <Button variant="link" colorScheme="teal" onClick={handleSignOut}>
                Signout
              </Button>
            </VStack>
          </Collapse>
        )}

        <Box flex="1" p={4}>
          <Divider />
          <Outlet />
        </Box>
      </Flex>
    </Box>
  );
};

export default ProfileLayout;
