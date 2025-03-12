import "./globals.css";
import { Nunito } from "next/font/google";
import Navbar from "./components/navbar/Navbar";
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
            <ClientLayout>
              <Hero />
              <Contact />
              <Footer />
            </ClientLayout>
          </ClientOnly>
      
        </AuthProvider>
      </body>
    </html>
  );
}
