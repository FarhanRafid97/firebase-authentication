import { useToast } from '@chakra-ui/toast';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAuth } from '../context/authContext';

export const useIsLogged = () => {
  const { state } = useAuth();
  const router = useRouter();
  const toast = useToast();
  if (!state.email === null && !state?.loading) {
    toast({
      title: 'wait',
      description: 'wait for fetch',
      position: 'top',
      status: 'loading',
      duration: 7000,
      isClosable: true,
    });
  }
  useEffect(() => {
    if (!state?.loading && !state?.email) {
      router.replace('/login?next=' + router.pathname);
    }
  }, [state, router, toast]);
};
