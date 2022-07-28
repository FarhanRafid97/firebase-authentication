import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAuth } from '../context/authContext';

export const useIsLogged = () => {
  const { state, dispatch } = useAuth();
  const router = useRouter();
  const { email, loading } = state;
  useEffect(() => {
    if (!state?.loading && !state?.email) {
      router.replace('/login?next=' + router.pathname);
    }
  }, [state, router]);
};
