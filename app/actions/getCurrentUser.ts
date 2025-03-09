import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { db } from "@/app/libs/firebase";
import { doc, getDoc } from "firebase/firestore";
import { SafeUser } from "@/app/types"; // Ensure SafeUser is correctly imported

export async function getSession() {
  return await getServerSession(authOptions);
}

export default async function getCurrentUser(): Promise<SafeUser | null> {
  try {
    const session = await getSession();

    if (!session?.user?.email) {
      return null;
    }

    // Get the user document from Firestore
    const userDocRef = doc(db, "users", session.user.email);
    const userDoc = await getDoc(userDocRef);

    if (!userDoc.exists()) {
      return null;
    }

    const currentUser = userDoc.data();

    return {
      id: session.user.email, // Use email as a unique identifier
      name: currentUser.name || null,
      email: session.user.email,
      image: currentUser.image || null,
      createdAt: currentUser.createdAt?.toDate().toISOString() || null,
      updatedAt: currentUser.updatedAt?.toDate().toISOString() || null,
      emailVerified: currentUser.emailVerified ? currentUser.emailVerified.toDate().toISOString() : null, // Ensure type consistency
      favoriteIds: currentUser.favoriteIds || [], // Ensure this exists
      hashedPassword: currentUser.hashedPassword || null, // Include hashedPassword if required
    };
  } catch (error: any) {
    console.error("Error fetching current user:", error);
    return null;
  }
}
