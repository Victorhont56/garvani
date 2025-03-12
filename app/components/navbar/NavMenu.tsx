'use client'
import { LuMenu } from "react-icons/lu";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";



const NavMenu = () => {

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };


  return (
     <>
        <div className="md:hidden ">
          {isOpen ? (

            <div   className={`absolute top-0 font-satoshi left-0 w-full bg-[#e8fbe8] shadow-lg transition-transform duration-300 ${
              isOpen ? "translate-y-0" : "-translate-y-full"
            }`}>
                <div className="w-8 h-8 px-5 py-5 text-black font-bold cursor-pointer ">
                  <FiX
                    onClick={toggleMenu} size={30}
                  />
                </div>  
                    <div
                  >
                    <div className="flex flex-col items-center gap-6 p-6">
                      <a href="#" className="text-gray-700 hover:text-gray-900">Home</a>
                      <a href="#" className="text-gray-700 hover:text-gray-900">Discover</a>
                      <a href="#" className="text-gray-700 hover:text-gray-900">About</a>
                      <a href="#" className="text-gray-700 hover:text-gray-900">Contact</a>
                      <a href="#" className="text-gray-700 hover:text-gray-900">Settings</a>
                    </div>

                    </div>
              </div>
              )
              : (
                <div 
                  className="
                    p-2 
                    bg-white
                    rounded-full 
                    text-black
                    md:hidden lg:hidden
                    cursor-pointer
                  " 
                  onClick={toggleMenu}
                  >
                  <LuMenu size={30} className="text-black fill-current" />
                </div>
              )}
         </div>
     </>
  )
} 

export default NavMenu