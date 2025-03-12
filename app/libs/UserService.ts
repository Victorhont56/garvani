// userService.ts
import { db } from "./firebase";
import { collection, addDoc } from "firebase/firestore";

interface UserData {
  id: string;
  name: string;
  email: string;
}

export const addUserToDatabase = async (userData: UserData) => {
  try {
    await addDoc(collection(db, "users"), userData);
    console.log("User added successfully!");
  } catch (error) {
    console.error("Error adding user:", error);
  }
};
