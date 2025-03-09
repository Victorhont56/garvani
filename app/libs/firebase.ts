// firebase.ts
import { initializeApp } from "firebase/app";
import { getFirestore, Firestore } from "firebase/firestore";
import { getAuth, Auth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDk14EOfH2W0zJsBKdneq0by9fITRCkDpU",
  authDomain: "garvani-65b45.firebaseapp.com",
  projectId: "garvani-65b45",
  storageBucket: "garvani-65b45.firebasestorage.app",
  messagingSenderId: "544376458804",
  appId: "1:544376458804:web:0fcb026dc2352fe1f54461",
  measurementId: "G-XHJBGMHNYY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db: Firestore = getFirestore(app);

// Initialize Authentication
const auth: Auth = getAuth(app);

export { db, auth };