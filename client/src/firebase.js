// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "real-estate-738fa.firebaseapp.com",
  projectId: "real-estate-738fa",
  storageBucket: "real-estate-738fa.appspot.com",
  messagingSenderId: "129869782422",
  appId: "1:129869782422:web:7507cd8c79dff1df95d1b7"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);