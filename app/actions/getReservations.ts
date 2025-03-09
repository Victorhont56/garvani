import { db } from "@/app/libs/firebase";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";

interface IParams {
  listingId?: string;
  userId?: string;
  authorId?: string;
}

export default async function getReservations(params: IParams) {
  try {
    const { listingId, userId, authorId } = params;

    let reservationsRef = collection(db, "reservations");

    let conditions = [];

    if (listingId) {
      conditions.push(where("listingId", "==", listingId));
    }

    if (userId) {
      conditions.push(where("userId", "==", userId));
    }

    const q = query(reservationsRef, ...conditions, orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);

    let reservations = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        listingId: data.listingId || null, // Ensure listingId is included
        createdAt: data.createdAt?.toDate().toISOString() || null,
        startDate: data.startDate?.toDate().toISOString() || null,
        endDate: data.endDate?.toDate().toISOString() || null,
      };
    });

    // Handle authorId by filtering in code, since Firestore doesn't support relational joins
    if (authorId) {
      const listingsRef = collection(db, "listings");
      const listingsQuery = query(listingsRef, where("userId", "==", authorId));
      const listingsSnapshot = await getDocs(listingsQuery);

      const authorListingsIds = listingsSnapshot.docs.map((doc) => doc.id);
      
      // ✅ Now that listingId is included, filtering will work
      reservations = reservations.filter((reservation) => 
        reservation.listingId && authorListingsIds.includes(reservation.listingId)
      );
    }

    return reservations;
  } catch (error: any) {
    console.error("Error fetching reservations:", error);
    throw new Error("Failed to fetch reservations.");
  }
}
