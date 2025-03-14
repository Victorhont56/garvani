import { NextResponse } from "next/server";
import { db } from "@/app/libs/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();
  const {
    mode,
    type,
    title,
    description,
    imageSrc,
    category,
    livingroomCount,
    bedroomCount,
    bathroomCount,
    guestCount,
    location,
    price,
  } = body;

  // Validate required fields
  for (const key of Object.keys(body)) {
    if (!body[key]) {
      return NextResponse.error();
    }
  }

  // Create new listing in Firestore
  const listingRef = await addDoc(collection(db, "listings"), {
    mode,
    type,
    title,
    description,
    imageSrc,
    category,
    livingroomCount,
    bedroomCount,
    bathroomCount,
    guestCount,
    locationValue: location?.value || "",
    price: parseInt(price, 10),
    userId: currentUser.email, // Use email as user ID reference in Firestore
    createdAt: serverTimestamp(), // Store created timestamp
  });

  return NextResponse.json({ id: listingRef.id, message: "Listing created successfully" });
}
