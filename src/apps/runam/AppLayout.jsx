import React from "react";
import { Link, Outlet } from "react-router-dom";
import {
  Box,
  Flex,
  Heading,
  Text,
  useBreakpointValue,
  IconButton,
  Collapse,
  VStack,
  Divider,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";

const ProfileLayout = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  const isMobile = useBreakpointValue({ base: true, md: false });

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
        <Heading size="lg">Profile</Heading>
        {isMobile && (
          <IconButton
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            onClick={toggleSidebar}
            aria-label="Toggle Navigation"
          />
        )}
        {!isMobile && (
          <Flex>
            <Link to="/profile" style={{ marginRight: "20px" }}>
              Overview
            </Link>
            <Link to="/profile/name">Name</Link>
          </Flex>
        )}
      </Flex>

      <Flex>
        {isMobile && (
          <Collapse in={isOpen}>
            <VStack align="start" p={4} bg="teal.50" w="200px" position="absolute">
              <Link to="/profile" style={{ padding: "10px 0" }}>
                Overview
              </Link>
              <Link to="/profile/name" style={{ padding: "10px 0" }}>
                Name
              </Link>
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
