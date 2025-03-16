'use client';
import Categories from './Categories';
import NavMenu from './NavMenu';
import Search from './Search';
import { useState, useEffect } from "react";

const HeaderNav = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className='font-satoshi'>
      <div className={`fixed top-0 left-0 w-full z-50 p-4 transition-all duration-300 
        ${isScrolled ? "bg-white/60 backdrop-blur-md shadow-md" : "bg-transparent"}`}>
        {/* Header */}
        <div className='flex flex-col '>
          <div className="container mx-auto flex items-center justify-between px-4 md:mt-5 lg:px-8">
            <div className="text-lg font-semibold font-sans">Garvani</div>
            {/* Menu Icon */}
            <div className="hidden md:flex gap-6">
              <a href="#" className="text-gray-700 hover:text-gray-900">Home</a>
              <a href="#" className="text-gray-700 hover:text-gray-900">Discover</a>
              <a href="#" className="text-gray-700 hover:text-gray-900">About</a>
              <a href="#" className="text-gray-700 hover:text-gray-900">Contact</a>
              <a href="#" className="text-gray-700 hover:text-gray-900">Settings</a>
            </div>
            <Search />
            <NavMenu isOpen={isMenuOpen} setIsOpen={setIsMenuOpen}  />
          </div>
          <div>
            <Categories />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderNav;