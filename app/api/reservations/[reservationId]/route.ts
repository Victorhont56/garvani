import { NextResponse } from "next/server";
import { doc, getDoc, deleteDoc, collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/app/libs/firebase";
import getCurrentUser from "@/app/actions/getCurrentUser";

interface IParams {
  reservationId?: string;
}

export async function DELETE(request: Request, { params }: { params: IParams }) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { reservationId } = params;

  if (!reservationId || typeof reservationId !== "string") {
    throw new Error("Invalid ID");
  }

  try {
    // Get the reservation document
    const reservationRef = doc(db, "reservations", reservationId);
    const reservationSnap = await getDoc(reservationRef);

    if (!reservationSnap.exists()) {
      return NextResponse.json({ error: "Reservation not found" }, { status: 404 });
    }

    const reservationData = reservationSnap.data();

    // Check if the user is the reservation owner
    if (reservationData.userId === currentUser.id) {
      await deleteDoc(reservationRef);
      return NextResponse.json({ message: "Reservation deleted successfully" });
    }

    // If not the owner, check if they are the listing owner
    const listingsRef = collection(db, "listings");
    const q = query(listingsRef, where("id", "==", reservationData.listingId), where("userId", "==", currentUser.id));
    const listingSnap = await getDocs(q);

    if (!listingSnap.empty) {
      await deleteDoc(reservationRef);
      return NextResponse.json({ message: "Reservation deleted by listing owner" });
    }

    // If not authorized
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  } catch (error: any) {
    console.error("Error deleting reservation:", error);
    return NextResponse.json({ error: "Failed to delete reservation" }, { status: 500 });
  }
}
