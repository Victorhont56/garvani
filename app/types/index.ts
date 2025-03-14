// types.ts

// SafeListing type for Firebase
export interface SafeListing {
  id: string;
  mode: string;
  type: string;
  title: string;
  description: string;
  imageSrc: string;
  createdAt: string;
  category: string;
  livingroomCount: string;
  bedroomCount: number;
  bathroomCount: number;
  guestCount: number;
  locationValue: string;
  userId: string;
  price: number;
}

// SafeReservation type for Firebase
export interface SafeReservation {
  id: string;
  userId: string;
  listingId: string;
  startDate: string;
  endDate: string;
  totalPrice: number;
  createdAt: string;
  listing: SafeListing; // Embedded listing data
}

// SafeUser type for Firebase
export interface SafeUser {
  id: string;
  name: string | null;
  email: string;
  emailVerified: boolean;
  image?: string | null;
  hashedPassword?: string | null;
  favoriteIds: string[]; // Array of listing IDs
  createdAt: string;
  updatedAt: string;
}
