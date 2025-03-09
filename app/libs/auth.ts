
import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword,  UserCredential } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDk14EOfH2W0zJsBKdneq0by9fITRCkDpU",
  authDomain: "garvani-65b45.firebaseapp.com",
  projectId: "garvani-65b45",
  storageBucket: "garvani-65b45.firebasestorage.app",
  messagingSenderId: "544376458804",
  appId: "1:544376458804:web:0fcb026dc2352fe1f54461",
  measurementId: "G-XHJBGMHNYY"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export const authOptions: AuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid credentials");
        }

        try {
          // Sign in with Firebase Authentication
          const userCredential = await signInWithEmailAndPassword(
            auth,
            credentials.email,
            credentials.password
          );

          // Get user data from Firestore (if needed)
          const userDocRef = doc(db, "users", userCredential.user.uid);
          const userDoc = await getDoc(userDocRef);

          if (!userDoc.exists()) {
            throw new Error("User not found in Firestore");
          }

          const user = userDoc.data();

          return {
            id: userCredential.user.uid,
            email: userCredential.user.email,
            ...user,
          };
        } catch (error) {
          console.error("Error during authentication:", error);
          throw new Error("Invalid credentials");
        }
      },
    }),
  ],
  pages: {
    signIn: "/",
  },
  debug: process.env.NODE_ENV === "development",
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        // Ensure session.user exists before assigning properties
        session.user = session.user ?? ({} as any); // Type assertion to avoid errors
    
        // Explicitly cast token to the expected type
        session.user.id = token.id as string;
        session.user.email = token.email as string;
      } 
      return session;
    },
    
  },
};

export default NextAuth(authOptions);