// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "NEXT_PUBLIC_FIREBASE_API_KEY",
  authDomain: "ai-course-generator-6cbf7.firebaseapp.com",
  projectId: "ai-course-generator-6cbf7",
  storageBucket: "ai-course-generator-6cbf7.firebasestorage.app",
  messagingSenderId: "823352337994",
  appId: "1:823352337994:web:f114d2f6b7c1e0f60c28b3",
  measurementId: "G-QNC203Y7TE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);