"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import MenuItem from "./MenuItem";
import { useRouter } from "next/navigation";
import { CiCompass1 } from "react-icons/ci";


const Discover: React.FC = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const toggleOpen = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const handleMenuItemClick = useCallback(
    (path: string) => {
      router.push(path);
      setIsOpen(false);
    },
    [router]
  );

  // Close popup on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative z-[5000]">
      {/* Discover Icon */}
       <div onClick={toggleOpen} className="mt-[1px] text-primary hover:text-hover font-bold cursor-pointer">
             <div className="flex flex-col items-center ">
               <div >
                 <CiCompass1 size={30} />
               </div>
               <div>
                   <p className="text-[16px]">Explore</p>
               </div>
             </div>
           </div>

      {/* Popup */}
      {isOpen && (
        <div
          className={`absolute left-1/2 bottom-12 transform -translate-x-1/2 
            w-[60vw] md:w-[30vw] lg:w-[20vw] rounded-xl bg-[#F9FAFB] 
            overflow-hidden text-text font-bold transition-all duration-300 z-[1000] 
            shadow-2xl`} // Increased shadow for a more elevated effect
        >
        
          <div className="flex flex-col cursor-pointer">
            <MenuItem onClick={() => handleMenuItemClick("/properties")} label="New Listings" />
            <MenuItem onClick={() => handleMenuItemClick("/lands")} label="Lands" />
            <MenuItem onClick={() => handleMenuItemClick("/luxurious-houses")} label="Luxurious Houses" />
            <MenuItem onClick={() => handleMenuItemClick("/commercial-buildings")} label="Commercial Buildings" />
            <MenuItem onClick={() => handleMenuItemClick("/single-apartments")} label="Single Apartments" />
            <MenuItem onClick={() => handleMenuItemClick("/shortlets")} label="Shortlets" />
          </div>
        </div>
      )}
    </div>
  );
};

export default Discover;
