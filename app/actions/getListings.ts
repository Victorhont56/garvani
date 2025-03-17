import { db } from "@/app/libs/firebase";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";

export interface IListingsParams {
  userId?: string;
  mode: string;
  type: string;
  guestCount?: number;
  livingroomCount: number;
  bedroomCount?: number;
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
      mode,
      type,
      livingroomCount,
      bedroomCount,
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

    if (mode) {
      conditions.push(where("mode", "==", mode));
    }

    if (type) {
      conditions.push(where("type", "==", type));
    }

    if (livingroomCount) {
      conditions.push(where("livingroomCount", "==", livingroomCount));
    }

    if (category) {
      conditions.push(where("category", "==", category));
    }

    if (bedroomCount) {
      conditions.push(where("roomCount", ">=", bedroomCount));
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

    let q = query(listingsRef, ...conditions, orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);

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