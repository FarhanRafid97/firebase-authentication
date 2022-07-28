import {
  Button,
  Flex,
  Heading,
  Input,
  useToast,
  VStack,
  Link,
} from '@chakra-ui/react';
import { FirebaseError } from '@firebase/util';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/router';
import { FormEvent, useState } from 'react';
import { auth } from '../firebase';
import NextLink from 'next/link';
interface RegisterProps {}

const Register: React.FC<RegisterProps> = ({}) => {
  const toast = useToast();

  const router = useRouter();
  const [formUser, setFormUser] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (loading) return;

    setLoading(true);

    try {
      await createUserWithEmailAndPassword(
        auth,
        formUser.email,
        formUser.password
      );
      setLoading(false);
      router.push('/');
    } catch (error) {
      if (error instanceof FirebaseError) {
        setLoading(false);
        toast({
          title: 'Failed Register',
          description: error.message,
          position: 'top',
          status: 'error',
          duration: 7000,
          isClosable: true,
        });
      }
    }
  };

  return (
    <Flex h="100vh" mt={8} w="100%" p={4} bg="gray.50" margin="auto" pt={4}>
      <VStack w="40%" m="auto" boxShadow="lg" py={12}>
        <Heading mb={4}>Register</Heading>
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
              Register
            </Button>
          </VStack>
        </form>
        <NextLink href="/login">
          <Link> Login</Link>
        </NextLink>
      </VStack>
    </Flex>
  );
};

export default Register;
function getPhoneNumberFromUserInput() {
  throw new Error('Function not implemented.');
}
