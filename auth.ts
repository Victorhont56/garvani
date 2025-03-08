// auth.ts
import { auth } from "./firebase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, UserCredential } from "firebase/auth";
import { User } from "./types";

// Sign up
export const signUp = async (email: string, password: string): Promise<User | null> => {
  try {
    const userCredential: UserCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user: User = {
      uid: userCredential.user.uid,
      email: userCredential.user.email!,
    };
    return user;
  } catch (error) {
    console.error("Error signing up:", error);
    return null;
  }
};

// Sign in
export const signIn = async (email: string, password: string): Promise<User | null> => {
  try {
    const userCredential: UserCredential = await signInWithEmailAndPassword(auth, email, password);
    const user: User = {
      uid: userCredential.user.uid,
      email: userCredential.user.email!,
    };
    return user;
  } catch (error) {
    console.error("Error signing in:", error);
    return null;
  }
};