import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCCrfIbGQAiIwLJBUq-PuskG34B9_4c-a4",
  authDomain: "cs50-final-6396b.firebaseapp.com",
  projectId: "cs50-final-6396b",
  storageBucket: "cs50-final-6396b.firebasestorage.app",
  messagingSenderId: "178323173245",
  appId: "1:178323173245:web:c803c60e36abfd568d6614",
  measurementId: "G-5N19HXTV9W",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const db = getFirestore(app);
