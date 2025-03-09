// firestore.ts
import { db } from "./firebase";
import { collection, getDocs, addDoc, DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import { Property } from "../../types";

// Fetch all properties
export const fetchProperties = async (): Promise<Property[]> => {
  const propertiesCollection = collection(db, "properties");
  const propertiesSnapshot = await getDocs(propertiesCollection);
  const properties: Property[] = propertiesSnapshot.docs.map((doc: QueryDocumentSnapshot<DocumentData>) => ({
    id: doc.id,
    ...doc.data(),
  })) as Property[];
  return properties;
};

// Add a new property
export const addProperty = async (property: Property): Promise<string | null> => {
  try {
    const docRef = await addDoc(collection(db, "properties"), property);
    return docRef.id;
  } catch (error) {
    console.error("Error adding property:", error);
    return null;
  }
};
interface Booking {
  id: string;
  userId: string;
  // Add other properties
}

export const fetchUserBookings = async (userId: string): Promise<Booking[]> => {
  const bookingsCollection = collection(db, "bookings");
  const bookingsSnapshot = await getDocs(bookingsCollection);
  const bookings: Booking[] = bookingsSnapshot.docs.map((doc) => ({
    ...(doc.data() as Booking),
  }));

  return bookings.filter((booking) => booking.userId === userId);
};
