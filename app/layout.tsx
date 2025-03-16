import "./globals.css";
import { Nunito } from "next/font/google";

import HeaderNav from "./components/navbar/HeaderNav";
import ClientOnly from "./components/ClientOnly";
import RegisterModal from "./components/modals/RegisterModal";
import ToasterProvider from "./providers/ToasterProvider";
import LoginModal from "./components/modals/LoginModal";
import getCurrentUser from "./actions/getCurrentUser";
import NavbarBottom from "./components/navbar/NavbarBottom";
import Hero from './components/Hero/Hero';
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import AuthProvider from "./providers/AuthProvider";
import ClientLayout from "./components/ClientLayout";
import ListModal from "./components/modals/ListModal";
import SessionProviderWrapper from "./providers/SessionProviderWrapper";

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
      <body className="bg-white flex flex-col min-h-screen">
        <SessionProviderWrapper>
          <AuthProvider>
            <ClientOnly>
              <ToasterProvider />
              <ListModal />
              <RegisterModal />
              <LoginModal />
              <HeaderNav />
              <NavbarBottom currentUser={currentUser} />    
              {/* ✅ Use flex-grow to push footer down */}
              <div className="flex-grow">
                <ClientLayout>
                  <Hero />
                 
                  <Contact />
                </ClientLayout>
              </div>
              <div className="pb-20 pt-28">{children}</div>
              <Footer /> {/* ✅ Footer stays at bottom */}
            </ClientOnly>
          </AuthProvider>
        </SessionProviderWrapper>
      </body>
    </html>
  );
}
