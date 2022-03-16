import { getApps, initializeApp } from 'firebase/app';

export type FirebaseConfig = {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
};

export const initializeFirebase = (config: FirebaseConfig) => {
  getApps().length === 0 ? initializeApp(config) : null;
};
