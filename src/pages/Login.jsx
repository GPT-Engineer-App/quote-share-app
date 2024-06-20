import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSupabaseAuth, SupabaseAuthUI } from '../integrations/supabase/auth.jsx';
import { Container, VStack, Input, Button, Text, Heading } from '@chakra-ui/react';

const Login = () => {
  const { session } = useSupabaseAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      navigate('/');
    } catch (error) {
      setError(error.message);
    }
  };

  if (session) {
    navigate('/');
    return null;
  }

  return (
    <Container centerContent>
      <VStack spacing={4} width="100%">
        <Heading as="h1" size="xl">Login</Heading>
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
        <Button onClick={handleLogin} colorScheme="teal">Login</Button>
        <Text>Don't have an account? <Button variant="link" onClick={() => navigate('/signup')}>Sign Up</Button></Text>
      </VStack>
    </Container>
  );
};

export default Login;