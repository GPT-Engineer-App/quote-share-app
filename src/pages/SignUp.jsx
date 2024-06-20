import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../integrations/supabase/index.js';
import { Container, VStack, Input, Button, Text, Heading } from "@chakra-ui/react";

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = async () => {
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signUp({ email, password });

    setLoading(false);

    if (error) {
      setError(error.message);
    } else {
      navigate('/login');
    }
  };

  return (
    <Container centerContent>
      <VStack spacing={4} width="100%">
        <Heading as="h1" size="xl">Sign Up</Heading>
        <Input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <Text color="red.500">{error}</Text>}
        <Button onClick={handleSignUp} colorScheme="teal" isLoading={loading}>Sign Up</Button>
      </VStack>
    </Container>
  );
};

export default SignUp;