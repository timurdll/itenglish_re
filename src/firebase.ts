import { initializeApp } from "firebase/app";
import { GoogleAuthProvider } from "firebase/auth/cordova";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB3iYngffmMXah6ioDGxgxVMbiL1VOoFpQ",
  authDomain: "itenglish-82656.firebaseapp.com",
  projectId: "itenglish-82656",
  storageBucket: "itenglish-82656.appspot.com",
  messagingSenderId: "434582172295",
  appId: "1:434582172295:web:871663e7a0d47dd0bf3e22",
  measurementId: "G-JFYNNS6KFE",
};

export const firebase = initializeApp(firebaseConfig);
export const db = getFirestore(firebase);
export const storage = getStorage(firebase);
export const googleProvider = new GoogleAuthProvider();
