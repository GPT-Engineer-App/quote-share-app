import { useState } from "react";
import { Container, VStack, Input, Button, Text, Box, Heading } from "@chakra-ui/react";

const Index = () => {
  const [quotes, setQuotes] = useState([]);
  const [newQuote, setNewQuote] = useState("");

  const handleAddQuote = () => {
    if (newQuote.trim() !== "") {
      setQuotes([...quotes, newQuote]);
      setNewQuote("");
    }
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
        <Button onClick={handleAddQuote} colorScheme="teal">Add Quote</Button>
        <VStack spacing={2} width="100%">
          {quotes.map((quote, index) => (
            <Box key={index} p={4} borderWidth="1px" borderRadius="md" width="100%">
              <Text>{quote}</Text>
            </Box>
          ))}
        </VStack>
      </VStack>
    </Container>
  );
};

export default Index;