import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSupabaseAuth, SupabaseAuthUI } from "../integrations/supabase/auth.jsx";
import { Container, VStack, Input, Button, Text, Box, Heading } from "@chakra-ui/react";

const Login = () => {
  const { session } = useSupabaseAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      alert(error.message);
    } else {
      navigate("/");
    }
  };

  if (session) {
    navigate("/");
    return null;
  }

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
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
        <Button onClick={handleLogin} colorScheme="teal">Login</Button>
        <Text>
          Don't have an account? <a href="/signup">Sign Up</a>
        </Text>
      </VStack>
    </Container>
  );
};

export default Login;