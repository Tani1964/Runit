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
        

        <Box flex="1" p={4}>
          <Divider />
          <Outlet />
        </Box>
      </Flex>
    </Box>
  );
};

export default ProfileLayout;
