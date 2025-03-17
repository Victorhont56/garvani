import { getServerSession } from "next-auth/next";
import { db } from "@/app/libs/firebase";
import { doc, getDoc } from "firebase/firestore";
import { SafeUser } from "@/app/types";
import { authOptions } from "@/app/libs/auth"; // ✅ Import authOptions

export default async function getCurrentUser(): Promise<SafeUser | null> {
  const session = await getServerSession(authOptions);
  console.log("Session:", session);
  
  
  try {
    const session = await getServerSession(authOptions); // ✅ Use getServerSession()
    

    if (!session?.user?.email) {
      console.log("Session not found or no email available");
      return null;
    }

    // Get the user document from Firestore
    const userDocRef = doc(db, "users", session.user.email);
    const userDoc = await getDoc(userDocRef);

    if (!userDoc.exists()) {
      console.log("User document not found");
      return null;
    }

    const currentUser = userDoc.data();

    return {
      id: session.user.email,
      name: currentUser.name || null,
      email: session.user.email,
      image: currentUser.image || null,
      createdAt: currentUser.createdAt?.toDate().toISOString() || null,
      updatedAt: currentUser.updatedAt?.toDate().toISOString() || null,
      emailVerified: currentUser.emailVerified ? currentUser.emailVerified.toDate().toISOString() : null,
      favoriteIds: currentUser.favoriteIds || [],
      hashedPassword: currentUser.hashedPassword || null,
    };
  } catch (error: any) {
    console.error("Error fetching current user:", error.message);
    return null;
  }
}
