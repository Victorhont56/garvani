import { db } from "./firebase";
import { doc, setDoc } from "firebase/firestore";

interface UserData {
  id: string;
  name: string;
  email: string;
}

export const addUserToDatabase = async (userData: UserData) => {
  try {
    console.log("📢 Attempting to add user to Firestore:", userData);
    await setDoc(doc(db, "users", userData.id), userData);
    console.log("✅ User added successfully to Firestore!");
  } catch (error) {
    console.error("🔥 Error adding user to Firestore:", error);
  }
};
