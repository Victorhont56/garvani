"use client";

import Container from "../Container";
import HeaderNav from "./HeaderNav";
import { SafeUser } from "@/app/types";

interface NavbarProps {
  currentUser?: SafeUser | null; // Allow undefined explicitly
}

const Navbar: React.FC<NavbarProps> = ({ currentUser = null }) => { // Default to null
  return (
    <div className="fixed w-full bg-white z-10 ">
      <div className="py-4 ">
        <Container>
          <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
           <HeaderNav />
          </div>
        </Container>
      </div>
      {/**<Categories /> **/}
    </div>
  );
};

export default Navbar;
