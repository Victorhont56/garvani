"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { LuBedSingle } from "react-icons/lu";
import { LuBedDouble } from "react-icons/lu";
import { LiaBedSolid } from "react-icons/lia";
import { IoMan } from "react-icons/io5";
import { LiaWarehouseSolid } from "react-icons/lia";
import { GiFamilyHouse } from "react-icons/gi";
import { MdOutlineOtherHouses } from "react-icons/md";
import { BiBuildingHouse } from "react-icons/bi";
import { FaShop } from "react-icons/fa6";
import { FaHouseUser } from "react-icons/fa";
import { GiBarn } from "react-icons/gi";
import { PiFarmDuotone } from "react-icons/pi";
import { GiCastle } from "react-icons/gi";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import CategoryBox from "../CategoryBox";
import Container from "../Container";
import { useRef } from "react";
import { BsFillHousesFill } from "react-icons/bs";


export const categories = [
  { label: "Single-Room", icon: LuBedSingle, description: "This is a single room apartment" },
  { label: "Room-and-Parlour", icon: LuBedDouble, description: "This is a one bedroom and parlour apartment" },
  { label: "2-Bedroom-Flat", icon: LiaBedSolid, description: "This is a two bedroom apartment" },
  { label: "Self-contain", icon: IoMan, description: "This is a self-contain" },
  { label: "Duplex", icon: BiBuildingHouse, description: "This is a duplex" },
  { label: "Storey-building", icon: GiFamilyHouse, description: "This is a storey Building" },
  { label: "Bungalow", icon: MdOutlineOtherHouses, description: "This is a bungalow" },
  { label: "Stylish", icon:  GiCastle, description: "This property is stylish" },
  { label: "Semi-Detached", icon: BsFillHousesFill, description: "This property is semi-detached" },
  { label: "Detached", icon: BiBuildingHouse, description: "This property is detached" },
  { label: "Commercial", icon: FaShop, description: "This property is for commercial purpose" },
  { label: "Residential", icon: FaHouseUser, description: "This property is for residential purpose" },
  { label: "Storage", icon: GiBarn, description: "This property is for storage" },
  { label: "Agriculture", icon: PiFarmDuotone, description: "This property is for agriculture" },
  { label: "Warehouse", icon: LiaWarehouseSolid, description: "This is a warehouse" },
];

const Categories = () => {
  const params = useSearchParams();
  const category = params?.get("category");
  const pathname = usePathname();
  const isMainPage = pathname === "/";

  const scrollRef = useRef<HTMLDivElement>(null);

  if (!isMainPage) return null;

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = scrollRef.current.clientWidth * 0.5; // Dynamic scroll based on container width
      console.log("Scrolling", direction, "by", scrollAmount); // Debugging
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <Container>
      <div className="relative pt-4">
        {/* ✅ Left Arrow */}
        <button
          onClick={(e) => {
            e.preventDefault();
            scroll("left");
          }}
          className="
            absolute left-0 top-1/2 transform -translate-y-1/2
            bg-white border border-gray-300 shadow-md
            rounded-full w-10 h-10 flex items-center justify-center
            z-50 hover:bg-gray-100 transition
          "
        >
          <FaChevronLeft size={20} className="text-gray-500" />
        </button>

        {/* ✅ Scrollable Category Container */}
        <div
          ref={scrollRef}
          className="
            flex items-center gap-6 overflow-x-scroll
            scroll-smooth scrollbar-hide
          "
        >
          {categories.map((item) => (
            <CategoryBox
              key={item.label}
              label={item.label}
              icon={item.icon}
              selected={category === item.label}
            />
          ))}
        </div>

        {/* ✅ Right Arrow */}
        <button
          onClick={(e) => {
            e.preventDefault();
            scroll("right");
          }}
          className="
            absolute right-0 top-1/2 transform -translate-y-1/2
            bg-white border border-gray-300 shadow-md
            rounded-full w-10 h-10 flex items-center justify-center
            z-[100] hover:bg-gray-100 transition
          "
        >
          <FaChevronRight size={20} className="text-gray-500" />
        </button>
      </div>
    </Container>
  );
};

export default Categories;