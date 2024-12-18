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
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { useAuth } from "../../context/AuthContext";
import companyLogo from "../../Assets/runamImages/Frame 238.png";

const ProfileLayout = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const { signout } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();
  const isMobile = useBreakpointValue({ base: true, md: false });

  const navLinks = [
    { label: "Home", to: "/runam/errands" },
    { label: "Pending Tasks", to: "/runam/errands/pending" },
    { label: "History", to: "/runam/errands/history" },
    { label: "Settings", to: "/runam/settings" },
  ];

  const toggleSidebar = () => setIsOpen(!isOpen);

  const handleSignOut = async () => {
    try {
      await signout();
      toast({
        title: "Signed out successfully.",
        status: "info",
        duration: 3000,
        isClosable: true,
      });
      navigate("/");
    } catch (error) {
      toast({
        title: "Error signing out.",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleOutsideClick = () => {
    if (isMobile && isOpen) setIsOpen(false);
  };

  return (
    <Box maxW="100%" onClick={handleOutsideClick} color={'#0a1016'}>
      <Flex
        as="header"
        justifyContent="space-between"
        alignItems="center"
        p={2}
        px={10}
        // bg="teal.500"
        bg={'#2b6cb0'}
        color="white"
      >
        <Image
          src={companyLogo}
          alt="Company Logo"
          fallbackSrc="https://via.placeholder.com/150"
        />
        {isMobile ? (
          <IconButton
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            onClick={(e) => {
              e.stopPropagation(); // Prevent closing when clicking the button
              toggleSidebar();
            }}
            aria-label="Toggle Navigation"
          />
        ) : (
          <Flex align="center">
            {navLinks.map((link) => (
              <Box
                as={Link}
                key={link.to}
                to={link.to}
                px={4}
                py={2}
                _hover={{ bg: "teal.600", borderRadius: "md" }}
              >
                {link.label}
              </Box>
            ))}
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
              {navLinks.map((link) => (
                <Box
                  as={Link}
                  key={link.to}
                  to={link.to}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleSidebar(); // Close sidebar when link is clicked
                  }}
                  py={2}
                >
                  {link.label}
                </Box>
              ))}
              <Button
                variant="link"
                colorScheme="teal"
                onClick={(e) => {
                  e.stopPropagation();
                  handleSignOut();
                }}
              >
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
