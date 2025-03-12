import { db } from "@/app/libs/firebase";
import { collection, query, where, getDocs, orderBy, doc, getDoc } from "firebase/firestore";
import { differenceInDays } from "date-fns";
import { SafeReservation, SafeListing } from "@/app/types";

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

    let reservations: SafeReservation[] = [];

    for (const docSnap of querySnapshot.docs) {
      const data = docSnap.data();

      // ✅ Fetch listing data
      const listingRef = doc(db, "listings", data.listingId);
      const listingSnap = await getDoc(listingRef);

      if (!listingSnap.exists()) continue;

      const listing = listingSnap.data() as SafeListing;

      // ✅ Calculate totalPrice based on date range
      const startDate = data.startDate?.toDate();
      const endDate = data.endDate?.toDate();
      let totalPrice = 0;

      if (startDate && endDate) {
        const dayCount = differenceInDays(endDate, startDate);
        totalPrice = dayCount * listing.price;
      }

      reservations.push({
        id: docSnap.id,
        listingId: data.listingId || null,
        userId: data.userId || null,
        startDate: startDate ? startDate.toISOString() : null,
        endDate: endDate ? endDate.toISOString() : null,
        createdAt: data.createdAt?.toDate().toISOString() || null,
        totalPrice, // ✅ Include totalPrice
        listing, // ✅ Include listing data
      });
    }

    // ✅ Filter by authorId if necessary
    if (authorId) {
      reservations = reservations.filter((reservation) =>
        reservation.listing.userId === authorId
      );
    }

    return reservations;
  } catch (error: any) {
    console.error("Error fetching reservations:", error);
    throw new Error("Failed to fetch reservations.");
  }
}
