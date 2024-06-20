import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../integrations/supabase/index.js';
import { Container, VStack, Input, Button, Text, Heading } from '@chakra-ui/react';

const Signup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSignup = async () => {
    try {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) throw error;
      navigate('/login');
    } catch (error) {
      setError(error.message);
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
        <Button onClick={handleSignup} colorScheme="teal">Sign Up</Button>
        <Text>Already have an account? <Button variant="link" onClick={() => navigate('/login')}>Login</Button></Text>
      </VStack>
    </Container>
  );
};

export default Signup;