import getCurrentUser from "./getCurrentUser";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/app/libs/firebase";
import { SafeListing } from "@/app/types"; // Ensure this import exists

export default async function getFavoriteListings(): Promise<SafeListing[]> {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser || !currentUser.favoriteIds || currentUser.favoriteIds.length === 0) {
      return [];
    }

    // Fetch each favorite listing individually
    const favoriteListings: SafeListing[] = (
      await Promise.all(
        currentUser.favoriteIds.map(async (listingId: string) => {
          const listingRef = doc(db, "listings", listingId);
          const listingSnap = await getDoc(listingRef);

          if (!listingSnap.exists()) return null; // Return null if listing doesn't exist

          const data = listingSnap.data();

          return {
            id: listingSnap.id,
            userId: data.userId || "",
            mode: data.mode || "rent",
            type: data.type  || "building",
            title: data.title || "Untitled",
            description: data.description || "No description available",
            imageSrc: data.imageSrc || "",
            category: data.category || "Uncategorized",
            livingroomCount: data.livingroomCount || 0,
            bedroomCount: data.bedroomCount || 0,
            bathroomCount: data.bathroomCount || 0,
            guestCount: data.guestCount || 0,
            locationValue: data.locationValue || "Unknown",
            price: data.price || 0,
            createdAt: data.createdAt?.toDate().toISOString() || new Date().toISOString(),
          } as SafeListing;
        })
      )
    ).filter((listing): listing is SafeListing => listing !== null); // Remove null values

    return favoriteListings;
  } catch (error: any) {
    console.error("Error fetching favorite listings:", error);
    throw new Error(error.message || "Failed to fetch favorite listings.");
  }
}
