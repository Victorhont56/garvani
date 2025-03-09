import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { db } from "@/app/libs/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";

interface IParams {
  listingId?: string;
}

export async function POST(request: Request, { params }: { params: IParams }) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { listingId } = params;

  if (!listingId || typeof listingId !== "string") {
    throw new Error("Invalid ID");
  }

  const userRef = doc(db, "users", currentUser.email); // Firestore uses email as the doc ID
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) {
    throw new Error("User not found");
  }

  const userData = userSnap.data();
  let favoriteIds = Array.isArray(userData.favoriteIds) ? userData.favoriteIds : [];

  if (!favoriteIds.includes(listingId)) {
    favoriteIds.push(listingId);
  }

  await updateDoc(userRef, { favoriteIds });

  return NextResponse.json({ success: true, favoriteIds });
}

export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { listingId } = params;

  if (!listingId || typeof listingId !== "string") {
    throw new Error("Invalid ID");
  }

  const userRef = doc(db, "users", currentUser.email);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) {
    throw new Error("User not found");
  }

  const userData = userSnap.data();
  let favoriteIds = Array.isArray(userData.favoriteIds) ? userData.favoriteIds : [];

  favoriteIds = favoriteIds.filter((id) => id !== listingId);

  await updateDoc(userRef, { favoriteIds });

  return NextResponse.json({ success: true, favoriteIds });
}
