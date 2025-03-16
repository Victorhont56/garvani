import { db } from "@/app/libs/firebase";
import { doc, getDoc } from "firebase/firestore";
import { SafeListing, SafeUser } from "@/app/types";

interface IParams {
  listingId?: string;
}

export default async function getListingById(
  params: IParams
): Promise<(SafeListing & { user: SafeUser }) | null> {
  try {
    const { listingId } = params;
    if (!listingId) return null;

    const listingRef = doc(db, "listings", listingId);
    const listingSnap = await getDoc(listingRef);

    if (!listingSnap.exists()) return null;

    const data = listingSnap.data();

    if (!data?.userId) return null;

    // ✅ Fetch user data
    const userRef = doc(db, "users", data.userId);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) return null;

    const userData = userSnap.data();
    console.log("Listing ID:", params.listingId);

    const user: SafeUser = {
      id: userSnap.id,
      name: userData?.name || "",
      email: userData?.email || "",
      image: userData?.image || "",
      createdAt: userData?.createdAt?.toDate().toISOString() || "",
      emailVerified: userData?.emailVerified || false, // ✅ Default to false
      favoriteIds: userData?.favoriteIds || [], // ✅ Default to empty array
      updatedAt: userData?.updatedAt?.toDate().toISOString() || "", // ✅ Default to empty string
    };
    

    // ✅ Ensure all SafeListing properties are present
    const listing: SafeListing = {
      id: listingId,
      mode: data?.mode || "",
      type: data?.type || "",
      title: data?.title || "",
      description: data?.description || "",
      imageSrc: data?.imageSrc || "",
      createdAt: data?.createdAt?.toDate().toISOString() || "",
      category: data?.category || "",
      livingroomCount: data?.livingroomCount || 0,
      bedroomCount: data?.bedroomCount || 0,
      bathroomCount: data?.bathroomCount || 0,
      guestCount: data?.guestCount || 0,
      locationValue: data?.locationValue || "",
      userId: data?.userId || "",
      price: data?.price || 0,
    };

    // ✅ Return listing with user attached
    return { ...listing, user };
  } catch (error) {
    console.error("Error fetching listing by ID:", error);
    throw new Error("Failed to fetch listing.");
  }
}
