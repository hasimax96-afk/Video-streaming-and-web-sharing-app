import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup 
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyDxrjBo_Wfw3h_sPiUxt-yQlNFmgtkRgeQ",
  authDomain: "student-project-12409.firebaseapp.com",
  projectId: "student-project-12409",
  storageBucket: "student-project-12409.firebasestorage.app",
  messagingSenderId: "646201202891",
  appId: "1:646201202891:web:1da6b678ce33a35787a34e",
  measurementId: "G-JWGG4NB1J4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Auth
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Firestore & Storage
export const db = getFirestore(app);
export const storage = getStorage(app);

// Google Login Function
export const handleGoogleLogin = async () => {
  try {
    await signInWithPopup(auth, googleProvider);
    console.log("Login Success");
  } catch (error) {
    console.error("Login Error:", error);
  }
};