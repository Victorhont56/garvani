'use client';

import { RiHome6Line } from "react-icons/ri";
import UserMenu from "./UserMenu";
import { SafeUser } from "@/app/types";
import Discover from "./Discover";
import { useRouter } from "next/navigation";

interface NavbarBottomProps {
  currentUser?: SafeUser | null;
}

const NavbarBottom: React.FC<NavbarBottomProps> = ({ currentUser}) => {
  const router = useRouter();

  return (
    <div
      className='fixed bottom-4 left-1/2 transform -translate-x-1/2 w-[90%] max-w-[320px] bg-[#f8f8fa] shadow-lg  flex justify-around items-center border border-gray-200 rounded-[60px] z-[200]' 
    >
      {/* Home Icon */}
      <div onClick={() => router.push("/")}
          className="flex flex-col cursor-pointer items-center text-primary hover:text-hover font-bold">
        <button
        >
          <RiHome6Line size={25} />
        </button>
        <div>
          <p className="text-[16px] hover:text-hover text-primary">Home</p>
        </div>
      </div>
      {/* Discover Icon */}
        <button>
          <Discover />
        </button>
      {/* Profile/Avatar Icon */}
        <button >
          <UserMenu />
        </button>
    </div>
  );
};

export default NavbarBottom;
