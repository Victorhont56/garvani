import { db } from "@/app/libs/firebase";
import { doc, getDoc } from "firebase/firestore";

interface IParams {
  listingId?: string;
}

export default async function getListingById(params: IParams) {
  try {
    const { listingId } = params;
    if (!listingId) return null;

    // Reference to listing document
    const listingRef = doc(db, "listings", listingId);
    const listingSnap = await getDoc(listingRef);

    if (!listingSnap.exists()) {
      return null;
    }

    const listing = listingSnap.data();

    // Reference to user document if user details are needed
    let user = null;
    if (listing.userId) {
      const userRef = doc(db, "users", listing.userId);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        const userData = userSnap.data();
        user = {
          ...userData,
          createdAt: userData.createdAt?.toDate().toISOString() || null,
          updatedAt: userData.updatedAt?.toDate().toISOString() || null,
          emailVerified: userData.emailVerified?.toDate().toISOString() || null,
        };
      }
    }

    return {
      ...listing,
      id: listingId,
      createdAt: listing.createdAt?.toDate().toISOString() || null,
      user, // Include user details if available
    };
  } catch (error: any) {
    console.error("Error fetching listing by ID:", error);
    throw new Error("Failed to fetch listing.");
  }
}
