// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCPR8TaQOr0-sclHYC798oPGbhbmMsnP0I",
  authDomain: "getknowledge-e954a.firebaseapp.com",
  projectId: "getknowledge-e954a",
  storageBucket: "getknowledge-e954a.firebasestorage.app",
  messagingSenderId: "878042697160",
  appId: "1:878042697160:web:40a7e8d65ef47df5ad04fd",
  measurementId: "G-KZQYT4Q2E2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// Conditionally initialize analytics only on client side
export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;
