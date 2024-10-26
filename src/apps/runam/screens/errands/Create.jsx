// CreateErrand.jsx
import React, { useState } from 'react';
import { 
  Box, 
  Button, 
  Heading, 
  Input, 
  Text, 
  Textarea, 
  VStack, 
  HStack, 
  useToast 
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const CreateErrand = () => {
  const [requestType, setRequestType] = useState('Solo');
  const [pick_up, setPickUp] = useState('');
  const [deliverTo, setDeliverTo] = useState('');
  const [description, setDescription] = useState('');
  const [title, setTitle] = useState('');
  const toast = useToast();
  const navigate = useNavigate();

  const handleProceed = () => {
    if (!title || !description || !pick_up || !deliverTo) {
      toast({
        title: 'Error',
        description: 'Please fill in all fields before proceeding.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    navigate('/runam/errands/continue', {
      state: { requestType, pick_up, deliverTo, description, title },
    });
  };

  return (
    <VStack spacing={5} p={8} bg="gray.50" minH="100vh">
      <Heading size="lg" textAlign="center">
        General Request
      </Heading>
      <Text textAlign="center" color="gray.600">
        Please provide the details of the errand you would like to request.
      </Text>

      {/* Request Type Buttons */}
      {/* <HStack spacing={4} justify="center">
        {['Solo', 'Group'].map((type) => (
          <Button
            key={type}
            variant={requestType === type ? 'solid' : 'outline'}
            colorScheme={requestType === type ? 'teal' : 'gray'}
            onClick={() => setRequestType(type)}
            flex={1}
          >
            {type}
          </Button>
        ))}
      </HStack> */}

      {/* Text Inputs */}
      <Textarea
        placeholder="What do you need?"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        size="md"
        bg="white"
        borderColor="gray.300"
      />
      <Textarea
        placeholder="Please provide more information on the task."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        size="md"
        bg="white"
        borderColor="gray.300"
      />
      <Input
        placeholder="Pick up from:"
        value={pick_up}
        onChange={(e) => setPickUp(e.target.value)}
        bg="white"
        borderColor="gray.300"
      />
      <Input
        placeholder="Deliver to:"
        value={deliverTo}
        onChange={(e) => setDeliverTo(e.target.value)}
        bg="white"
        borderColor="gray.300"
      />

      {/* Proceed Button */}
      <Button
        colorScheme="teal"
        width="full"
        onClick={handleProceed}
      >
        Proceed
      </Button>
    </VStack>
  );
};

export default CreateErrand;
