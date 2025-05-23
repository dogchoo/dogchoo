import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_URL_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_URL_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_URL_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_URL_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_URL_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_URL_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_URL_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_URL_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { app, db };
