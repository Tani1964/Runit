// NotFound.js
import React from 'react';
import { Box, Heading, Text, Button, VStack, Image } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <Box 
      bg="gray.100" 
      minH="100vh" 
      display="flex" 
      alignItems="center" 
      justifyContent="center"
      px={6}
    >
      <VStack spacing={6} textAlign="center">
        <Image 
          src="https://cdn-icons-png.flaticon.com/512/751/751463.png" 
          alt="404 Error" 
          boxSize="150px" 
        />
        <Heading size="2xl" fontWeight="bold">
          404 - Page Not Found
        </Heading>
        <Text fontSize="lg" color="gray.600">
          Oops! The page you are looking for does not exist.
        </Text>
        <Link to="/">
          <Button colorScheme="teal" size="lg">
            Go Back to Home
          </Button>
        </Link>
      </VStack>
    </Box>
  );
};

export default NotFound;
