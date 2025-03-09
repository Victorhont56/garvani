import { NextResponse } from "next/server";
import { db } from "@/app/libs/firebase";
import { collection, doc, setDoc } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import bcrypt from "bcrypt";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, name, password } = body;

    if (!email || !name || !password) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const auth = getAuth();

    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user in Firebase Authentication
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Update display name in Firebase Auth
    await updateProfile(user, { displayName: name });

    // Store additional user info in Firestore
    const userDocRef = doc(collection(db, "users"), user.uid);
    await setDoc(userDocRef, {
      email,
      name,
      hashedPassword, // Store hashed password (optional)
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json({ uid: user.uid, email, name, message: "User registered successfully" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
