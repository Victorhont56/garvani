// app/libs/auth.ts
import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "./firebase";

export const authOptions: AuthOptions = {
  providers: [
  
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
        console.log("Credentials:", credentials);
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
          console.log("User Credential:", userCredential);

          
          // Get user data from Firestore
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
        token.name = user.name || ""; // Add user name if available
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = {
          id: token.id as string,
          email: token.email as string,
          name: token.name || "", // Include name if available
        };
      }
      return session;
    },
  },
};

export default NextAuth(authOptions);