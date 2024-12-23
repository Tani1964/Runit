import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Heading,
  Textarea,
  Select,
  VStack,
  Input,
  useToast,
} from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';

const CreateErrand = () => {
  const { urlCategory } = useParams();
  const categories = {
    "Catering/Restaurants": [
      "What type of event is this catering for?",
      "How many guests are expected?",
      "Are there any dietary restrictions or preferences?",
      "Do you need assistance with serving, setup, or cleanup?",
      "What is the desired menu or cuisine type?",
      "Do you have a preferred restaurant or caterer?",
    ],
    "Child or Elderly Care": [
      "What type of care is required (e.g., babysitting, elderly assistance)?",
      "What is the age and specific needs of the person needing care?",
      "Are there any medical conditions or special instructions to follow?",
      "What is the expected duration of care?",
      "Do you need assistance with activities (e.g., feeding, dressing, transportation)?",
    ],
    "Cleaning Tasks": [
      "What specific areas or items need cleaning?",
      "Are there any specific cleaning supplies or equipment required?",
      "Are there any surfaces or materials that need special attention (e.g., delicate fabrics, hardwood)?",
      "Are there any restrictions on the cleaning products that can be used?",
      "How frequently do you need this cleaning service?",
    ],
    "Delivery Tasks": [
      "What items need to be delivered?",
      "Are there any fragile or perishable items involved?",
      "What is the exact pickup and delivery address?",
      "Are there any special handling instructions for the items?",
      "What’s the expected delivery timeframe?",
    ],
    "Errand Help": [
      "What errands need to be completed?",
      "Do you have any specific preferences for the tasks?",
      "Are there time constraints or deadlines for these errands?",
      "Do you need assistance with transportation for the errands?",
      "Are there any specific instructions for completing the errands?",
    ],
    "Event Planning": [
      "What type of event are you planning?",
      "What is the estimated number of attendees?",
      "Do you have a venue selected, or do you need assistance finding one?",
      "Are there any special arrangements required (e.g., decorations, equipment)?",
      "What is the event date and time?",
    ],
    "Fitness or Personal Training": [
      "What are your fitness goals?",
      "Do you have any medical conditions or physical limitations to consider?",
      "What is your current fitness level?",
      "Do you have access to a gym or preferred workout location?",
      "Do you need a meal plan along with the training?",
    ],
    "Handyman Tasks": [
      "What specific repairs or installations are needed?",
      "Do you have the tools and materials on-site, or should they be provided?",
      "Are there any structural concerns or challenges to consider?",
      "Do you need this task completed urgently?",
    ],
    "Home Services or Repairs": [
      "What specific issue or problem are you facing?",
      "Have any attempts been made to fix this issue before? If so, what were the results?",
      "Do you have any relevant equipment or materials available on-site?",
      "Are there any safety concerns we should be aware of?",
      "Do you need ongoing maintenance or one-time service?",
    ],
    "Location-Based Tasks": [
      "What is the location where this task needs to be completed?",
      "Are there any access restrictions or special permissions required for this location?",
      "Is transportation or travel assistance needed to reach the location?",
    ],
    "Medical Assistance": [
      "What type of medical assistance is required?",
      "Are there any known medical conditions or allergies to consider?",
      "Is this an ongoing issue or a new concern?",
      "Are there specific instructions from a medical professional that need to be followed?",
      "Do you have any emergency contacts or additional support available?",
    ],
    "Outdoor Help": [
      "What outdoor task needs assistance?",
      "Are there any weather considerations or restrictions for the task?",
      "Do you have the tools or equipment needed for the job?",
      "Are there any environmental factors to consider (e.g., uneven terrain, wildlife)?",
      "Is this a one-time job or part of a regular schedule?",
    ],
    "Painting or Artistic Work": [
      "What specific area or item needs painting?",
      "What colors, patterns, or themes are preferred?",
      "Are there any surfaces or materials that need prep work before painting?",
      "Do you have the necessary supplies, or should they be provided?",
      "Is this a one-time project or part of an ongoing effort?",
    ],
    "Pet Care": [
      "What type of pet needs care?",
      "What services are required (e.g., walking, feeding, grooming)?",
      "Are there any medical conditions or dietary restrictions?",
      "Do you have necessary supplies or equipment for the task?",
      "What is the expected duration of care?",
    ],
    "Photography or Videography": [
      "What is the occasion or purpose for the photography/videography?",
      "How many hours of coverage are needed?",
      "Are there specific locations or settings involved?",
      "Do you need post-production editing services?",
      "What style or theme are you looking for?",
    ],
    "Software Design & Development": [
      "What specific software or application are you working on?",
      "Do you need help with the design, coding, or both?",
      "Which programming languages or frameworks are involved?",
      "Is there a specific project management tool or methodology you prefer?",
      "Are you looking for help with UI/UX design?",
      "Do you need assistance with version control (e.g., Git)?",
      "Is there an existing codebase, or are you starting from scratch?",
      "What is the project timeline and milestones?",
      "Do you require a contract or agreement for the work?",
      "Is this a one-time project or ongoing work?",
      "Do you need help with testing, debugging, or deployment?",
      "What tools or platforms are you using (e.g., VS Code, GitHub, AWS)?",
    ],
    "Tech Support": [
      "What specific issue are you experiencing?",
      "What device or system is affected?",
      "Have you tried any troubleshooting steps? If so, what were the results?",
      "Do you have any warranty or service agreements for the device?",
      "Is this an urgent issue?",
    ],
    "Tutorials or Assistance": [
      "What specific topic or skill do you need help with?",
      "What is your current level of understanding or expertise in this area?",
      "Are there specific tools or software involved in this task?",
      "What is your preferred mode of learning (e.g., hands-on, visual, verbal)?",
      "Do you have any specific goals you want to achieve from this session?",
      "How long do you plan to dedicate to this learning session?",
    ],
    "Others": [
      "Is there a specific task you need help with that doesn't fall under the other categories?",
      "Do you have any unique requirements for this task?",
      "Are there any additional details or preferences that should be considered?",
      "What is the timeframe for this task?",
      "Are you looking for short-term or long-term assistance?",
    ],
  };
  

  const categoryMapping = {
    tasks: {
      'catering-and-restaurants': "Catering/Restaurants",
      'handyman': "Home Services or Repairs",
      'cleaning': "Cleaning Tasks",
      'delivery': "Delivery Tasks",
      'medical-assistance': "Medical Assistance",
      'tutorials-or-assistance': "Tutorials or Assistance",
      // Add mappings for other categories...
    },
  };

  const commonQuestions = [
    "What is the primary objective of this task?",
    "Are there any specific deadlines or timeframes for completion?",
    "Do you have any preferences or specific requirements for how this task should be handled?",
    "What is the estimated budget (if applicable)?",
    "What outcome or results are you expecting from this task?",
  ];

  const [category, setCategory] = useState('');
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [pickUp, setPickUp] = useState('n/a');
  const [deliverTo, setDeliverTo] = useState('n/a');
  const toast = useToast();
  const navigate = useNavigate();

  // Set category based on URL parameter
  useEffect(() => {
    const categoryFromUrl = categoryMapping.tasks[urlCategory];
    if (categoryFromUrl) {
      setCategory(categoryFromUrl);
      setQuestions([...commonQuestions, ...(categories[categoryFromUrl] || [])]);
    }
  }, [urlCategory]);

  const handleCategoryChange = (selectedCategory) => {
    setCategory(selectedCategory);
    setQuestions([...commonQuestions, ...(categories[selectedCategory] || [])]);
    setAnswers({});

    // Adjust pickUp and deliverTo based on task type
    if (["Outdoor Help", "Medical Assistance", "Painting or Artistic Work", "Tutorials or Assistance", "Catering/Restaurants", "Cleaning Tasks", "Delivery Tasks", "Home Services or Repairs", "Errand Help", "Handyman Tasks", "Child or Elderly Care", "Pet Care", "Event Planning", "Fitness or Personal Training", "Tech Support", "Photography or Videography", "Software Design & Development", "Others"].includes(selectedCategory)) {
      setPickUp('');
      setDeliverTo('');
    } else {
      setPickUp('n/a');
      setDeliverTo('n/a');
    }
  };

  const handleAnswerChange = (question, answer) => {
    setAnswers((prev) => ({ ...prev, [question]: answer }));
  };

  const handleSubmit = () => {
    const description = Object.entries(answers)
      .map(([question, answer]) => `${question}: ${answer}`)
      .join('\n');

    if (!category || !description || (!pickUp && !deliverTo)) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const taskData = {
      name: category, // Title of the task
      type: "Solo",
      pick_up: pickUp,
      deliver_to: deliverTo,
      description,
    };

    toast({
      title: "Submission Successful",
      description: "Your errand request has been recorded.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });

    console.log({
      state: taskData,
    });

    navigate("/runam/errands/continue", {
      state: taskData,
    });
  };

  return (
    <VStack spacing={6} p={8} bg="gray.50" minH="100vh" align="stretch">
      <Heading size="lg" textAlign="center" color="teal.500">
        Create a New Errand
      </Heading>

      <Select
        placeholder="Select Category"
        value={category}
        onChange={(e) => handleCategoryChange(e.target.value)}
        bg="white"
        borderColor="gray.300"
        _hover={{ borderColor: "teal.400" }}
        _focus={{ borderColor: "teal.500", boxShadow: "outline" }}
      >
        {Object.keys(categories).map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </Select>

      {(pickUp !== 'n/a' || deliverTo !== 'n/a') && (
        <>
          <Input
            placeholder="Pick-Up Location"
            value={pickUp}
            onChange={(e) => setPickUp(e.target.value)}
            bg="white"
            borderColor="gray.300"
            _hover={{ borderColor: "teal.400" }}
            _focus={{ borderColor: "teal.500", boxShadow: "outline" }}
          />
          <Input
            placeholder="Delivery Location"
            value={deliverTo}
            onChange={(e) => setDeliverTo(e.target.value)}
            bg="white"
            borderColor="gray.300"
            _hover={{ borderColor: "teal.400" }}
            _focus={{ borderColor: "teal.500", boxShadow: "outline" }}
          />
        </>
      )}

      {questions.map((question) => (
        <Box key={question}>
          <Box as="p" textAlign="left" color="gray.600" mb={2}>
            {question}
          </Box>
          <Textarea
            placeholder="Type your answer here..."
            value={answers[question] || ''}
            onChange={(e) => handleAnswerChange(question, e.target.value)}
            bg="white"
            borderColor="gray.300"
            _hover={{ borderColor: "teal.400" }}
            _focus={{ borderColor: "teal.500", boxShadow: "outline" }}
          />
        </Box>
      ))}

      <Button
        colorScheme="teal"
        onClick={handleSubmit}
        _hover={{ bg: "teal.600" }}
      >
        Submit
      </Button>
    </VStack>
  );
};

export default CreateErrand;
