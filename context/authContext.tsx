import { onAuthStateChanged } from '@firebase/auth';
import * as React from 'react';
import { auth } from '../firebase';

type Action = { type: 'login'; payload: { email: string; loading: boolean } };

type Dispatch = (action: Action) => void;
type State = { email: string; loading: boolean };
type AuthProviderProps = { children: React.ReactNode };

const AuthStateComponent = React.createContext<
  { state: State; dispatch: Dispatch } | undefined
>(undefined);

function authReducer(state: State, action: Action) {
  switch (action.type) {
    case 'login': {
      return {
        email: action.payload.email,
        loading: action.payload.loading,
      };
    }
    default: {
      return { email: '', loading: false };
    }
  }
}

function AuthProvider({ children }: AuthProviderProps) {
  const [state, dispatch] = React.useReducer(authReducer, {
    email: '',
    loading: true,
  });

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        if (user.email) {
          dispatch({
            type: 'login',
            payload: { email: user.email, loading: false },
          });
        }
      } else {
        dispatch({ type: 'login', payload: { email: '', loading: true } });
      }
      return () => unsubscribe();
    });
  }, []);
  // NOTE: you *might* need to memoize this value
  // Learn more in http://kcd.im/optimize-context
  const value = { state, dispatch };
  return (
    <AuthStateComponent.Provider value={value}>
      {children}
    </AuthStateComponent.Provider>
  );
}

function useAuth() {
  const context = React.useContext(AuthStateComponent);
  if (context === undefined) {
    throw new Error('useAuth must be used within a AuthProvider');
  }
  return context;
}

export { AuthProvider, useAuth };
