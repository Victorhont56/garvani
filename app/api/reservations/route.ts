import { NextResponse } from "next/server"; 
import { db } from "@/app/libs/firebase";
import { doc, getDoc, updateDoc, addDoc, collection, arrayUnion, serverTimestamp } from "firebase/firestore";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.json({ error: "User not authenticated" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { listingId, startDate, endDate, totalPrice } = body;

    if (!listingId || !startDate || !endDate || !totalPrice) {
      return NextResponse.json({ error: "Invalid input data" }, { status: 400 });
    }

    const listingRef = doc(db, "listings", listingId);
    const listingSnap = await getDoc(listingRef);

    if (!listingSnap.exists()) {
      return NextResponse.json({ error: "Listing not found" }, { status: 404 });
    }

    const reservationsRef = collection(db, "reservations");
    const reservationData = {
      userId: currentUser.id,
      listingId,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      totalPrice,
      createdAt: serverTimestamp(),
      status: "pending",
    };

    const reservationDoc = await addDoc(reservationsRef, reservationData);

    await updateDoc(listingRef, {
      reservationIds: arrayUnion(reservationDoc.id),
    });

    return NextResponse.json({ id: reservationDoc.id, ...reservationData });
  } catch (error) {
    console.error("Error creating reservation:", error);
    return NextResponse.json({ error: "Failed to create reservation" }, { status: 500 });
  }
}
