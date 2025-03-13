'use client';

import { LuMenu } from "react-icons/lu";
import { useEffect } from "react";
import { FiX } from "react-icons/fi";

interface NavMenuProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const NavMenu: React.FC<NavMenuProps> = ({ isOpen, setIsOpen }) => {
  const toggleMenu = () => setIsOpen(!isOpen);

  // Effect to toggle body scroll
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'auto';

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  return (
    <>
      <div className="md:hidden">
        {isOpen && (
          <>
            {/* Backdrop */}
            <div className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-[9999]" />

            {/* Menu */}
            <div className="absolute top-0 left-0 w-full bg-white shadow-lg z-[10000] transition-transform duration-300 translate-y-0">
              {/* Close Icon */}
              <div className="w-8 h-8 px-5 py-5 mr-7 text-black font-bold cursor-pointer absolute right-0">
                <FiX onClick={toggleMenu} size={30} />
              </div>

              {/* Menu Links */}
              <div className="flex flex-col items-center gap-6 p-6">
                <a href="#" className="text-gray-700 hover:text-gray-900">Home</a>
                <a href="#" className="text-gray-700 hover:text-gray-900">Discover</a>
                <a href="#" className="text-gray-700 hover:text-gray-900">About</a>
                <a href="#" className="text-gray-700 hover:text-gray-900">Contact</a>
                <a href="#" className="text-gray-700 hover:text-gray-900">Settings</a>
              </div>
            </div>
          </>
        )}

        {!isOpen && (
          <div
            className="
              p-2 
              rounded-full 
              text-black
              cursor-pointer
             
            "
            onClick={toggleMenu}
          >
            <LuMenu size={30} className="text-black fill-current" />
          </div>
        )}
      </div>
    </>
  );
};

export default NavMenu;
