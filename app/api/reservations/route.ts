import { NextResponse } from "next/server";
import { db } from "@/app/libs/firebase";
import { doc, getDoc, updateDoc, addDoc, collection, arrayUnion } from "firebase/firestore";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  try {
    const body = await request.json();
    const { listingId, startDate, endDate, totalPrice } = body;

    if (!listingId || !startDate || !endDate || !totalPrice) {
      return NextResponse.error();
    }

    // Get listing document reference
    const listingRef = doc(db, "listings", listingId);
    const listingSnap = await getDoc(listingRef);

    if (!listingSnap.exists()) {
      return NextResponse.json({ error: "Listing not found" }, { status: 404 });
    }

    // Create new reservation
    const reservationsRef = collection(db, "reservations");
    const reservationData = {
      userId: currentUser.id,
      listingId,
      startDate,
      endDate,
      totalPrice,
      createdAt: new Date(),
    };

    const reservationDoc = await addDoc(reservationsRef, reservationData);

    // Update the listing to include the reservation ID
    await updateDoc(listingRef, {
      reservationIds: arrayUnion(reservationDoc.id),
    });

    return NextResponse.json({ id: reservationDoc.id, ...reservationData });
  } catch (error: any) {
    console.error("Error creating reservation:", error);
    return NextResponse.json({ error: "Failed to create reservation" }, { status: 500 });
  }
}
