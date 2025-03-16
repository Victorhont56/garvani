"use client";

import { LuCircleUser } from "react-icons/lu";
import { useCallback, useEffect, useRef, useState } from "react";
import MenuItem from "./MenuItem";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import { signOut } from "firebase/auth"; // ✅ Use Firebase sign-out instead of NextAuth
import { useRouter } from "next/navigation";
import useCurrentUser from "@/app/hooks/useCurrentUser";
import { auth } from "@/app/libs/firebase"; // ✅ Import Firebase auth
import { LuLogOut } from "react-icons/lu";
import { MdForwardToInbox } from "react-icons/md";
import { MdOutlinePlaylistAddCheck } from "react-icons/md";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { MdOutlinePlaylistAdd } from "react-icons/md";


const UserMenu: React.FC = () => {
  const { currentUser, setCurrentUser } = useCurrentUser(); // ✅ Get Zustand state
  const router = useRouter();
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  const handleClickOne = useCallback(() => {
    loginModal.onOpen();
    setIsOpen(false);
  }, [loginModal]);

  const handleClickTwo = useCallback(() => {
    registerModal.onOpen();
    setIsOpen(false);
  }, [registerModal]);

  const handleListings = useCallback(() => {
    router.push("/listings");
    setIsOpen(false);
  }, [router]);

  const handleFavorites = useCallback(() => {
    router.push("/favourites");
    setIsOpen(false);
  }, [router]);

  const handleReservations = useCallback(() => {
    router.push("/reservations");
    setIsOpen(false);
  }, [router]);

  const handleInbox = useCallback(() => {
    router.push("/inbox");
    setIsOpen(false);
  }, [router]);


  // ✅ Handle Firebase sign-out and update Zustand state
  const handleSignOut = async () => {
    setIsOpen(false);

    try {
      await signOut(auth); // ✅ Firebase sign-out
      setCurrentUser(null); // ✅ Clear Zustand state
      router.push("/"); // ✅ Redirect to homepage after signing out
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative" ref={menuRef}>
      <div onClick={toggleOpen} className="mt-[10px] text-primary hover:text-hover cursor-pointer">
        <div className="flex flex-col items-center ">
          <div >
            <LuCircleUser size={30} />
          </div>
          <div>
              <p className="text-[16px]">Me</p>
          </div>
        </div>
      </div>
      {isOpen && (
        <div
          className="absolute rounded-xl shadow-2xl w-[60vw] md:w-[30vw] lg:w-[20vw] 
          bg-[#F9FAFB] overflow-hidden text-text font-bold right-0 bottom-12 z-[100000]"
        >
          <div className="flex flex-col cursor-pointer">
            {currentUser ? (
              <>
                <MenuItem onClick={handleListings} label="My Listings" icon={<MdOutlinePlaylistAdd  size={20} />} />
                <MenuItem onClick={handleFavorites} label="My Favourites" icon={<MdOutlineFavoriteBorder />} />
                <MenuItem onClick={handleReservations} label="My Reservations" icon={<MdOutlinePlaylistAddCheck size={20} />} />
                <MenuItem onClick={handleInbox} label="Inbox" icon={<MdForwardToInbox />} />
                {/* ✅ Call updated handleSignOut */}
                <MenuItem onClick={handleSignOut} label="Logout" icon={<LuLogOut  />} />
                
              </>
            ) : (
              <>
                <MenuItem onClick={handleClickOne} label="Login" />
                <MenuItem onClick={handleClickTwo} label="Sign Up" />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
