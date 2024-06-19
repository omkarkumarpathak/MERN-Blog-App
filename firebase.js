// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBJ9CLZRBgxcchrVmvk5cPwSZC-iSIrBYk",
  authDomain: "mern-blog-app-caea8.firebaseapp.com",
  projectId: "mern-blog-app-caea8",
  storageBucket: "mern-blog-app-caea8.appspot.com",
  messagingSenderId: "432319333528",
  appId: "1:432319333528:web:e6dbcb0ff0e0ad3e3f7ced",
  measurementId: "G-RE8P1XQ2EG"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);