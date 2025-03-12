'use client'
import { RiHome6Line } from "react-icons/ri";
import { RiCompass3Line } from "react-icons/ri";
import UserMenu from "./UserMenu";
import { SafeUser } from "@/app/types";
import Discover from "./Discover";

interface NavbarBottomProps {
  currentUser?: SafeUser | null; // Allow undefined explicitly
}


const NavbarBottom: React.FC<NavbarBottomProps> = ({ currentUser }) => {
  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 w-[90%] max-w-[320px] bg-[#b7f2b8] shadow-md p-3 flex justify-around items-center border border-gray-200 rounded-[60px] z-[200]">
      {/* Home Icon (Active) */}
      <button className="flex flex-col items-center text-white bg-primary p-2 hover:bg-hover rounded-full">
        <RiHome6Line size={20} />
      </button>

      {/* Discover Icon */}
      <button className="flex flex-col items-center text-white bg-primary hover:bg-hover transition rounded-full">
       <Discover  />
      </button>

      {/* Profile/Avatar Icon */}
      <button className="flex flex-col items-center text-white bg-primary hover:bg-hover transition rounded-full">
        <UserMenu />
      </button>
    </div>
  );
};

export default NavbarBottom;
