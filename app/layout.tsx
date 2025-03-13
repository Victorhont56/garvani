import "./globals.css";
import { Nunito } from "next/font/google";
import Navbar from "./components/navbar/HeaderNav";
import ClientOnly from "./components/ClientOnly";
import RegisterModal from "./components/modals/RegisterModal";
import ToasterProvider from "./providers/ToasterProvider";
import LoginModal from "./components/modals/LoginModal";
import getCurrentUser from "./actions/getCurrentUser";
import RentModal from "./components/modals/RentModal";
import NavbarBottom from "./components/navbar/NavbarBottom";
import Hero from './components/Hero/Hero';
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import AuthProvider from "./providers/AuthProvider";
import ClientLayout from "./components/ClientLayout";
import { useState } from "react";

export const metadata = {
  title: "Garvani",
  description: "Welcome to Garvani",
};

const font = Nunito({ subsets: ["latin"] });

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      <body className={font.className}>
        <AuthProvider>
          <ClientOnly>
            <ToasterProvider />
            <RentModal />
            <RegisterModal />
            <LoginModal />
            <Navbar />
            <NavbarBottom currentUser={currentUser} />
            {/* ✅ Hero and Contact only on homepage */}
            <ClientLayout>
              <Hero />
              <Contact />
            </ClientLayout>
            {/* ✅ Footer always visible */}
            <div className="pb-20 pt-28">{children}</div>
            <Footer /> 
          </ClientOnly>
        </AuthProvider>
      </body>
    </html>
  );
}