import { useState } from "react";
import { FaPalette } from 'react-icons/fa';
import { SketchPicker } from 'react-color';
import { useQuotes, useAddQuote, useDeleteQuote } from "../integrations/supabase/index.js";
import { Container, VStack, Input, Button, Text, Box, Heading, Textarea } from "@chakra-ui/react";

const Index = () => {
  const { data: quotes, isLoading, isError } = useQuotes();
  const addQuoteMutation = useAddQuote();
  const deleteQuoteMutation = useDeleteQuote();
  const [newQuote, setNewQuote] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newBackgroundColor, setNewBackgroundColor] = useState("#ffffff");

  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);

  const handleAddQuote = () => {
    if (newQuote.trim() !== "" && newDescription.trim() !== "") {
      addQuoteMutation.mutate({ quote: newQuote, description: newDescription, background: newBackgroundColor });
      setNewQuote("");
      setNewDescription("");
      setNewBackgroundColor("#ffffff");
    }
  };

  const handleDeleteQuote = (id) => {
    deleteQuoteMutation.mutate(id);
  };

  const handleColorChange = (color) => {
    setNewBackgroundColor(color.hex);
  };

  const toggleColorPicker = () => {
    setIsColorPickerOpen(!isColorPickerOpen);
  };

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4} width="100%">
        <Heading as="h1" size="xl">Quote Sharing App</Heading>
        <Input
          placeholder="Enter your quote"
          value={newQuote}
          onChange={(e) => setNewQuote(e.target.value)}
        />
        <Textarea
          placeholder="Enter description"
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
        />
        <Button onClick={toggleColorPicker} colorScheme="teal" leftIcon={<FaPalette />} size="lg" borderRadius="full" p={4}>
          {isColorPickerOpen ? "Close Color Picker" : "Pick Background Color"}
        </Button>
        {isColorPickerOpen && (
          <SketchPicker color={newBackgroundColor} onChange={handleColorChange} />
        )}
        <Button onClick={handleAddQuote} colorScheme="teal" isLoading={addQuoteMutation.isLoading}>Add Quote</Button>
        {isLoading ? (
          <Text>Loading...</Text>
        ) : isError ? (
          <Text>Error loading quotes</Text>
        ) : (
          <VStack spacing={2} width="100%">
            {quotes.map((quote) => (
              <Box key={quote.id} p={4} borderWidth="1px" borderRadius="md" width="100%" bg={quote.background || "#ffffff"}>
                <Text fontWeight="bold">{quote.quote}</Text>
                <Text>{quote.description}</Text>
                <Button onClick={() => handleDeleteQuote(quote.id)} colorScheme="red" size="sm" mt={2}>Delete</Button>
              </Box>
            ))}
          </VStack>
        )}
      </VStack>
    </Container>
  );
};

export default Index;