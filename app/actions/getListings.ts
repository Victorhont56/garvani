import { db } from "@/app/libs/firebase";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";

export interface IListingsParams {
  userId?: string;
  guestCount?: number;
  roomCount?: number;
  bathroomCount?: number;
  startDate?: string;
  endDate?: string;
  locationValue?: string;
  category?: string;
}

export default async function getListings(params: IListingsParams) {
  try {
    const {
      userId,
      roomCount,
      guestCount,
      bathroomCount,
      locationValue,
      startDate,
      endDate,
      category,
    } = params;

    let listingsRef = collection(db, "listings");

    let conditions = [];

    if (userId) {
      conditions.push(where("userId", "==", userId));
    }

    if (category) {
      conditions.push(where("category", "==", category));
    }

    if (roomCount) {
      conditions.push(where("roomCount", ">=", roomCount));
    }

    if (guestCount) {
      conditions.push(where("guestCount", ">=", guestCount));
    }

    if (bathroomCount) {
      conditions.push(where("bathroomCount", ">=", bathroomCount));
    }

    if (locationValue) {
      conditions.push(where("locationValue", "==", locationValue));
    }

    // Firestore doesn't support `NOT` queries directly, so we have to filter unavailable listings in code
    let availableListings: any[] = [];

    if (startDate && endDate) {
      const allListingsSnapshot = await getDocs(listingsRef);
      allListingsSnapshot.forEach((doc) => {
        const listing = doc.data();
        const reservations = listing.reservations || [];

        const isAvailable = !reservations.some((reservation: any) => {
          return (
            (new Date(reservation.endDate) >= new Date(startDate) &&
              new Date(reservation.startDate) <= new Date(startDate)) ||
            (new Date(reservation.startDate) <= new Date(endDate) &&
              new Date(reservation.endDate) >= new Date(endDate))
          );
        });

        if (isAvailable) {
          availableListings.push({
            id: doc.id,
            ...listing,
            createdAt: listing.createdAt?.toDate().toISOString() || null,
          });
        }
      });

      return availableListings;
    }

    // Create query with conditions and sorting
    let q = query(listingsRef, ...conditions, orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);

    // Map Firestore documents into usable JSON format
    const listings = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate().toISOString() || null,
    }));

    return listings;
  } catch (error: any) {
    console.error("Error fetching listings:", error);
    throw new Error("Failed to fetch listings.");
  }
}
