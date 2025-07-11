import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APP_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_APP_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_APP_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_APP_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_APP_MESSAGE_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_APP_ID
};

export const firebaseApp = initializeApp(firebaseConfig);