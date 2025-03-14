import { db } from "@/app/libs/firebase";
import { doc, getDoc } from "firebase/firestore";
import { SafeListing } from "@/app/types";

interface IParams {
  listingId?: string;
}

export default async function getListingById(params: IParams): Promise<SafeListing | null> {
  try {
    const { listingId } = params;
    if (!listingId) return null;

    const listingRef = doc(db, "listings", listingId);
    const listingSnap = await getDoc(listingRef);

    if (!listingSnap.exists()) return null;

    const data = listingSnap.data();

    // Ensure all SafeListing properties are present
    const listing: SafeListing = {
      id: listingId,
      mode: data?.mode || "",
      type:  data?.type || "",
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

    return listing;
  } catch (error) {
    console.error("Error fetching listing by ID:", error);
    throw new Error("Failed to fetch listing.");
  }
}
