// types.ts
export interface User {
    uid: string;
    email: string;
    displayName?: string;
    photoURL?: string;
  }
  
  export interface Property {
    id?: string; // Optional because Firestore will auto-generate the ID
    title: string;
    description: string;
    price: number;
    location: string;
    imageUrl: string;
    userId: string; // ID of the user who added the property
  }
  
  export interface Booking {
    id?: string;
    propertyId: string;
    userId: string;
    startDate: Date;
    endDate: Date;
  }