import {  Outlet } from "react-router-dom";
import {
  Box,
  Flex,
  Divider,
} from "@chakra-ui/react";

const ProfileLayout = () => {


  return (
    <Box>
      <Flex
        as="header"
        justifyContent="space-between"
        alignItems="center"
        p={4}
        bg="teal.500"
        color="white"
        maxW={'100%'}
        maxH={'100vh'}
        minH={'100vh'}
        overflow={'hidden'}
      >
        

        <Box flex="1" p={4}>
          {/* <Divider /> */}
          <Outlet />
        </Box>
      </Flex>
    </Box>
  );
};

export default ProfileLayout;
