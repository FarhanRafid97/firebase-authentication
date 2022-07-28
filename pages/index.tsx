import { Box, Button, Link, Text } from '@chakra-ui/react';
import type { NextPage } from 'next';
import NextLink from 'next/link';
import { useState } from 'react';
import { useAuth } from '../context/authContext';
import { auth } from '../firebase';

const Home: NextPage = () => {
  const { state, dispatch } = useAuth();
  const [loading, setLoading] = useState(false);
  const signOut = async () => {
    setLoading(true);
    await auth.signOut();
    setLoading(false);
  };
  console.log('state', state);
  console.log(state.loading);
  return (
    <Box>
      <Text>{state.email}</Text>
      <NextLink href="/login">
        <Link>Login</Link>
      </NextLink>

      <Button onClick={signOut} isLoading={loading}>
        Logout
      </Button>
    </Box>
  );
};

export default Home;
