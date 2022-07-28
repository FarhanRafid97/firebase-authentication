import { Box, Input, Button, Text, Link } from '@chakra-ui/react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from '../context/authContext';
import { useIsLogged } from '../utils/useIsLogged';
interface PrivateProps {}

const Private: React.FC<PrivateProps> = ({}) => {
  const { state, dispatch } = useAuth();
  const router = useRouter();
  useIsLogged();

  return (
    <Box>
      <Text>{state.email}</Text>
      {/* <NextLink href="/login">
        <Link>Private</Link>
      </NextLink> */}
      Private nih
    </Box>
  );
};

export default Private;
