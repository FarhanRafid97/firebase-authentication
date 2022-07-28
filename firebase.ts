import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import 'firebase/auth';
import { firebaseConfig } from './utils/firebaseConfig';

import firebase from 'firebase/app';
// Initialize Firebase
const app = initializeApp(firebaseConfig);
// export const Providers = {
//   google: new firebase.GoogleAuthProvider(),
//   facebook: new firebase.FacebookAuthProvider(),
// };
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
