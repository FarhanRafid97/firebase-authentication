import { Button, Flex, Heading, Input, Link, VStack } from '@chakra-ui/react';
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
} from '@firebase/auth';
import { useRouter } from 'next/router';
import { FormEvent, useState } from 'react';
import { useAuth } from '../context/authContext';
import { auth, googleProvider } from '../firebase';
import NextLink from 'next/link';

interface LoginProps {}

const Login: React.FC<LoginProps> = ({}) => {
  const router = useRouter();
  const { state, dispatch } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formUser, setFormUser] = useState({ email: '', password: '' });

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (loading) return;

    setLoading(true);

    try {
      const data = await signInWithEmailAndPassword(
        auth,
        formUser.email,
        formUser.password
      );

      if (data === null) {
        return;
      } else {
        setLoading(false);
        dispatch({
          type: 'login',
          payload: { email: data.user.email as string, loading: false },
        });
        router.push('/');
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
      //   if (error.name === 'FirebaseError') {
      //     if (error.code === 'auth/email-already-in-use') {
      //       alert('Email sudah digunakan, silahkan login');
      //       navigate('/login');
      //     }
      //   }
    }
  }
  console.log(state);

  const loginSocmed = async () => {
    const auths = getAuth();
    try {
      const { user } = await signInWithPopup(auths, googleProvider);
      if (user.email) {
        dispatch({
          type: 'login',
          payload: { email: user?.email, loading: false },
        });
        router.push('/');
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Flex h="100vh" mt={8} w="100%" p={4} bg="gray.50" margin="auto" pt={4}>
      <VStack w="40%" m="auto" boxShadow="lg" py={12}>
        <Heading mb={4}>Login</Heading>
        <form onSubmit={onSubmit}>
          <VStack w="400px">
            <Input
              type="text"
              colorScheme="purple"
              placeholder="email"
              value={formUser.email}
              onChange={(e) =>
                setFormUser({ ...formUser, email: e.target.value })
              }
            />
            <Input
              type="text"
              placeholder="password"
              value={formUser.password}
              onChange={(e) =>
                setFormUser({ ...formUser, password: e.target.value })
              }
            />
            <Button
              w="400px"
              colorScheme="messenger"
              isLoading={loading}
              type="submit"
            >
              Submit
            </Button>
          </VStack>
        </form>
        <Button
          w="400px"
          mt={4}
          colorScheme="messenger"
          onClick={() => loginSocmed()}
        >
          Google Login
        </Button>
        <NextLink href="/register">
          <Link> Register</Link>
        </NextLink>
      </VStack>
    </Flex>
  );
};

export default Login;
